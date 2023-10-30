using System.ComponentModel.DataAnnotations;

namespace HouseRentApp.DTOs
{
    //A data transfer object used for specifying rental start and end dates
    public class RentlDTO
    {
        [Required(ErrorMessage = "Start date is required")]
        [DataType(DataType.Date)]
        public DateTime StartDate { get; set; }


        [Required(ErrorMessage = "End date is required")]
        [DataType(DataType.Date)]

        public DateTime EndDate { get; set; }

    }
}
