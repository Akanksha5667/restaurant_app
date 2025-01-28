using UserAuth.Infrastructure.DBModels.Restaurant;

namespace UserAuth.Infrastructure.DBModels
{
    public class Image
    {
        public int Id { get; set; }
        public string Name { get; set; }
        public byte[] ImageData { get; set; } 
        public string Type { get; set; }
        public bool IsCarousalImage { get; set; } 
        public bool IsRestaurantImage { get; set; } 
        public bool IsRestaurantItemImage { get; set; } 
        public bool IsCategoryImage { get; set; }
        public Guid? RestaurantId { get; set; }
        public Guid? RestaurantItemId { get; set; } 
        public Guid? CategoryId { get; set; }
        public virtual DbRestaurantItem RestaurantItem { get; set; } = null!;
        public virtual DbRestaurant Restaurant { get; set; } = null!;
        public virtual DbCategory Category { get; set; } = null!;

    }
}
