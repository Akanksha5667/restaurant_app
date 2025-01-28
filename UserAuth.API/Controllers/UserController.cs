using Microsoft.AspNetCore.Mvc;
using UserAuth.Domain.DTOs;
using UserAuth.Application.Interfaces;
using UserAuth.Infrastructure.DBModels;
using Microsoft.AspNetCore.Authorization;
using UserAuth.Domain;

namespace UserAuth.API.Controllers
{

    [Route("api/[controller]")]
    [ApiController]

    public class UserController : ControllerBase
    {
        private readonly IUserService _userService;
        private readonly ITokenHandlerService _tokenService;
        public UserController(IUserService userService, ITokenHandlerService tokenService)
        {
            _userService = userService;
            _tokenService = tokenService;
        }

        [Authorize]
        [HttpGet]
        [Route("GetAll")]
        public async Task<ActionResult<List<User>>> GetAll()
        {
            return await _userService.GetAll();
        }

        [Authorize]
        [HttpGet("{id}")]
        public async Task<ActionResult<User>> GetById(int id)
        {

            return await _userService.GetById(id);
        }

        [HttpPost]
        [Route("Register")]
        public async Task<IActionResult> Add(UserDTO userDTO)
        {
            try
            {
                bool isUserAdded = await _userService.Add(userDTO);
                return Ok(new
                {
                    Data = isUserAdded,
                    StatusCode = isUserAdded ? 200 : 409,
                    Message = isUserAdded ? "User added successfully" : "User already exists"
                });
            }
            catch (Exception e)
            {
                Console.WriteLine(e);

                return StatusCode(500, new
                {
                    Data = (bool?)null,
                    StatusCode = 500,
                    Message = "An unexpected error occurred. Please try again later."
                });
            }
        }

        [HttpPost]
        [Route("Login")]
        public async Task<ActionResult<AuthResponse>> GetUser(UserDTO userDTO)
        {
            try
            {
                return await _userService.GetUser(userDTO);
            }
            catch
            {
                return StatusCode(500, new { Message = "An error occurred during login. Please try again later." });

            }
        }

        [HttpPut("{id}")]
        public async Task<ActionResult<User>> UpdateUser(int id, UserDTO updatedUser)
        {
            return await _userService.UpdateUser(id, updatedUser);
        }

        [HttpDelete("{id}")]
        public Task DeleteUser(int id)
        {
            return _userService.DeleteUser(id);
        }

        [HttpGet("isTokenValid/{token}")]
        public bool isTokenValid(string token)
        {
            return _tokenService.isTokenValid(token);
        }

        //[HttpPost("refresh")]
        //public IActionResult Refresh([FromBody] TokenRequest tokenRequest)
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
