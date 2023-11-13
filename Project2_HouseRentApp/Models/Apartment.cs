using System.ComponentModel.DataAnnotations;

namespace HouseRentApp.Models
{
    public class Apartment
    {

        public int Id { get; set; }

        [Required(ErrorMessage = "Address is required")]
        [RegularExpression(@"^[\w\s]+,\s+[\w\s]+,\s+\d{4}$",
               ErrorMessage = "Please enter a valid address in the format 'Street Name, City, Zip Code'.")]
        //Example: Elias kræmmersvei, Drammen, 3023
        public string Adress { get; set; }




        [Range(1, 9, ErrorMessage = "Please enter a number from 1 to 9.")]

        public int NumOfRooms { get; set; }




        [Range(1, int.MaxValue, ErrorMessage = "Please enter a valid price.")]
        public int Price { get; set; }



        [Required(ErrorMessage = "Name is required")]
        [RegularExpression(@"^[a-zA-Z0-9\sæøåÆØÅ\-\.,'#&()]+$",
               ErrorMessage = "Please enter a valid apartment name.")]

        public string Name { get; set; }



      

        [RegularExpression(@"^\d+(\.\d+)?$",
              ErrorMessage = "Please enter a valid square value.")]

        public int Square { get; set; }



        [Required(ErrorMessage = "Description is required")]
        [RegularExpression(@"^[\s\S]+$",
               ErrorMessage = "Please enter a description.")]

        public string Description { get; set; }



        [Required(ErrorMessage = "FirstRentalDate is required")]

        [RegularExpression(@"^\d{2}\.\d{2}\.\d{4}$",
            ErrorMessage = "Please enter a valid date in the format 'DD.MM.YYYY'.")]

        public string FirstRentalDate { get; set; }


        [Required(ErrorMessage = "ImageURL1 is required")]
        [RegularExpression(@"^(https?|ftp)://[^\s/$.?#].[^\s]*\.(jpg|jpeg|png|gif|bmp)|\/[^\s/$.?#].[^\s]*\.(jpg|jpeg|png|gif|bmp)$",
            ErrorMessage = "Please enter a valid image URL.")]


        public string ImageUrl1 { get; set; }
        public string? ImageUrl2 { get; set; }
        public string? ImageUrl3 { get; set; }
        public string? ImageUrl4 { get; set; }
       // public virtual ICollection<Rental> Users { get; set; } = new List<Rental>();


    }
}