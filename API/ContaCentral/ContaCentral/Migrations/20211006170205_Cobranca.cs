using System;
using Microsoft.EntityFrameworkCore.Metadata;
using Microsoft.EntityFrameworkCore.Migrations;

namespace ContaCentral.Migrations
{
    public partial class Cobranca : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "Cobranca",
                columns: table => new
                {
                    Id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("MySql:ValueGenerationStrategy", MySqlValueGenerationStrategy.IdentityColumn),
                    Valor = table.Column<decimal>(type: "decimal(65,30)", nullable: false),
                    Descricao = table.Column<string>(type: "longtext", nullable: true)
                        .Annotation("MySql:CharSet", "utf8mb4"),
                    Data = table.Column<DateTime>(type: "datetime(6)", nullable: false),
                    FromUserId = table.Column<Guid>(type: "char(36)", nullable: false, collation: "ascii_general_ci"),
                    ToUserId = table.Column<Guid>(type: "char(36)", nullable: false, collation: "ascii_general_ci"),
                    FromCarteiraId = table.Column<int>(type: "int", nullable: false),
                    ToCarteiraId = table.Column<int>(type: "int", nullable: false),
                    CobrancaAtiva = table.Column<bool>(type: "tinyint(1)", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Cobranca", x => x.Id);
                    table.ForeignKey(
                        name: "FK_Cobranca_AspNetUsers_FromUserId",
                        column: x => x.FromUserId,
                        principalTable: "AspNetUsers",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_Cobranca_AspNetUsers_ToUserId",
                        column: x => x.ToUserId,
                        principalTable: "AspNetUsers",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_Cobranca_Carteira_FromCarteiraId",
                        column: x => x.FromCarteiraId,
                        principalTable: "Carteira",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_Cobranca_Carteira_ToCarteiraId",
                        column: x => x.ToCarteiraId,
                        principalTable: "Carteira",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                })
                .Annotation("MySql:CharSet", "utf8mb4");

            migrationBuilder.CreateIndex(
                name: "IX_Cobranca_FromCarteiraId",
                table: "Cobranca",
                column: "FromCarteiraId");

            migrationBuilder.CreateIndex(
                name: "IX_Cobranca_FromUserId",
                table: "Cobranca",
                column: "FromUserId");

            migrationBuilder.CreateIndex(
                name: "IX_Cobranca_ToCarteiraId",
                table: "Cobranca",
                column: "ToCarteiraId");

            migrationBuilder.CreateIndex(
                name: "IX_Cobranca_ToUserId",
                table: "Cobranca",
                column: "ToUserId");
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "Cobranca");
        }
    }
}
