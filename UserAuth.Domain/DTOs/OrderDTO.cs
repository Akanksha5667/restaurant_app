namespace UserAuth.Domain.DTOs
{
    public class OrderDTO
    {
        public Guid? Id { get; set; }
        public int Status { get; set; }
        public decimal TotalAmount { get; set; }
        public string? Name { get; set; }
        public DateTime? Date { get; set; }
        public int? UserId { get; set; }

    }
}
