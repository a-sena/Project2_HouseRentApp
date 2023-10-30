using Microsoft.AspNetCore.Identity;

namespace HouseRentApp.Models
{
    public class User: IdentityUser
    {
        public virtual ICollection<Rental> Apartments { get; set; } = new List<Rental>();

    }

}



