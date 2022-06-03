using System;
using Microsoft.EntityFrameworkCore.Migrations;

namespace ContaCentral.Migrations
{
    public partial class Relatorio : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "RelatorioRecDesp",
                columns: table => new
                {
                    CarteiraId = table.Column<int>(type: "int", nullable: false),
                    Ano = table.Column<int>(type: "int", nullable: false),
                    Mes = table.Column<int>(type: "int", nullable: false),
                    Receita = table.Column<decimal>(type: "decimal(65,30)", nullable: false),
                    Despesa = table.Column<decimal>(type: "decimal(65,30)", nullable: false),
                    Total = table.Column<decimal>(type: "decimal(65,30)", nullable: false),
                    CreatedAt = table.Column<DateTime>(type: "datetime(6)", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_RelatorioRecDesp", x => new { x.CarteiraId, x.Ano, x.Mes });
                })
                .Annotation("MySql:CharSet", "utf8mb4");
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "RelatorioRecDesp");
        }
    }
}
