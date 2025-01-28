namespace UserAuth.Infrastructure.DBModels
{
    public class User
    {
        public int Id { get; set; }
        public string Name { get; set; }
        public string Email { get; set; }
        public string Type { get; set; }
        public string Password { get; set; }
        public Guid? CartId { get; set; }

        public DateTime CreatedOn { get; set; }

        public virtual ICollection<DbOrder>? OrdersHistory { get; set; } = new List<DbOrder>();
        // public string Role { get; set; }
    }
}   
