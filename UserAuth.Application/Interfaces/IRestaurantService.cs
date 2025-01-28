using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using UserAuth.Domain.DomainModels;
using UserAuth.Domain.DTOs;
using UserAuth.Infrastructure.IRepositories;

namespace UserAuth.Application.Interfaces
{
    public interface IRestaurantService
    {
        Task<List<Restaurant>> GetAll(PaginationParameters paginationParameters);
        Task<Restaurant> GetById(Guid id);
        Task<List<RestaurantItem>> GetDishesByRestaurant(Guid id);
        Task<List<RestaurantItem>> GetRetaurantItemsOnSearch(string searchString);
        Task<List<Restaurant>> GetRetaurantsOnSearch(string searchString);
        Task<List<Category>> GetCategories();
        Task<List<RestaurantItem>> GetCategoryItems(Guid id);
        Task<ImageDTO> UploadImage(ImageDTO ImageDTO);
        //Task<IActionResult> Retrieve(IFormFile file);
        Task<List<ImageDTO>> GetImages(string imageType);
        Task<OrderDTO> AddOrder(OrderDTO orderDTO);
        Task<bool> DeleteCart(int id);
        Task<int> GetRestaurantsCount();
        //Task<ImageDTO> GetImageStoredProc(int id);
    }
}
