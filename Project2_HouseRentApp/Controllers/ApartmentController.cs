using HouseRentApp.DAL;
using HouseRentApp.DTOs;
using HouseRentApp.Models;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;


namespace HouseRentApp.Controllers
{
    public class ApartmentController : Controller
    {
        private readonly IApartmentRepo _repo;
        private readonly ILogger<ApartmentController> _logger;
        private readonly IHttpContextAccessor _accessor;

        public ApartmentController(IApartmentRepo repo, ILogger<ApartmentController> logger, IHttpContextAccessor accessor)
        {
            _repo = repo;
            _logger = logger;
            _accessor = accessor;
        }

        [HttpGet]
        [Route("Apartment")]
       
        public async Task<IActionResult> Table()
        {
            var Apartments = await _repo.GetAllApartments();
            if (Apartments == null)
            {
                _logger.LogError("could not find the ApartmentList ");
                return NotFound("there is no apartments");
            }

            return Ok(Apartments);
        }


        public async Task<IActionResult> Grid()
        {
            var Apartments = await _repo.GetAllApartments();
            if (Apartments == null)
            {
                _logger.LogError("could not find the ApartmentList ");
                return NotFound("Apartment List not found");
            }

            return View(Apartments);
        }
        [HttpGet]
        [Route("Apartment/{id}")]

        public async Task<IActionResult> Details(int id)
        {
            var apartment = await _repo.GetEnApartment(id);
            if (apartment == null)
            {
                _logger.LogError("could not find the selected Apartment with Id", id);
                return NotFound("the selected Apartment was not found");
            }
            return Ok(apartment);
        }

        //Authorizing for Admin Role
        // [Authorize(Roles = "Admin")]




        [HttpGet]
        [Route("Create")]
        public async Task<IActionResult> Create()
        {
            return View();
        }


        [HttpPost]
        [Route("Create")]

        public async Task<IActionResult> Create([FromBody]Apartment apartment)
        {
            if (!ModelState.IsValid)
            {
                // if the model was not valid  
                var error = ModelState.Values.SelectMany(x => x.Errors);
                foreach (var item in error)
                {
                    _logger.LogError($"error; {item.ErrorMessage}");
                    return BadRequest("Validation error");
                }
                _logger.LogWarning("Creation of a new Apartmet failed", apartment);
                return BadRequest("feil i validation");
            }
            bool resault = await _repo.createApartment(apartment);

            if (resault)
            {
                // if the result was true we redirect to Grid view (to rent out page)
                return RedirectToAction(nameof(Table));
            }
            // when the result is false 
            _logger.LogError("failed to create a new Apartment");
            return BadRequest("failed to create");

        }




        //Authorizing for Admin Role
        //[Authorize(Roles = "Admin")]
        [HttpGet]
        [Route("Update/{id}")]
        public async Task<IActionResult> Update(int id)
        {
            //find apartment and view it
            var apartment = await _repo.GetEnApartment(id);
            if (apartment == null)
            {
                _logger.LogError("No Apartments where found with", id);
                return BadRequest("the Apartment was not found");
            }
            return Ok(apartment);
        }

        


        [HttpPut]
        //Authorizing for Admin Role
        //only users with Admin-Role can access this action
        // [Authorize(Roles = "Admin")]
        [Route("Update/{id}")]
        public async Task<IActionResult> Update([FromBody] Apartment apartment)
        {

            if (!ModelState.IsValid)
            {
                var error = ModelState.Values.SelectMany(x => x.Errors);
                foreach (var item in error)
                {
                    _logger.LogError($"error; {item.ErrorMessage}");
                }
                return BadRequest("input is not valid");
            }
            bool result = await _repo.updateApartment(apartment);
            if (result)
            {
                //if the result is true redirect to Grid view (to rent out page)
                return RedirectToAction(nameof(Grid));
            }
            return Ok(apartment);

        }

        //Authorizing for Admin Role
        // [Authorize(Roles = "Admin")]
        [HttpGet]
        public async Task<IActionResult> Delete(int id)
        {
            var apartment = await _repo.GetEnApartment(id);
            if (apartment == null)
            {
                _logger.LogError("Apartment was not found", id);
                return BadRequest("the apartment with the selected id was not found");
            }
            return Ok(apartment);
        }
        

        [HttpPost]
        //Authorizing for Admin Role
        //only users with Admin-Role can access this action
        [Authorize(Roles = "Admin")]
        public async Task<IActionResult> DeleteConfirmed(int id)
        {
            bool result = await _repo.deleteApartment(id);
            if (result)
            {
                return RedirectToAction(nameof(Grid));
            }
            _logger.LogError("the deletion failed", id);
            return BadRequest("apartment deletion failed");
        }



        [HttpGet]
        //Authorizing for User Role
       // [Authorize(Roles = "User")]

        public async Task<IActionResult> RentApartment()
        {

            return View();

        }



        
        [HttpPost]
        //Authorizing for User Role
        //only users with User-Role can access this action
        //[Authorize(Roles = "User")]

        public async Task<IActionResult> RentApartment(int id, RentlDTO rentalDTO)
        {
            // checks if the modelstate is valid or not
            if (!ModelState.IsValid)
            {
                _logger.LogWarning("Renting of the Apartment failed");
                return NotFound();
            }

            //if modelstate is valid it calls rentApartment method from ApartementRepo
            //getting the result if calling the RentApartment was successful, redirect to Grid action
            var result = await _repo.rentApartment(id, rentalDTO);
            if (result)
            {
                return RedirectToAction(nameof(Grid));


            }
            _logger.LogError("the Renting failed", id);
            return BadRequest("apartment Renting failed");



        }

    }
}

