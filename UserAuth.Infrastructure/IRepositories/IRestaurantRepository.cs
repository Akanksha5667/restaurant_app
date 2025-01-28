using UserAuth.Domain.DomainModels;
using UserAuth.Domain.DTOs;
using UserAuth.Infrastructure.Repositories;

namespace UserAuth.Infrastructure.IRepositories
{
    public interface IRestaurantRepository
    {
        Task<List<Restaurant>> GetAll(PaginationParameters paginationParameters);
        Task<Restaurant> GetById(Guid id);
        Task<List<RestaurantItem>> GetDishesByRestaurant(Guid id);
        Task<List<Restaurant>> GetRetaurantsOnSearch(string searchString);
        Task<List<RestaurantItem>> GetRetaurantItemsOnSearch(string searchString);
        Task<List<Category>> GetCategories();
        Task<List<RestaurantItem>> GetCategoryItems(Guid id);
        Task<ImageDTO> UploadImage(ImageDTO imageDTO);
        Task<List<ImageDTO>> GetImages(string imageType);
        Task<OrderDTO> AddOrder(OrderDTO orderDTO);
        Task<bool> DeleteCart(int id);
        Task<int> GetRestaurantsCount();
        Task<List<ImageDTO>> GetImagesStoredProc(string imageType);
    }
}
