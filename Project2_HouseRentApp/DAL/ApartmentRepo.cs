
using HouseRentApp.AppDB;
using HouseRentApp.DTOs;
using HouseRentApp.Models;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;

namespace HouseRentApp.DAL
{
    public class ApartmentRepo : IApartmentRepo
    {
        private readonly Db _db;
        private readonly ILogger<ApartmentRepo> _logger;
        private readonly UserManager<IdentityUser> _userManager;
        private readonly IHttpContextAccessor _accessor;

        public ApartmentRepo(Db db, ILogger<ApartmentRepo> logger, UserManager<IdentityUser> userManager,
            IHttpContextAccessor accessor)
        {
            _db = db;
            _logger = logger;
            _userManager = userManager;
            _accessor = accessor;
        }

        public async Task<IEnumerable<Apartment>> GetAllApartments()
        {
            try
            {
                var apartments = await _db.Apartments.ToListAsync();
                return apartments;
            }
            catch (Exception ex)
            {
                _logger.LogError(" failed to show ApartmentTable." +
                    " the error is:", ex.Message);
                return null;
            }

        }


        public async Task<Apartment> GetEnApartment(int Id)
        {
            try
            {
                var apartment = await _db.Apartments.FirstOrDefaultAsync(x => x.Id == Id);
                return apartment;
            }
            catch (Exception ex)
            {
                _logger.LogError(" failed to show the selected Apartment." +
                    " the error is:", ex.Message);
                return null;
            }



        }

        public async Task<bool> createApartment(Apartment apartment)
        {
            try
            {
                _db.Apartments.Add(apartment);
                await _db.SaveChangesAsync();
                return true;
            }
            catch (Exception ex)
            {
                _logger.LogError(" failed to create a new Apartment." +
                                   " the error is:", ex.Message);
                return false;
            }

        }

        public async Task<bool> updateApartment(Apartment apartment)
        {
            try
            {
                _db.Apartments.Update(apartment);
                await _db.SaveChangesAsync();
                return true;
            }
            catch (Exception ex)
            {
                _logger.LogError(" failed to update the selected Apartment." +
                                 " the error is:", ex.Message);
                return false;
            }

        }

        public async Task<bool> deleteApartment(int id)
        {
            try
            {
                var apartment = await _db.Apartments.FindAsync(id);
                if (apartment == null)
                {
                    return false;
                }
                _db.Apartments.Remove(apartment);
                await _db.SaveChangesAsync();
                return true;
            }
            catch (Exception ex)
            {
                _logger.LogError(" failed to delete the selected Apartment." +
                                " the error is:", ex.Message);
                return false;
            }

        }



        public async Task<bool> rentApartment(int id, RentlDTO rentlDTO)
        {
            //first we obtain the current user and calculate the number of rentaldays based on rentalDTO provided StartDate and EndDate 
            try
            {
                var identityuser = await _userManager.GetUserAsync(_accessor.HttpContext.User);



                TimeSpan timeDifference = rentlDTO.EndDate - rentlDTO.StartDate;
                int numberOfDays = timeDifference.Days;
                //Verifies the existence of the User, and if the same rental for the same apartment and user exists
                if (identityuser == null)
                {
                    _logger.LogError("identityUser is null");
                    return false;
                }
                else
                {


                    var apartment = await _db.Apartments.FindAsync(id);

                    if (apartment == null)
                    {
                        _logger.LogError("apartment is null");
                        return false;
                    }
                    else
                    {
                        var existingRental = await _db.Rentals
                                           .Where(r =>
                                           r.ApartmentId == apartment.Id
                                           && r.UserId == identityuser.Id)
                                           .FirstOrDefaultAsync();
                        //if a rental is already in place, it updates the rental details in database
                        if (existingRental != null)
                        {
                            // Update the existing rental
                            existingRental.StartDate = rentlDTO.StartDate;
                            existingRental.EndDate = rentlDTO.EndDate;
                            existingRental.Price = apartment.Price * numberOfDays;

                            await _db.SaveChangesAsync();
                            return true;
                        }
                        else
                        {
                            //a new rental is created and added to the database
                            var rental = new Rental
                            {

                                Apartment = apartment,
                                User = identityuser as User,
                                StartDate = rentlDTO.StartDate,
                                EndDate = rentlDTO.EndDate,
                                Price = apartment.Price * numberOfDays,

                                ApartmentId = apartment.Id,
                                UserId = identityuser.Id,
                            };


                            await _db.Rentals.AddAsync(rental);
                            await _db.SaveChangesAsync();
                            return true;




                        }
                    }


                }

            }
            catch (Exception ex)
            {
                _logger.LogError(" failed to rent the selected Apartment." +
                                " the error is:", ex.Message);
                return false;

            }
        }
    }
}
