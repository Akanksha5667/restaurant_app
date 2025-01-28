using AutoMapper;
using UserAuth.Domain.DomainModels;
using UserAuth.Domain.DTOs;
using UserAuth.Infrastructure.DBModels;
using UserAuth.Infrastructure.DBModels.Restaurant;


namespace UserAuth.Application
{
    public class AutoMapperProfile: Profile
    {
        public AutoMapperProfile()
        {
            CreateMap<UserDTO, User>().ReverseMap();
            CreateMap<Restaurant,DbRestaurant>().ReverseMap();
            CreateMap<DbRestaurantItem, RestaurantItem>().ReverseMap();
            CreateMap<DbCartItem, CartItem>().ReverseMap();
            CreateMap<DbCategory, Category>().ReverseMap();
            CreateMap<ImageDTO, Image>().ReverseMap();
            CreateMap<ImageDTO, Image>().ReverseMap();
            CreateMap<DbOrder, OrderDTO>().ReverseMap();

        }
    }
}
