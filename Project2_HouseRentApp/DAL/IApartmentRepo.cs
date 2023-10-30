using HouseRentApp.DTOs;
using HouseRentApp.Models;


namespace HouseRentApp.DAL
{
    public interface IApartmentRepo
    {
        Task<IEnumerable<Apartment>> GetAllApartments();
        Task<Apartment> GetEnApartment(int Id);
        Task<bool> createApartment(Apartment apartment);
        Task<bool> updateApartment(Apartment apartment);
        Task<bool> deleteApartment(int id);
        Task<bool> rentApartment(int id, RentlDTO rentlDTO);
    }
}
