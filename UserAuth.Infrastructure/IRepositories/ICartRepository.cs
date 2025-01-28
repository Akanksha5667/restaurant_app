using UserAuth.Domain.DomainModels;

namespace UserAuth.Infrastructure.IRepositories
{
    public interface ICartRepository
    {
        Task<bool> AddItem(CartItem item);
        Task<List<CartItem>> Get();
        Task<int> UpdateQuantity(UpdateQuantityDTO updateQuantityDTO);
        Task<bool> DeleteCartItem(Guid id);
    }
}
