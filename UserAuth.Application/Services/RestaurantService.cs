using System;
using System.Collections;
using System.Collections.Generic;
using System.IO;
using System.IO.Compression;
using Microsoft.AspNetCore.Http;
using Microsoft.Extensions.Caching.Memory;
using UserAuth.Application.Interfaces;
using UserAuth.Domain.DomainModels;
using UserAuth.Domain.DTOs;
using UserAuth.Infrastructure.DBModels.Restaurant;
using UserAuth.Infrastructure.IRepositories;

namespace UserAuth.Application.Services
{
    public class RestaurantService : IRestaurantService
    {
        private readonly IMemoryCache _cache;
        private readonly IRestaurantRepository _restaurantRepository;
        public RestaurantService(IRestaurantRepository restaurantRepository,IMemoryCache cache)
        {
            _restaurantRepository = restaurantRepository;
            _cache=cache;
        }

        public async Task<List<Restaurant>> GetAll(PaginationParameters paginationParameters)
        {
            return await _restaurantRepository.GetAll(paginationParameters);
        }
        public async Task<Restaurant> GetById(Guid id)
        {
            return await _restaurantRepository.GetById(id);
        }
        public async Task<List<RestaurantItem>> GetDishesByRestaurant(Guid id=default)
        {
            return await _restaurantRepository.GetDishesByRestaurant(id);

        }
        public async Task<List<RestaurantItem>> GetRetaurantItemsOnSearch(string searchString)
        {
            return await _restaurantRepository.GetRetaurantItemsOnSearch(searchString);
        }
        public async Task<List<Restaurant>> GetRetaurantsOnSearch(string searchString)
        {
            return await _restaurantRepository.GetRetaurantsOnSearch(searchString);
        }
        public async Task<List<Category>> GetCategories()
        {
            return await _restaurantRepository.GetCategories();
        }
        public async Task<List<RestaurantItem>> GetCategoryItems(Guid id)
        {
            return await _restaurantRepository.GetCategoryItems(id);
        }
        public async Task<ImageDTO> UploadImage(ImageDTO imageDTO)
        {
            //Read the image into a byte array
            byte[] imageBytes;
            using (var memoryStream = new MemoryStream())
            {
                imageDTO.File.CopyTo(memoryStream);
                imageBytes = memoryStream.ToArray();
            }
            imageDTO.Name = imageDTO.File.FileName;
            imageDTO.Type = imageDTO.File.ContentType;
            imageDTO.ImageData = imageBytes;
            ImageDTO retriveImageDTO = await _restaurantRepository.UploadImage(imageDTO);
            //ImageDTO result =  await RetriveImage(retriveImageDTO);
            return retriveImageDTO; 
        }

        public async Task<List<ImageDTO>> GetImages(string imageType)
        {
            List<ImageDTO> images;
            if (!_cache.TryGetValue(imageType, out images))
            {
                images=await _restaurantRepository.GetImagesStoredProc(imageType);
                var cacheEntryOptions = new MemoryCacheEntryOptions
                {
                    AbsoluteExpirationRelativeToNow = TimeSpan.FromMinutes(1)
                };
                _cache.Set(imageType, images, cacheEntryOptions);
            }
            return images;
        }
        public async Task<int> GetRestaurantsCount()
        {
            return await _restaurantRepository.GetRestaurantsCount();
        }
        //public async Task<ImageDTO> RetriveImage(ImageDTO retriveImageDTO)
        //{
        //    byte[] imageBytes = retriveImageDTO.ImageData; // Your byte array

        //byte[] decompressedData;

        //using (var compressedStream = new MemoryStream(retriveImageDTO.ImageData))
        //{
        //    using (var decompressionStream = new GZipStream(compressedStream, CompressionMode.Decompress))
        //    {
        //        using (var memoryStream = new MemoryStream())
        //        {
        //            await decompressionStream.CopyToAsync(memoryStream);
        //            decompressedData = memoryStream.ToArray();
        //        }
        //    }
        //}

        //retriveImageDTO.retriveImage = Convert.ToBase64String(decompressedData);
        //return retriveImageDTO;
        //}

        public async Task<OrderDTO> AddOrder(OrderDTO orderDTO)
        {
            OrderDTO orderData = await _restaurantRepository.AddOrder(orderDTO);
            if (orderData != null)
            {
                bool isDeleted = await DeleteCart((int)orderDTO.UserId);
            }
            return orderData;
        }
        public async Task<bool> DeleteCart(int id)
        {
            bool isDeleted = await _restaurantRepository.DeleteCart(id);
            return isDeleted;
        }

        public async Task<bool> DeleteRestaurantItem(int userId,Guid restaurantItemId)
        {
            bool isDeleted = await _restaurantRepository.DeleteRestaurantItem(userId, restaurantItemId);
            return isDeleted;
        }

        public async Task<List<OrderDTO>> GetOrders(int userId)
        {
           return await _restaurantRepository.GetOrders(userId);
        }
        public async Task<List<Item>> GetItems()
        {
            return await _restaurantRepository.GetItems();
        }

        public async Task<RestaurantItem> AddRestaurantItem(RestaurantItem restaurantItem)
        {
            RestaurantItem result = await _restaurantRepository.AddRestaurantItem(restaurantItem);
            return result;
        }
        //public async Task<ImageDTO> GetImageStoredProc(int id)
        //{
        //    return await _restaurantRepository.GetImagesStoredProc(id);

        //}
    }
}
