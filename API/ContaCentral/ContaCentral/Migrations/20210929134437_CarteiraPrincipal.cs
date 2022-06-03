using Microsoft.EntityFrameworkCore.Migrations;

namespace ContaCentral.Migrations
{
    public partial class CarteiraPrincipal : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<bool>(
                name: "Principal",
                table: "Carteira",
                type: "tinyint(1)",
                nullable: false,
                defaultValue: false);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "Principal",
                table: "Carteira");
        }
    }
}
