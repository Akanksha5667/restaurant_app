namespace UserAuth.Domain.DomainModels
{
    public class CartItem
    {
        public Guid? Id { get; set; }
        public string? Name { get; set; }
        public decimal? ItemPrice { get; set; }
        public Guid RestaurantItemId { get; set; }
        public string UserId { get; set; }
        public int? Quantity { get; set; } = 1;

    }
}
