using AutoMapper;
using UserAuth.Domain.DomainModels;
using UserAuth.Infrastructure.DBModels;
using UserAuth.Infrastructure.DBModels.Restaurant;
using UserAuth.Infrastructure.IRepositories;

namespace UserAuth.Infrastructure.Repositories
{
    public class CartRepository: ICartRepository
    {
        private readonly UsersDbContext _dbContext;
        private readonly IMapper _mapper;
       public CartRepository(UsersDbContext dbContext, IMapper mapper) { 
            _dbContext = dbContext;
            _mapper = mapper;
        }

        public async Task<bool> AddItem(CartItem item)
        {
            try
            {
                DbCartItem dbCartItem = _mapper.Map<DbCartItem>(item);
                DbRestaurantItem dbrestaurantItem=_dbContext.RestaurantItems.Find(dbCartItem.RestaurantItemId);
                dbCartItem.ItemPrice = dbrestaurantItem.Price;
                dbCartItem.Name = dbrestaurantItem.Name;
                _dbContext.CartItem.Add(dbCartItem);
                await _dbContext.SaveChangesAsync();
                return true;
            }
            catch
            {
                throw;
            }
        }

        public async Task<List<CartItem>> Get()
        {
            try
            {
               List<DbCartItem> cartItems= _dbContext.CartItem.ToList();
                return _mapper.Map<List<CartItem>>(cartItems);
            }
            catch
            {
                throw;
            }
        }
        public async Task<int> UpdateQuantity(UpdateQuantityDTO updateQuantityDTO)
        {
            if (updateQuantityDTO.IsRestaurantItem)
            {
                var restaurantItem = _dbContext.RestaurantItems.FirstOrDefault(item => item.Id == updateQuantityDTO.ItemId);
                restaurantItem.Quantity += (short)(updateQuantityDTO.Number == 1 ? 1 : -1);
                await _dbContext.SaveChangesAsync();
                return restaurantItem.Quantity;
            }
            else
            {
                var cartItem = _dbContext.CartItem.FirstOrDefault(cartItem => cartItem.Id == updateQuantityDTO.ItemId);
                cartItem.Quantity += updateQuantityDTO.Number == 1 ? 1 : -1;
                await _dbContext.SaveChangesAsync();
                return cartItem.Quantity;
            }
        }
        public async Task<bool> DeleteCartItem(Guid id)
        {
            try
            {
                _dbContext.CartItem.Remove(_dbContext.CartItem.Find(id));
                _dbContext.SaveChanges();
                return true;
            }
            catch
            {
                throw;
            }
        }
    }
}
