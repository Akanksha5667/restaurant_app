using Microsoft.AspNetCore.Http;

namespace UserAuth.Domain.DTOs
{
    public class ImageDTO
    {
        public int? Id { get; set; }
        public IFormFile? File { get; set; }
        public string? Name { get; set; }
        public byte[]? ImageData { get; set; }
        public string? Type { get; set; }
        public bool? IsCarousalImage { get; set; }
        public bool? IsRestaurantImage { get; set; }
        public bool? IsRestaurantItemImage { get; set; }
        public bool? IsCategoryImage { get; set; }
        public Guid? RestaurantId { get; set; }
        public Guid? RestaurantItemId { get; set; }
        public Guid? CategoryId { get; set; }
        public string? retriveImage {get;set;}
    }
}
