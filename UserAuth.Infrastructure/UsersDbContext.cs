using Microsoft.EntityFrameworkCore;
using UserAuth.Infrastructure.DBModels;
using UserAuth.Infrastructure.DBModels.Restaurant;

namespace UserAuth.Infrastructure
{
    public class UsersDbContext(DbContextOptions<UsersDbContext> options) : DbContext(options)
    {
        public DbSet<User> Users { get; set; }
        public DbSet<DbRestaurant> Restaurants { get; set; }
        public DbSet<DbRestaurantItem> RestaurantItems { get; set; }
        public DbSet<DbCategory> Categories { get; set; }
        public DbSet<DbCartItem> CartItem { get; set; }
        public DbSet<DbOrder> Orders { get; set; }
        public DbSet<DbOrderItem> OrderItems { get; set; }
        public DbSet<Image> Image { get; set; }
        public DbSet<DbItem> Items { get; set; }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {   
            base.OnModelCreating(modelBuilder);
            modelBuilder.Entity<User>().HasData(
                 new User
                 {
                     Id = 1,
                     Name = "John",
                     Email = "john@gmail.com",
                     Type = "User",
                     Password="john123"
                 },
              new User
              {
                  Id = 2,
                  Name = "Reena",
                  Email = "reena@gmail.com",
                  Type = "Admin",
                  Password="reena123"
              }
            );
        }
    }
}
