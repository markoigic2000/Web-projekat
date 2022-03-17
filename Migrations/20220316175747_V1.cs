using System;
using Microsoft.EntityFrameworkCore.Migrations;

namespace _17640Projekat.Migrations
{
    public partial class V1 : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "Klubovi",
                columns: table => new
                {
                    ID = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    Ime = table.Column<string>(type: "nvarchar(50)", maxLength: 50, nullable: false),
                    Sajt = table.Column<string>(type: "nvarchar(50)", maxLength: 50, nullable: false),
                    Mejl = table.Column<string>(type: "nvarchar(50)", maxLength: 50, nullable: false),
                    Mesto = table.Column<string>(type: "nvarchar(50)", maxLength: 50, nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Klubovi", x => x.ID);
                });

            migrationBuilder.CreateTable(
                name: "Sudije",
                columns: table => new
                {
                    IDSudije = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    brojLicence = table.Column<int>(type: "int", nullable: false),
                    Ime = table.Column<string>(type: "nvarchar(50)", maxLength: 50, nullable: false),
                    Prezime = table.Column<string>(type: "nvarchar(50)", maxLength: 50, nullable: false),
                    Mejl = table.Column<string>(type: "nvarchar(50)", maxLength: 50, nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Sudije", x => x.IDSudije);
                });

            migrationBuilder.CreateTable(
                name: "Igraci",
                columns: table => new
                {
                    IDIgraca = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    brojRegistracije = table.Column<int>(type: "int", nullable: false),
                    Ime = table.Column<string>(type: "nvarchar(50)", maxLength: 50, nullable: false),
                    Prezime = table.Column<string>(type: "nvarchar(50)", maxLength: 50, nullable: false),
                    Mail = table.Column<string>(type: "nvarchar(50)", maxLength: 50, nullable: false),
                    datumRodjenja = table.Column<DateTime>(type: "datetime2", nullable: false),
                    osvojeniTurniri = table.Column<int>(type: "int", nullable: false),
                    osvojeniBodovi = table.Column<int>(type: "int", nullable: false),
                    klubIgracaID = table.Column<int>(type: "int", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Igraci", x => x.IDIgraca);
                    table.ForeignKey(
                        name: "FK_Igraci_Klubovi_klubIgracaID",
                        column: x => x.klubIgracaID,
                        principalTable: "Klubovi",
                        principalColumn: "ID",
                        onDelete: ReferentialAction.Restrict);
                });

            migrationBuilder.CreateTable(
                name: "Turniri",
                columns: table => new
                {
                    ID = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    Grad = table.Column<string>(type: "nvarchar(20)", maxLength: 20, nullable: false),
                    brojBodova = table.Column<int>(type: "int", nullable: false),
                    Naziv = table.Column<string>(type: "nvarchar(100)", maxLength: 100, nullable: false),
                    datumOdrzavanja = table.Column<DateTime>(type: "datetime2", nullable: false),
                    nagradniFond = table.Column<int>(type: "int", nullable: false),
                    PobednikIDIgraca = table.Column<int>(type: "int", nullable: true),
                    organizatorTurniraID = table.Column<int>(type: "int", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Turniri", x => x.ID);
                    table.ForeignKey(
                        name: "FK_Turniri_Igraci_PobednikIDIgraca",
                        column: x => x.PobednikIDIgraca,
                        principalTable: "Igraci",
                        principalColumn: "IDIgraca",
                        onDelete: ReferentialAction.Restrict);
                    table.ForeignKey(
                        name: "FK_Turniri_Klubovi_organizatorTurniraID",
                        column: x => x.organizatorTurniraID,
                        principalTable: "Klubovi",
                        principalColumn: "ID",
                        onDelete: ReferentialAction.Restrict);
                });

            migrationBuilder.CreateTable(
                name: "Mecevi",
                columns: table => new
                {
                    ID = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    Faza = table.Column<string>(type: "nvarchar(30)", maxLength: 30, nullable: false),
                    Kategorija = table.Column<string>(type: "nvarchar(30)", maxLength: 30, nullable: false),
                    sudijaNaMecuIDSudije = table.Column<int>(type: "int", nullable: true),
                    mecNaTurniruID = table.Column<int>(type: "int", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Mecevi", x => x.ID);
                    table.ForeignKey(
                        name: "FK_Mecevi_Sudije_sudijaNaMecuIDSudije",
                        column: x => x.sudijaNaMecuIDSudije,
                        principalTable: "Sudije",
                        principalColumn: "IDSudije",
                        onDelete: ReferentialAction.Restrict);
                    table.ForeignKey(
                        name: "FK_Mecevi_Turniri_mecNaTurniruID",
                        column: x => x.mecNaTurniruID,
                        principalTable: "Turniri",
                        principalColumn: "ID",
                        onDelete: ReferentialAction.Restrict);
                });

            migrationBuilder.CreateTable(
                name: "IgracMec",
                columns: table => new
                {
                    igraciMecaIDIgraca = table.Column<int>(type: "int", nullable: false),
                    meceviIgracaID = table.Column<int>(type: "int", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_IgracMec", x => new { x.igraciMecaIDIgraca, x.meceviIgracaID });
                    table.ForeignKey(
                        name: "FK_IgracMec_Igraci_igraciMecaIDIgraca",
                        column: x => x.igraciMecaIDIgraca,
                        principalTable: "Igraci",
                        principalColumn: "IDIgraca",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_IgracMec_Mecevi_meceviIgracaID",
                        column: x => x.meceviIgracaID,
                        principalTable: "Mecevi",
                        principalColumn: "ID",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateIndex(
                name: "IX_Igraci_klubIgracaID",
                table: "Igraci",
                column: "klubIgracaID");

            migrationBuilder.CreateIndex(
                name: "IX_IgracMec_meceviIgracaID",
                table: "IgracMec",
                column: "meceviIgracaID");

            migrationBuilder.CreateIndex(
                name: "IX_Mecevi_mecNaTurniruID",
                table: "Mecevi",
                column: "mecNaTurniruID");

            migrationBuilder.CreateIndex(
                name: "IX_Mecevi_sudijaNaMecuIDSudije",
                table: "Mecevi",
                column: "sudijaNaMecuIDSudije");

            migrationBuilder.CreateIndex(
                name: "IX_Turniri_organizatorTurniraID",
                table: "Turniri",
                column: "organizatorTurniraID");

            migrationBuilder.CreateIndex(
                name: "IX_Turniri_PobednikIDIgraca",
                table: "Turniri",
                column: "PobednikIDIgraca");
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "IgracMec");

            migrationBuilder.DropTable(
                name: "Mecevi");

            migrationBuilder.DropTable(
                name: "Sudije");

            migrationBuilder.DropTable(
                name: "Turniri");

            migrationBuilder.DropTable(
                name: "Igraci");

            migrationBuilder.DropTable(
                name: "Klubovi");
        }
    }
}
