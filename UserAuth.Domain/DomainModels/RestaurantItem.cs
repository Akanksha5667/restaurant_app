using System;
namespace UserAuth.Domain.DomainModels
{
    public class RestaurantItem
    {
        public Guid Id { get; set; }

        public string Name { get; set; } = null!;

        public string Details { get; set; } = null!;

        public decimal Price { get; set; }

        public Guid RestaurantId { get; set; }
        public string? RestaurantName { get; set; }
        public Guid CategoryId { get; set; }
        public string CategoryName { get; set; }

    }
}
