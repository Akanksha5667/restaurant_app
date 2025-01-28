using UserAuth.Domain.DomainModels;

namespace UserAuth.Domain.DTOs
{
    public class UserDTO
    {
        public string? Id { get; set; }
        public string? Name { get; set; }
        public string Email { get; set; }
        public string? Type { get; set; }
        public string Password { get; set; }
        public Guid? CartId { get; set; }

        public DateTime CreatedOn { get; set; }
        public virtual Cart? Cart { get; set; }

        public List<OrderDTO>? OrdersHistory { get; set; }
    }
}
