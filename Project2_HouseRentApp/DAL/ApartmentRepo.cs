using HouseRentApp.AppDB;
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
                _logger.LogError("Failed to create a new Apartment. The error is: {ErrorMessage}", ex.ToString());
                return false;
            }


        }

        public async Task<bool> updateApartment(Apartment apartment)
        {
            try
            {
                var ExistingApartment= await _db.Apartments.FindAsync(apartment.Id);
                if (ExistingApartment == null)
                {
                    return false;
                }
                ExistingApartment.Adress = apartment.Adress;
                ExistingApartment.FirstRentalDate = apartment.FirstRentalDate;
                ExistingApartment.Price = apartment.Price;
                ExistingApartment.Square = apartment.Square;
                ExistingApartment.NumOfRooms = apartment.NumOfRooms;
                ExistingApartment.Description = apartment.Description;
                ExistingApartment.Name = apartment.Name;
                ExistingApartment.ImageUrl1 = apartment.ImageUrl1;
                ExistingApartment.ImageUrl2 = apartment.ImageUrl2;
                ExistingApartment.ImageUrl3 = apartment.ImageUrl3;
                ExistingApartment.ImageUrl4 = apartment.ImageUrl4;

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



       

    }
}
