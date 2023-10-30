

namespace HouseRentApp.Models
{

    //to make a many to many relationship
    //between the Apartment and IdentityUser
    //we need to make Rental class 

    //we will referer to it in both Apartement and User class
    public class Rental
    {
        
        public int ApartmentId { get; set; }
        public Apartment Apartment { get; set; }

        
        public string UserId { get; set; }
        public User User { get; set; }

        
        public DateTime StartDate { get; set; }

        
        public DateTime EndDate { get; set; }

        public int Price { get; set; }
    }
}
