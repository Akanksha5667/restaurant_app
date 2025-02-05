using System.IO.Compression;
using System.IO;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using UserAuth.Application.Interfaces;
using UserAuth.Domain.DomainModels;
using UserAuth.Domain.DTOs;
using System.Security.Claims;
using Microsoft.AspNetCore.Authorization;

namespace UserAuth.API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class RestaurantController : ControllerBase
    {
        private readonly IRestaurantService _restaurantService;
        public RestaurantController(IRestaurantService restaurantService)
        {
            _restaurantService = restaurantService;
        }
        [HttpPost]
        public async Task<List<Restaurant>> GetAll(PaginationParameters paginationParameters)
        {
            return await _restaurantService.GetAll(paginationParameters);
        }

        [HttpGet("{id}")]
        public async Task<Restaurant> GetById(Guid id)
        {
            return await _restaurantService.GetById(id);
        }

        [HttpGet("getItems/{id}")]
        public async Task<List<RestaurantItem>> GetRestaurantItems(Guid id)
        {
            return await _restaurantService.GetDishesByRestaurant(id);
        }

        [HttpGet("GetRetaurantItemsOnSearch/{searchString}")]
        public async Task<List<RestaurantItem>> GetRetaurantItemsOnSearch(string searchString)
        {
            return await _restaurantService.GetRetaurantItemsOnSearch(searchString);
        }
        [HttpGet("GetRetaurantsOnSearch/{searchString}")]
        public async Task<List<Restaurant>> GetRetaurantsOnSearch(string searchString)
        {
            return await _restaurantService.GetRetaurantsOnSearch(searchString);
        }
        [HttpGet("categories")]
        public async Task<List<Category>> GetCategories()
        {
            return await _restaurantService.GetCategories();
        }
        [HttpGet("categoryItems/{id}")]
        public async Task<List<RestaurantItem>> GetCategoryItems(Guid id)
        {
            return await _restaurantService.GetCategoryItems(id);
        }

        [HttpPost("upload")]
        public async Task<ImageDTO> UploadImage(ImageDTO ImageDTO)
        {
            ImageDTO imageData = await _restaurantService.UploadImage(ImageDTO);
            return imageData;
        }

        [HttpGet("getImages/{imageType}")]
        public async Task<List<ImageDTO>> GetImages(string imageType)
        {
            return await _restaurantService.GetImages(imageType);
        }

        [Authorize]
        [HttpPost("PlaceOrder")]
        public async Task<OrderDTO> AddOrder(OrderDTO orderDTO)
        {
            orderDTO.UserId = int.Parse(User.FindFirstValue(ClaimTypes.NameIdentifier));
            OrderDTO orderData = await _restaurantService.AddOrder(orderDTO);
            orderData.Name = User.FindFirstValue(ClaimTypes.Name);
            return orderData;
        }

        [HttpDelete("DeleteCart")]
        public async Task<bool> DeleteCart()
        {
            int userId = int.Parse(User.FindFirstValue(ClaimTypes.NameIdentifier));
            bool isDeleted = await _restaurantService.DeleteCart(userId);
            return isDeleted;
        }
        [HttpGet("GetRestaurantsCount")]
        public async Task<int> GetRestaurantsCount()
        {

            int count = await _restaurantService.GetRestaurantsCount();
            return count;
        }

        [HttpGet("GetOrders/{userId}")]
        public async Task<List<OrderDTO>> GetOrders(int userId)
        {
            List<OrderDTO> orders = await _restaurantService.GetOrders(userId);
            return orders;
        }
        //[HttpGet("GetImageStoredProc/{id}")]
        //public async Task<ImageDTO> GetImageStoredProc(int id)
        //{
        //    ImageDTO image = await _restaurantService.GetImageStoredProc(id);
        //    return image;
        //}
    }
}
