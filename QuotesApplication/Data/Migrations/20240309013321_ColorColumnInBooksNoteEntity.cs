using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace QuotesApplication.Data.Migrations
{
    /// <inheritdoc />
    public partial class ColorColumnInBooksNoteEntity : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<string>(
                name: "Color",
                table: "BookNotes",
                type: "nvarchar(max)",
                nullable: false,
                defaultValue: "");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "Color",
                table: "BookNotes");
        }
    }
}
