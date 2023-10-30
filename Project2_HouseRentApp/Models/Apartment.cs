using System.ComponentModel.DataAnnotations;

namespace HouseRentApp.Models
{
    public class Apartment
    {

        public int Id { get; set; }

        //[Required]
        [RegularExpression(@"^[\w\s]+,\s+[\w\s]+,\s+\d{4}$",
               ErrorMessage = "Please enter a valid address in the format 'Street Name, City, Zip Code'.")]
        //Example: Elias kræmmersvei, Drammen, 3023
        public string Adress { get; set; }


        //[Required]
        [RegularExpression(@"^[1-9]$",
               ErrorMessage = "Please enter a number from 1 to 9.")]

        public int NumOfRooms { get; set; }



        //[Required]
        [RegularExpression(@"^\d+(\.\d{1,2})?$",
                ErrorMessage = "Please enter a valid price.")]


        public int Price { get; set; }



        //[Required]
        [RegularExpression(@"^[a-zA-Z0-9\sæøåÆØÅ\-\.,'#&()]+$",
               ErrorMessage = "Please enter a valid apartment name.")]

        public string Name { get; set; }



        //[Required]

        [RegularExpression(@"^\d+(\.\d+)?$",
              ErrorMessage = "Please enter a valid square value.")]

        public int Square { get; set; }



        //[Required]

        [RegularExpression(@"^[\s\S]+$",
               ErrorMessage = "Please enter a description.")]

        public string Description { get; set; }




        //[Required]
        [RegularExpression(@"^\d{2}\.\d{2}\.\d{4}$",
            ErrorMessage = "Please enter a valid date in the format 'DD.MM.YYYY'.")]

        public string FirstRentalDate { get; set; }

        //[Required]
        [RegularExpression(@"^(https?|ftp)://[^\s/$.?#].[^\s]*\.(jpg|jpeg|png|gif|bmp)|\/[^\s/$.?#].[^\s]*\.(jpg|jpeg|png|gif|bmp)$",
            ErrorMessage = "Please enter a valid image URL.")]


        public string ImageUrl1 { get; set; }
        public string? ImageUrl2 { get; set; }
        public string? ImageUrl3 { get; set; }
        public string? ImageUrl4 { get; set; }
        public virtual ICollection<Rental> Users { get; set; } = new List<Rental>();


    }
}