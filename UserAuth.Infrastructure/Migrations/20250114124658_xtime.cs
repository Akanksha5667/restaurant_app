using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace UserAuth.Infrastructure.Migrations
{
    /// <inheritdoc />
    public partial class xtime : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<decimal>(
                name: "ItemPrice",
                table: "CartItem",
                type: "decimal(18,2)",
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "Name",
                table: "CartItem",
                type: "nvarchar(max)",
                nullable: true);

            migrationBuilder.CreateTable(
                name: "Images",
                columns: table => new
                {
                    Id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    Name = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    ImageData = table.Column<byte[]>(type: "varbinary(max)", nullable: false),
                    Type = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    IsCarousalImage = table.Column<bool>(type: "bit", nullable: false),
                    IsRestaurantImage = table.Column<bool>(type: "bit", nullable: false),
                    IsRestaurantItemImage = table.Column<bool>(type: "bit", nullable: false),
                    IsCategoryImage = table.Column<bool>(type: "bit", nullable: false),
                    CarousalId = table.Column<int>(type: "int", nullable: true),
                    RestaurantId = table.Column<int>(type: "int", nullable: true),
                    ItemId = table.Column<int>(type: "int", nullable: true),
                    CategoryId = table.Column<int>(type: "int", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Images", x => x.Id);
                });
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "Images");

            migrationBuilder.DropColumn(
                name: "ItemPrice",
                table: "CartItem");

            migrationBuilder.DropColumn(
                name: "Name",
                table: "CartItem");
        }
    }
}
