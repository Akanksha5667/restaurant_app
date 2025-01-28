

using UserAuth.Domain.DTOs;

namespace UserAuth.Domain
{
    public class AuthResponse
    {
        public string Token { get; set; }
        public string RefreshToken { get; set; }
        public UserDTO User { get; set; }
        public string Message { get; set; }
    }
}
