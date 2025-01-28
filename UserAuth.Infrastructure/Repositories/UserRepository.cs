using AutoMapper;
using UserAuth.Application.IRepositories;
using UserAuth.Domain.DTOs;
using UserAuth.Infrastructure.DBModels;

namespace UserAuth.Infrastructure.Repositories
{
    public class UserRepository:IUserRepository
    {
        private readonly UsersDbContext _dbContext;
        private readonly IMapper _mapper;
        public UserRepository(UsersDbContext dbContext, IMapper mapper)
        {
            _dbContext = dbContext;
            _mapper = mapper;
        }

        public async Task<bool> Add(UserDTO user)
        {
            bool isExistingUser = _dbContext.Users.Any(u => u.Email == user.Email);
            if (!isExistingUser)
            {
                _dbContext.Users.Add(_mapper.Map<User>(user));
                await _dbContext.SaveChangesAsync();
                return true;
            }
            return false;
        }

        public async Task<UserDTO> GetUser(UserDTO userDTO)
        {
            try
            {
               User user=  _dbContext.Users.Where(u => u.Email == userDTO.Email).FirstOrDefault();
                return _mapper.Map<UserDTO>(user);
            }
            catch(Exception e)
            {
                throw new Exception(e.Message);
            }
        }

        public async Task<List<User>> GetAll()
        {
            List<User> users = _dbContext.Users.ToList();
            await _dbContext.SaveChangesAsync();
            return users;
        }

        public async Task<User> GetById(int id)
        {
            User user = _dbContext.Users.FirstOrDefault(u => u.Id == id);
            await _dbContext.SaveChangesAsync();
            return user;
        }
              
        public async Task<User> UpdateUser(int id, UserDTO updatedUser)
        {
            User user = _dbContext.Users.FirstOrDefault(u => u.Id == id);
            user.Name = updatedUser.Name;
            user.Email = updatedUser.Email;
            user.Type = updatedUser.Type;
            await _dbContext.SaveChangesAsync();
            return user;
        }

        public async Task DeleteUser(int id)
        {
            User user = _dbContext.Users.Find(id);
            _dbContext.Users.Remove(user);
            await _dbContext.SaveChangesAsync();
        }

    }
}
