using Microsoft.AspNetCore.Mvc;
using UserAuth.Application.Interfaces;
using UserAuth.Domain.DomainModels;

namespace UserAuth.API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class CartController : ControllerBase
    {
        private readonly ICartService _cartService;
        public CartController(ICartService cartService)
        {
            _cartService = cartService;
        }

        [HttpPost]
        public async Task<bool> AddItem(CartItem item)
        {
            return await _cartService.AddItem(item);
        }

        [HttpGet]
        public async Task<List<CartItem>> Get()
        {
            return await _cartService.Get();
        }

        [HttpPost("updateQuantity")]
        public async Task<int> UpdateQuantity([FromBody] UpdateQuantityDTO updateQuantityDTO)
        {
            return await _cartService.UpdateQuantity(updateQuantityDTO);
        }
        [HttpDelete("deleteCartItem/{id}")]
        public async Task<bool> DeleteCartItem(Guid id)
        {
            return await _cartService.DeleteCartItem(id);
        }
    }
}
