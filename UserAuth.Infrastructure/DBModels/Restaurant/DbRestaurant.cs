using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace UserAuth.Infrastructure.DBModels.Restaurant
{
    public class DbRestaurant
    {
        public Guid Id { get; set; }

        public string Name { get; set; } = null!;

        public string Location { get; set; } = null!;

        public string? Description { get; set; }

        public bool IsPureVeg { get; set; }

        public decimal Rating { get; set; } = 0.0m;

        public DateTime CreatedOn { get; set; }

        public virtual ICollection<DbCategory> Categories { get; set; } = new List<DbCategory>();

        public virtual ICollection<DbRestaurantItem> RestaurantItems { get; set; } = new List<DbRestaurantItem>();
    }

}
