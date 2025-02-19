using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace UserAuth.Infrastructure.DBModels.Restaurant
{
    public class DbRestaurantItem
    {
        public Guid Id { get; set; }

        public string Name { get; set; } = null!;

        public string Details { get; set; } = null!;

        public decimal Price { get; set; }

        public Guid RestaurantId { get; set; }

        public Guid CategoryId { get; set; }
        public string CategoryName { get; set; }
        public Guid ItemId { get; set; }
        public short Quantity { get; set; }
        public virtual DbItem Item { get; set; } = null!;
        public virtual DbRestaurant Restaurant { get; set; } = null!;
        public virtual DbCategory Category { get; set; } = null!;
    }

}
