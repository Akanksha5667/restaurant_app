using UserAuth.Infrastructure.DBModels.Restaurant;

namespace UserAuth.Infrastructure.DBModels
{
    public partial class DbOrderItem
    {
        public Guid Id { get; set; }

        public Guid OrderId { get; set; }

        public Guid RestaurantItemId { get; set; }

        public int Quantity { get; set; }

        public virtual DbOrder Order { get; set; } = null!;

        public virtual DbRestaurantItem RestaurantItem { get; set; } = null!;
    }

}