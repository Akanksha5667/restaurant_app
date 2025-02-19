using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace UserAuth.Domain.DomainModels
{
    public class Restaurant
    {
        public Guid Id { get; set; }
        public int AdminId { get; set; }
        public string Name { get; set; } = null!;

        public string Location { get; set; } = null!;

        public string? Description { get; set; }

        public bool IsPureVeg { get; set; }

        public decimal Rating { get; set; } = 0.0m;
        public DateTime CreatedOn { get; set; }
        public List<Category> Categories { get; set; }

        public List<RestaurantItem> RestaurantItems { get; set; }
    }
}
