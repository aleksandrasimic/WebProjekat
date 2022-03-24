using Microsoft.EntityFrameworkCore.Migrations;

namespace Projekat.Migrations
{
    public partial class V1 : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "Picerija",
                columns: table => new
                {
                    ID = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    Naziv = table.Column<string>(type: "nvarchar(50)", maxLength: 50, nullable: true),
                    Adresa = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    Kapacitet = table.Column<int>(type: "int", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Picerija", x => x.ID);
                });

            migrationBuilder.CreateTable(
                name: "Porudzbina",
                columns: table => new
                {
                    ID = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    Jelovnik = table.Column<string>(type: "nvarchar(50)", maxLength: 50, nullable: true),
                    Napici = table.Column<string>(type: "nvarchar(50)", maxLength: 50, nullable: true),
                    PicerijaIDPicerije = table.Column<int>(type: "int", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Porudzbina", x => x.ID);
                    table.ForeignKey(
                        name: "FK_Porudzbina_Picerija_PicerijaIDPicerije",
                        column: x => x.PicerijaIDPicerije,
                        principalTable: "Picerija",
                        principalColumn: "ID",
                        onDelete: ReferentialAction.Restrict);
                });

            migrationBuilder.CreateTable(
                name: "Sto",
                columns: table => new
                {
                    ID = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    Broj = table.Column<int>(type: "int", nullable: false),
                    Stanje = table.Column<string>(type: "nvarchar(20)", maxLength: 20, nullable: true),
                    TrenutniKapacitet = table.Column<int>(type: "int", nullable: false),
                    MaxKapacitet = table.Column<int>(type: "int", nullable: false),
                    Ime = table.Column<string>(type: "nvarchar(50)", maxLength: 50, nullable: true),
                    Prezime = table.Column<string>(type: "nvarchar(50)", maxLength: 50, nullable: true),
                    PicerijaIDPicerije = table.Column<int>(type: "int", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Sto", x => x.ID);
                    table.ForeignKey(
                        name: "FK_Sto_Picerija_PicerijaIDPicerije",
                        column: x => x.PicerijaIDPicerije,
                        principalTable: "Picerija",
                        principalColumn: "ID",
                        onDelete: ReferentialAction.Restrict);
                });

            migrationBuilder.CreateIndex(
                name: "IX_Porudzbina_PicerijaIDPicerije",
                table: "Porudzbina",
                column: "PicerijaIDPicerije");

            migrationBuilder.CreateIndex(
                name: "IX_Sto_PicerijaIDPicerije",
                table: "Sto",
                column: "PicerijaIDPicerije");
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "Porudzbina");

            migrationBuilder.DropTable(
                name: "Sto");

            migrationBuilder.DropTable(
                name: "Picerija");
        }
    }
}
