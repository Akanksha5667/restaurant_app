using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace UserAuth.Domain.DomainModels
{
    public class Category
    {
        public Guid Id { get; set; }

        public string Name { get; set; } = null!;
        public virtual List<Restaurant> Restaurants { get; set; }

        public virtual List<RestaurantItem> RestaurantItems { get; set; }
    }
}
