using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace UserAuth.Infrastructure.Migrations
{
    /// <inheritdoc />
    public partial class seventh : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "CarousalId",
                table: "Images");

            migrationBuilder.RenameColumn(
                name: "ItemId",
                table: "Images",
                newName: "RestaurantItemId");

            migrationBuilder.AddColumn<Guid>(
                name: "CategoryId1",
                table: "Images",
                type: "uniqueidentifier",
                nullable: false,
                defaultValue: new Guid("00000000-0000-0000-0000-000000000000"));

            migrationBuilder.AddColumn<Guid>(
                name: "RestaurantId1",
                table: "Images",
                type: "uniqueidentifier",
                nullable: false,
                defaultValue: new Guid("00000000-0000-0000-0000-000000000000"));

            migrationBuilder.AddColumn<Guid>(
                name: "RestaurantItemId1",
                table: "Images",
                type: "uniqueidentifier",
                nullable: false,
                defaultValue: new Guid("00000000-0000-0000-0000-000000000000"));

            migrationBuilder.CreateIndex(
                name: "IX_Images_CategoryId1",
                table: "Images",
                column: "CategoryId1");

            migrationBuilder.CreateIndex(
                name: "IX_Images_RestaurantId1",
                table: "Images",
                column: "RestaurantId1");

            migrationBuilder.CreateIndex(
                name: "IX_Images_RestaurantItemId1",
                table: "Images",
                column: "RestaurantItemId1");

            migrationBuilder.AddForeignKey(
                name: "FK_Images_Categories_CategoryId1",
                table: "Images",
                column: "CategoryId1",
                principalTable: "Categories",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);

            migrationBuilder.AddForeignKey(
                name: "FK_Images_RestaurantItems_RestaurantItemId1",
                table: "Images",
                column: "RestaurantItemId1",
                principalTable: "RestaurantItems",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);

            migrationBuilder.AddForeignKey(
                name: "FK_Images_Restaurants_RestaurantId1",
                table: "Images",
                column: "RestaurantId1",
                principalTable: "Restaurants",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Images_Categories_CategoryId1",
                table: "Images");

            migrationBuilder.DropForeignKey(
                name: "FK_Images_RestaurantItems_RestaurantItemId1",
                table: "Images");

            migrationBuilder.DropForeignKey(
                name: "FK_Images_Restaurants_RestaurantId1",
                table: "Images");

            migrationBuilder.DropIndex(
                name: "IX_Images_CategoryId1",
                table: "Images");

            migrationBuilder.DropIndex(
                name: "IX_Images_RestaurantId1",
                table: "Images");

            migrationBuilder.DropIndex(
                name: "IX_Images_RestaurantItemId1",
                table: "Images");

            migrationBuilder.DropColumn(
                name: "CategoryId1",
                table: "Images");

            migrationBuilder.DropColumn(
                name: "RestaurantId1",
                table: "Images");

            migrationBuilder.DropColumn(
                name: "RestaurantItemId1",
                table: "Images");

            migrationBuilder.RenameColumn(
                name: "RestaurantItemId",
                table: "Images",
                newName: "ItemId");

            migrationBuilder.AddColumn<int>(
                name: "CarousalId",
                table: "Images",
                type: "int",
                nullable: true);
        }
    }
}
