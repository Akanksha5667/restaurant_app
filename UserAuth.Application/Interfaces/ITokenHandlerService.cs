using UserAuth.Domain.DTOs;

namespace UserAuth.Application.Interfaces
{
    public interface ITokenHandlerService
    {
        string GenerateJwtToken(UserDTO userDTO);
        string GenerateRefreshToken();
        bool isTokenValid(string token);
       // ClaimsPrincipal GetPrincipalFromExpiredToken(string token);
    }
}
