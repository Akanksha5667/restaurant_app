using System.Data;
using AutoMapper;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using UserAuth.Domain.DomainModels;
using UserAuth.Domain.DTOs;
using UserAuth.Infrastructure.DBModels;
using UserAuth.Infrastructure.DBModels.Restaurant;
using UserAuth.Infrastructure.IRepositories;

namespace UserAuth.Infrastructure.Repositories
{
    public class RestaurantRepository : IRestaurantRepository
    {
        private readonly UsersDbContext _dbContext;
        private readonly IMapper _mapper;
        private readonly IConfiguration _config;
        public RestaurantRepository(UsersDbContext dbContext, IMapper mapper, IConfiguration config)
        {
            _dbContext = dbContext;
            _mapper = mapper;
            _config = config;
        }

        public async Task<List<Restaurant>> GetAll(PaginationParameters paginationParameters)
        {
            List<DbRestaurant> restaurants = await _dbContext.Restaurants
                .Skip((paginationParameters.PageNumber - 1) * paginationParameters.PageSize)
                .Take(paginationParameters.PageSize).ToListAsync();
            return _mapper.Map<List<Restaurant>>(restaurants);
        }

        public async Task<Restaurant> GetById(Guid id)
        {
            DbRestaurant restaurant = _dbContext.Restaurants.Where(restaurant => restaurant.Id == id).FirstOrDefault();
            return _mapper.Map<Restaurant>(restaurant); ;
        }

        public async Task<List<RestaurantItem>> GetDishesByRestaurant(Guid id)
        {
            List<DbRestaurantItem> restaurantItems = _dbContext.RestaurantItems.Where(item => item.RestaurantId == id).ToList();
            return _mapper.Map<List<RestaurantItem>>(restaurantItems); ;
        }

        public async Task<List<RestaurantItem>> GetRetaurantItemsOnSearch(string searchString)
        {
            List<DbRestaurantItem> restaurantItems = await _dbContext.RestaurantItems.Where(item => item.Name.Contains(searchString)).ToListAsync();
            var items = restaurantItems.Join(
                _dbContext.Restaurants,
                item => item.RestaurantId,
                restaurant => restaurant.Id,
                (item, restaurant) => new RestaurantItem
                {
                    Id = item.Id,
                    Name = item.Name,
                    RestaurantId = item.RestaurantId,
                    RestaurantName = restaurant.Name,
                    CategoryId = item.CategoryId,
                    CategoryName = item.CategoryName,
                    Details = item.Details,
                    Price = item.Price,
                }
                ).ToList();
            return _mapper.Map<List<RestaurantItem>>(items);
        }

        public async Task<List<Restaurant>> GetRetaurantsOnSearch(string searchString)
        {
            List<DbRestaurant> restaurants = await _dbContext.Restaurants.Where(item => item.Name.Contains(searchString)).ToListAsync();

            return _mapper.Map<List<Restaurant>>(restaurants);
        }

        public async Task<List<Category>> GetCategories()
        {
            List<DbCategory> categories = await _dbContext.Categories.ToListAsync();
            return _mapper.Map<List<Category>>(categories);

        }

        public async Task<List<RestaurantItem>> GetCategoryItems(Guid id)
        {
            List<DbRestaurantItem> restaurantItems = await _dbContext.RestaurantItems.Where(item => item.CategoryId == id).ToListAsync();

            return _mapper.Map<List<RestaurantItem>>(restaurantItems);
        }
        public async Task<ImageDTO> UploadImage(ImageDTO imageDTO)
        {
            Image result = _dbContext.Image.Add(_mapper.Map<Image>(imageDTO)).Entity;
            _dbContext.SaveChanges();
            return _mapper.Map<ImageDTO>(result);
        }

        public async Task<List<ImageDTO>> GetImages(string imageType)
        {
            List<Image> images = new List<Image>();
            if (imageType == "category")
            {
                images = _dbContext.Image.Where(image => image.IsCategoryImage == true).ToList();
            }
            else if (imageType == "RestaurantItem")
            {
                images = _dbContext.Image.Where(image => image.IsRestaurantItemImage == true).ToList();
            }
            else if (imageType == "Restaurant")
            {
                images = _dbContext.Image.Where(image => image.IsRestaurantImage == true).ToList();
            }
            else if (imageType == "Carousal")
            {
                images = _dbContext.Image.Where(image => image.IsCarousalImage == true).ToList();
            }
            return _mapper.Map<List<ImageDTO>>(images);
        }

        public async Task<OrderDTO> AddOrder(OrderDTO orderDTO)
        {
            orderDTO.Date = DateTime.Now;
            orderDTO.Id = Guid.NewGuid();
            DbOrder order = _dbContext.Orders.Add(_mapper.Map<DbOrder>(orderDTO)).Entity;
            //DbOrder order = new DbOrder();
            return _mapper.Map<OrderDTO>(order);
        }

        public async Task<bool> DeleteCart(int id)
        {
            try
            {
                List<DbCartItem> cartItems = _dbContext.CartItem.Where((item) => item.UserId == id).ToList();
                _dbContext.CartItem.RemoveRange(cartItems);
                await _dbContext.SaveChangesAsync();
                return true;
            }
            catch
            {
                throw;
            }
        }

        public async Task<int> GetRestaurantsCount()
        {
            int count = _dbContext.Restaurants.Count();
            return count;
        }

        public async Task<List<ImageDTO>> GetImagesStoredProc(string imageType)
        {
            //            use UsersDb
            //go
            //create procedure GetImages @Type varchar(250) as
            //Begin
            //if @Type = 'category'
            //begin
            //select* from Image where IsCategoryImage = 1;
            //            end
            //else if @Type = 'restaurant'
            //begin
            //select* from Image where IsRestaurantImage = 1;
            //            end
            //else if @Type = 'restaurantItem'
            //begin
            //select* from Image where IsRestaurantItemImage = 1;
            //            end
            //else
            //                begin
            //select* from Image where IsCarousalImage = 1;
            //            end end

            List<Image> images = await _dbContext.Set<Image>().FromSql($"EXEC GetImages @Type = {imageType}").ToListAsync();
            return _mapper.Map<List<ImageDTO>>(images);
        }

        public async Task<List<OrderDTO>> GetOrders(int userId)
        {
            List<DbOrder> orders = await _dbContext.Orders.Where(order=>order.UserId==userId).ToListAsync();
            return _mapper.Map<List<OrderDTO>>(orders);
        }
    }
}
