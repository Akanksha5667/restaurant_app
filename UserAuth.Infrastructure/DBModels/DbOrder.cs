namespace UserAuth.Infrastructure.DBModels
{
    public partial class DbOrder
    {
        public Guid Id { get; set; }

        public int Status { get; set; } // Enum or int for pending, completed, etc.

        public DateTime Date { get; set; }
        public int UserId { get; set; }
        public decimal TotalAmount { get; set; }

        public virtual User User { get; set; } = null!;

        public virtual ICollection<DbOrderItem> OrderItems { get; set; } = new List<DbOrderItem>();
    }

}
