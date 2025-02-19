using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using UserAuth.Infrastructure.DBModels.Restaurant;

namespace UserAuth.Infrastructure.DBModels
{
    public class DbItem
    {
        public Guid Id { get; set; }
        public string Name { get; set; } = null!;
        public string Details { get; set; } = null!;
        public decimal Price { get; set; }
        public Guid CategoryId { get; set; }
        public string CategoryName { get; set; }
        public virtual DbCategory Category { get; set; } = null!;
    }
}
