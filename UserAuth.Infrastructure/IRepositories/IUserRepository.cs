using UserAuth.Domain.DTOs;
using UserAuth.Infrastructure.DBModels;

namespace UserAuth.Application.IRepositories
{
    public interface IUserRepository
    {
        Task<bool> Add(UserDTO user);
        Task<UserDTO> GetUser(UserDTO user);
        Task<List<User>> GetAll();
        Task<User> GetById(int id);
        Task<User> UpdateUser(int id, UserDTO updatedUser);
        Task DeleteUser(int id);

    }
}
