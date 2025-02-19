namespace UserAuth.Domain.DomainModels
{
    public class UpdateQuantityDTO
    {
        public int Number { get; set; }
        public Guid ItemId { get; set; }
        public bool IsRestaurantItem { get; set; }

    }
}
