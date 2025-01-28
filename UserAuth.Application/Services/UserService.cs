using AutoMapper;
using Azure;
using Microsoft.EntityFrameworkCore;
using UserAuth.Application.Interfaces;
using UserAuth.Application.IRepositories;
using UserAuth.Domain;
using UserAuth.Domain.DomainModels;
using UserAuth.Domain.DTOs;
using UserAuth.Infrastructure.DBModels;

namespace UserAuth.Application.Services
{
    public class UserService : IUserService
    {
        private readonly IMapper _mapper;
        private readonly IUserRepository _userRepository;
        private readonly ITokenHandlerService _tokenHandlerService;
        public UserService(IMapper mapper, IUserRepository userRepository, ITokenHandlerService tokenHandlerService)
        {
            _userRepository = userRepository;
            _mapper = mapper;
            _tokenHandlerService = tokenHandlerService;
        }

        public async Task<List<User>> GetAll()
        {
            return await _userRepository.GetAll();
        }
        public async Task<User> GetById(int id)
        {
            return await _userRepository.GetById(id);
        }

        public async Task<bool> Add(UserDTO user)
        {
            string key = "ThisIsASuperSecretKey";
            string iv = "ThisIsASuperSecretIV";
            StringEncryptor encryptor = new StringEncryptor(key, iv);
            user.Password = encryptor.Encrypt(user.Password);
            return await _userRepository.Add(user);
        }

        public async Task<AuthResponse> GetUser(UserDTO userDTO)
        {
            try
            {
                AuthResponse response = new AuthResponse();
                UserDTO user = await _userRepository.GetUser(userDTO);
                string key = "ThisIsASuperSecretKey";
                string iv = "ThisIsASuperSecretIV";
                StringEncryptor encryptor = new StringEncryptor(key, iv);
                if (user == null)
                {
                    response.Message = "User doesn't exist.Please register before login.";
                }

                else if (userDTO.Password != encryptor.Decrypt(user.Password))
                {
                    response.Message = "Invalid password";
                }
                else
                {
                    var token = _tokenHandlerService.GenerateJwtToken(user);
                    var refreshToken = _tokenHandlerService.GenerateRefreshToken();
                    response.Token = token;
                    response.RefreshToken = refreshToken;
                    response.Message = "Login Successfull";
                    response.User = user;
                }
                return response;
            }
            catch
            {
                throw;
            }
        }

        public async Task<User> UpdateUser(int id, UserDTO updatedUser)
        {
            return await _userRepository.UpdateUser(id,updatedUser);
        }

        public async Task DeleteUser(int id)
        {
             await _userRepository.DeleteUser(id);
        }

    }
}
