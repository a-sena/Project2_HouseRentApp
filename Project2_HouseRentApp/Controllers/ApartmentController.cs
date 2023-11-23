using HouseRentApp.DAL;
using HouseRentApp.Models;
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




        [HttpGet]
        [Route("Create")]
        public async Task<IActionResult> Create()
        {
            return View();
        }


        [HttpPost]
        [Route("Create")]

        public async Task<IActionResult> Create([FromBody] Apartment apartment)
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
                return RedirectToAction(nameof(Table));

            }
            return BadRequest("error updating the apartment");

        }

      
        [HttpGet]
        [Route("Delete/{id}")]
        public async Task<IActionResult> Delete([FromRoute] int id)
        {
            var apartment = await _repo.GetEnApartment(id);
            if (apartment == null)
            {
                _logger.LogError("Apartment was not found", id);
                return BadRequest("the apartment with the selected id was not found");
            }
            return Ok(apartment);
        }
        

        [HttpDelete]
    
        [Route("Delete/{id}")]
        public async Task<IActionResult> Delete(Apartment apartment)
        {
            bool result = await _repo.deleteApartment(apartment.Id);
            if (result)
            {
                return RedirectToAction(nameof(Table));
            }
            _logger.LogError("the deletion failed");
            return BadRequest("apartment deletion failed");
        }



      
        
       
    }
}

