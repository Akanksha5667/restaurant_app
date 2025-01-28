using Microsoft.EntityFrameworkCore;
using UserAuth.Application.Interfaces;
using UserAuth.Domain.DomainModels;
using UserAuth.Infrastructure.DBModels;
using UserAuth.Infrastructure.IRepositories;
using UserAuth.Infrastructure.Repositories;

namespace UserAuth.Application.Services
{
    public class CartService : ICartService
    {
        private readonly ICartRepository _cartRepository;
        public CartService(ICartRepository cartRepository)
        {
            _cartRepository = cartRepository;
        }
        public async Task<bool> AddItem(CartItem item)
        {
            return await _cartRepository.AddItem(item);
        }
        public async Task<List<CartItem>> Get()
        {
            return await _cartRepository.Get();
        }
        public async Task<int> UpdateQuantity(UpdateQuantityDTO updateQuantityDTO)
        {
            return await _cartRepository.UpdateQuantity(updateQuantityDTO);
        }
        public async Task<bool> DeleteCartItem(Guid id)
        {
            return await _cartRepository.DeleteCartItem(id);
        }

    }
}
