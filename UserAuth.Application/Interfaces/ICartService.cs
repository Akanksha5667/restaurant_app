using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using UserAuth.Domain.DomainModels;

namespace UserAuth.Application.Interfaces
{
    public interface ICartService
    {
        Task<bool> AddItem(CartItem item);
        Task<List<CartItem>> Get();
        Task<int> UpdateQuantity(UpdateQuantityDTO updateQuantityDTO);
        Task<bool> DeleteCartItem(Guid id);
    }
}
