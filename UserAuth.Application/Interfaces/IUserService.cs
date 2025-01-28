using UserAuth.Domain;
using UserAuth.Domain.DTOs;
using UserAuth.Infrastructure.DBModels;

namespace UserAuth.Application.Interfaces
{
    public interface IUserService
    {
        Task<List<User>> GetAll();
        Task<User> GetById(int id);
        Task<bool> Add(UserDTO user);
        Task<AuthResponse> GetUser(UserDTO user);
        Task<User> UpdateUser(int id, UserDTO updatedUser);
        Task DeleteUser(int id);
    }
}
