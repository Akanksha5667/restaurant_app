using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace UserAuth.Infrastructure.DBModels.Restaurant
{
    public class DbCategory
    {
        public Guid Id { get; set; }

        public string Name { get; set; } = null!;

        public virtual ICollection<DbRestaurant> Restaurants { get; set; } = new List<DbRestaurant>();

        public virtual ICollection<DbRestaurantItem> RestaurantItems { get; set; } = new List<DbRestaurantItem>();
    }
}
