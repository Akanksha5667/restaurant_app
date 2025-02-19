using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace UserAuth.Domain.DomainModels
{
    public class Item
    {
        public Guid Id { get; set; }
        public string Name { get; set; } = null!;
        public string Details { get; set; } = null!;
        public decimal Price { get; set; }
        public Guid CategoryId { get; set; }
        public string CategoryName { get; set; }
    }
}
