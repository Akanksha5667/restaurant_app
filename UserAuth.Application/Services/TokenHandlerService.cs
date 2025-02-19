using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Security.Cryptography;
using System.Text;
using Microsoft.Extensions.Configuration;
using Microsoft.IdentityModel.Tokens;
using UserAuth.Application.Interfaces;
using UserAuth.Domain.DTOs;

namespace UserAuth.Application.Services
{
    public class TokenHandlerService: ITokenHandlerService
    {
        private readonly IConfiguration _config;
        public TokenHandlerService(IConfiguration config)
        {
            _config = config;
        }

        public string GenerateJwtToken(UserDTO user)
        {
            var securityKey = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(_config["Jwt:Key"]));
            var credentials = new SigningCredentials(securityKey, SecurityAlgorithms.HmacSha256);
            var claims = new[]
            {
                new Claim(ClaimTypes.NameIdentifier,user.Id.ToString()),
                new Claim(ClaimTypes.Name,user.Name),
                 new Claim(ClaimTypes.Role,user.Type)
            };
            var token = new JwtSecurityToken(_config["Jwt:Issuer"],
                _config["Jwt:Audience"],
                claims,
                expires: DateTime.Now.AddHours(10),
                signingCredentials: credentials);


            return new JwtSecurityTokenHandler().WriteToken(token);
        }

        public string GenerateRefreshToken()
        {
            var randomNumber = new byte[32];
            using (var rng = RandomNumberGenerator.Create())
            {
                rng.GetBytes(randomNumber);
                return Convert.ToBase64String(randomNumber);
            }
        }

        public bool isTokenValid(string token)
        {
            var handler = new JwtSecurityTokenHandler();
            var jwtToken = handler.ReadJwtToken(token);
            var expiryDate =jwtToken.ValidTo;
            return DateTime.UtcNow < expiryDate;
        }

        //private ClaimsPrincipal GetPrincipalFromExpiredToken(string token)
        //{
        //    var tokenHandler = new JwtSecurityTokenHandler();
        //    var key = Encoding.ASCII.GetBytes(_config["Jwt:Key"]);
        //    var tokenValidationParameters = new TokenValidationParameters
        //    {
        //        ValidateIssuerSigningKey = true,
        //        IssuerSigningKey = new SymmetricSecurityKey(key),
        //        ValidateIssuer = false,
        //        ValidateAudience = false,
        //        ValidateLifetime = false
        //    };

        //    var principal = tokenHandler.ValidateToken(token, tokenValidationParameters, out SecurityToken securityToken);

        //    var jwtSecurityToken = securityToken as JwtSecurityToken;
        //    if (jwtSecurityToken == null || !jwtSecurityToken.Header.Alg.Equals(SecurityAlgorithms.HmacSha256, StringComparison.InvariantCultureIgnoreCase))
        //    {
        //        throw new SecurityTokenException("Invalid token");
        //    }

        //    return principal;
        //}

        //public string Refresh(TokenRequest tokenRequest)
        //{
        //    var principal = GetPrincipalFromExpiredToken(tokenRequest.Token);
        //    if (principal == null)
        //    {
        //        return BadRequest("Invalid token");
        //    }

        //    var username = principal.Identity.Name;
        //    var storedRefreshToken = refreshTokens.Find(rt => rt.Username == username && rt.Token == tokenRequest.RefreshToken);

        //    if (storedRefreshToken == null || storedRefreshToken.ExpiryDate < DateTime.UtcNow)
        //    {
        //        return Unauthorized("Invalid refresh token");
        //    }

        //    var newJwtToken = GenerateJwtToken(username);
        //    var newRefreshToken = GenerateRefreshToken(username);

        //    refreshTokens.Remove(storedRefreshToken);
        //    refreshTokens.Add(newRefreshToken);

        //    return Ok(new
        //    {
        //        Token = newJwtToken,
        //        RefreshToken = newRefreshToken.Token
        //    });
        //}
    }
}
