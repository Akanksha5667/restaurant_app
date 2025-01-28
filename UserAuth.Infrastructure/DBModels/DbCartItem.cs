using UserAuth.Infrastructure.DBModels.Restaurant;

namespace UserAuth.Infrastructure.DBModels
{
    public class DbCartItem
    {
        public Guid Id { get; set; }
        public Guid RestaurantItemId { get; set; }
        public string? Name { get; set; }
        public decimal? ItemPrice { get; set; }
        public int UserId { get; set; }
        public int Quantity { get; set; } = 1;
        public virtual DbRestaurantItem RestaurantItem { get; set; } = null!;
    }
}
