using HouseRentApp.Controllers;
using HouseRentApp.DAL;
using HouseRentApp.Models;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;
using Moq;
using Xunit;

namespace XunitHouseRentApp;

public class ApartmentControllerTests
{
    // At first I planed to use a constructor (Constructor inisialization) here because I believe it is not 
    // necessary to isolate each test, so each test can use the same mock objects. And also the code is cleaner this way.
    // But later on I decided to isolate each test more and used Inline Inisialization and defined the mock instances
    // in every test function seperately as the example codes from the lectures.

    // I wrote the positive and nehgative test codes for the methodes in the ApartmentController.cs

    // Test for Succesful Table()

    [Fact]
    public async Task TablePositiveTest()
    {

        // I created apartment objects with valid info to doa positive test which test the apartment objects exist.
        // in the other test functions I just reused(copy paste) the same example apartment objects here.
        var apartmentobjects = new List<Apartment>
        {
            new Apartment
            {
                Id = 1,
                Adress = "olav trokivs, ve, 2022",
                NumOfRooms = 3,
                Price = 1200,
                Name = "Perfectt Apartment",
                Square = 500,
                Description = "Sometimes good , Sometimes Bad:)",
                FirstRentalDate = "01.06.2023",
                ImageUrl1 = "http://fantasy.com/image1.jpg"
            },
            new Apartment
            {
                Id = 2,
                Adress = "Olso, Center, 5678",
                NumOfRooms = 2,
                Price = 1500,
                Name = "Suoer DUper",
                Square = 450,
                Description = "You are the luciest if you have this house LOL!",
                FirstRentalDate = "15.07.2023",
                ImageUrl1 = "http://fantasy.com/image2.jpg"
            }
        };

        var mockApartmentRepository = new Mock<IApartmentRepo>();
        mockApartmentRepository.Setup(repo => repo.GetAllApartments()).ReturnsAsync(apartmentobjects);

        var mockLogger = new Mock<ILogger<ApartmentController>>();
        // I added mockAccessor because in the ApartmentController we had :"IHttpContextAccessor _accessor"
        var mockAccessor = new Mock<IHttpContextAccessor>();

        var apartmentController = new ApartmentController(mockApartmentRepository.Object, mockLogger.Object, mockAccessor.Object);

        var resault = await apartmentController.Table();

        var positiveResult = Assert.IsType<OkObjectResult>(resault);
        var apartments = Assert.IsAssignableFrom<IEnumerable<Apartment>>(positiveResult.Value);
        Assert.NotEmpty(apartments);
    }

    // Test for Unsuccessful Table()

    [Fact]
    public async Task TableNehativeTest()
    {
        var mockApartmentRepository = new Mock<IApartmentRepo>();

        // here the method returns null, because we are testig the negative case where no apartment exist..
        mockApartmentRepository.Setup(repo => repo.GetAllApartments()).ReturnsAsync(() => null);

        var mockLogger = new Mock<ILogger<ApartmentController>>();
        var mockAccessor = new Mock<IHttpContextAccessor>();
        var apartmentController = new ApartmentController(mockApartmentRepository.Object, mockLogger.Object, mockAccessor.Object);


        var result = await apartmentController.Table();

        Assert.IsType<NotFoundObjectResult>(result);
    }

    // Test for Successful Grid()

    [Fact]
    public async Task GridPositiveTest()
    {


        // I reused(copy-paste) the apartment objects i made before for the Table() test again here.
        var apartmentobjects = new List<Apartment>
        {
            new Apartment
            {
                Id = 1,
                Adress = "olav trokivs, ve, 2022",
                NumOfRooms = 3,
                Price = 1200,
                Name = "Perfectt Apartment",
                Square = 500,
                Description = "Sometimes good , Sometimes Bad:)",
                FirstRentalDate = "01.06.2023",
                ImageUrl1 = "http://fantasy.com/image1.jpg"
            },
            new Apartment
            {
                Id = 2,
                Adress = "Olso, Center, 5678",
                NumOfRooms = 2,
                Price = 1500,
                Name = "Suoer DUper",
                Square = 450,
                Description = "You are the luciest if you have this house LOL!",
                FirstRentalDate = "15.07.2023",
                ImageUrl1 = "http://fantasy.com/image2.jpg"
            }
        };

        var mockApartmentRepository = new Mock<IApartmentRepo>();
        mockApartmentRepository.Setup(repo => repo.GetAllApartments()).ReturnsAsync(apartmentobjects);

        var mockLogger = new Mock<ILogger<ApartmentController>>();
        var mockAccessor = new Mock<IHttpContextAccessor>();
        var apartmentController = new ApartmentController(mockApartmentRepository.Object, mockLogger.Object, mockAccessor.Object);

        var res = await apartmentController.Grid();

        var viewResult = Assert.IsType<ViewResult>(res);
        var model = Assert.IsAssignableFrom<IEnumerable<Apartment>>(viewResult.Model);
        Assert.Equal(apartmentobjects.Count, model.Count());
    }

    // Test for Unsuccesful Grid()

    [Fact]
    public async Task GridNegativeTest()
    {
        var mockApartmentRepository = new Mock<IApartmentRepo>();
        var mockLogger = new Mock<ILogger<ApartmentController>>();
        var mockAccessor = new Mock<IHttpContextAccessor>();
        var apartmentController = new ApartmentController(mockApartmentRepository.Object, mockLogger.Object, mockAccessor.Object);

        // again no apartment exist so the method returns null.
        mockApartmentRepository.Setup(repo => repo.GetAllApartments()).ReturnsAsync(() => null);

        var result = await apartmentController.Grid();

        Assert.IsType<NotFoundObjectResult>(result);
    }

    // Test for Successful Details Retrieval

    [Fact]
    public async Task DetailsPagePositiveTest()
    {

        var mockApartmentRepository = new Mock<IApartmentRepo>();
        var mockLogger = new Mock<ILogger<ApartmentController>>();
        var mockAccessor = new Mock<IHttpContextAccessor>();
        var apartmentController = new ApartmentController(mockApartmentRepository.Object, mockLogger.Object, mockAccessor.Object);

        var mockApartment = new Apartment
        {
            Id = 1,
            Adress = "Olso, Center, 5678",
            NumOfRooms = 2,
            Price = 1500,
            Name = "Suoer DUper",
            Square = 450,
            Description = "You are the luciest if you have this house LOL!",
            FirstRentalDate = "11.07.2023",
            ImageUrl1 = "http://fantasy.com/image2.jpg"
        };

        int validId = mockApartment.Id;

        mockApartmentRepository.Setup(repo => repo.GetEnApartment(validId)).ReturnsAsync(mockApartment);

        var result = await apartmentController.Details(validId);

        var okResult = Assert.IsType<OkObjectResult>(result);
        var apartment = Assert.IsType<Apartment>(okResult.Value);
        Assert.Equal(validId, apartment.Id);
    }

    // Test for Apartment Not Found

    [Fact]
    public async Task DetailsPageNegativeTest()
    {
        var mockApartmentRepository = new Mock<IApartmentRepo>();
        var mockLogger = new Mock<ILogger<ApartmentController>>();
        var mockAccessor = new Mock<IHttpContextAccessor>();
        var apartmentController = new ApartmentController(mockApartmentRepository.Object, mockLogger.Object, mockAccessor.Object);

        // -1 is an invalid apartment id. 
        var invalidId = -1;
        mockApartmentRepository.Setup(repo => repo.GetEnApartment(invalidId)).ReturnsAsync(() => null);

        var result = await apartmentController.Details(invalidId);

        Assert.IsType<NotFoundObjectResult>(result);
    }

    // Test for Valid Apartment Creation
    [Fact]
    public async Task CreatePositiveTest()
    {
        var mockApartmentRepository = new Mock<IApartmentRepo>();
        var mockLogger = new Mock<ILogger<ApartmentController>>();
        var mockAccessor = new Mock<IHttpContextAccessor>();
        var apartmentController = new ApartmentController(mockApartmentRepository.Object, mockLogger.Object, mockAccessor.Object);

        var newApartment = new Apartment
        {
            Id = 2,
            Adress = "Olso, Center, 5678",
            NumOfRooms = 2,
            Price = 1500,
            Name = "Suoer DUper",
            Square = 450,
            Description = "You are the luciest if you have this house LOL!",
            FirstRentalDate = "13.07.2023",
            ImageUrl1 = "http://fantasy.com/image2.jpg"
        };

        mockApartmentRepository.Setup(repo => repo.createApartment(newApartment)).ReturnsAsync(true);

        var result = await apartmentController.Create(newApartment);

        var result_redirect = Assert.IsType<RedirectToActionResult>(result);
        Assert.Equal(nameof(ApartmentController.Table), result_redirect.ActionName);
    }

    // Test for Invalid Apartment Creation

    [Fact]
    public async Task CreateNegativeTest()
    {

        // invalid apartment with some missing values.
        var invalidApartment = new Apartment
        {
            Id = '3',
            NumOfRooms = '2',
            Price = 1200,
            Name = "My Apartment",
            Description = "A cozy apartment LOL.",
            FirstRentalDate = "01.06.2023",
            ImageUrl1 = "http://example.com/image1.jpg"
        };

        var mockApartmentRepository = new Mock<IApartmentRepo>();
        mockApartmentRepository.Setup(repo => repo.createApartment(invalidApartment)).ReturnsAsync(false);

        var mockLogger = new Mock<ILogger<ApartmentController>>();
        var mockAccessor = new Mock<IHttpContextAccessor>();
        var apartmentController = new ApartmentController(mockApartmentRepository.Object, mockLogger.Object, mockAccessor.Object);

        var result = await apartmentController.Create(invalidApartment);

        // Because of the method returns a BadRequest result when the creation of the new apartment fails/model state is invalid.
        // I used the 'BadRequestObjectResult' instead of 'ViewResult'.
        Assert.IsType<BadRequestObjectResult>(result);
    }

    // Test for Successful Apartment Update

    [Fact]
    public async Task UpdatePositiveTest()
    {
        var apartmentToUpdate = new Apartment
        {
            Id = 2,
            Adress = "Olso, Center, 5678",
            NumOfRooms = 2,
            Price = 1500,
            Name = "Suoer DUper",
            Square = 450,
            Description = "You are the luciest if you have this house LOL!",
            FirstRentalDate = "15.07.2023",
            ImageUrl1 = "http://fantasy.com/image2.jpg"
        };

        var mockApartmentRepository = new Mock<IApartmentRepo>();
        mockApartmentRepository.Setup(repo => repo.updateApartment(apartmentToUpdate)).ReturnsAsync(true);

        var mockLogger = new Mock<ILogger<ApartmentController>>();
        var mockAccessor = new Mock<IHttpContextAccessor>();
        var apartmentController = new ApartmentController(mockApartmentRepository.Object, mockLogger.Object, mockAccessor.Object);

        var result = await apartmentController.Update(apartmentToUpdate);

        var redirectToActionResult = Assert.IsType<RedirectToActionResult>(result);
        Assert.Equal(nameof(ApartmentController.Table), redirectToActionResult.ActionName);
    }

    // Test for Failed Apartment Update

    [Fact]
    public async Task UpdateNegativeTest()
    {
        var mockApartmentRepository = new Mock<IApartmentRepo>();
        var mockLogger = new Mock<ILogger<ApartmentController>>();
        var mockAccessor = new Mock<IHttpContextAccessor>();
        var apartmentController = new ApartmentController(mockApartmentRepository.Object, mockLogger.Object, mockAccessor.Object);

        // invalid apartment with some missing values.
        var invalidApartment = new Apartment
        {
            Id = '3',

            NumOfRooms = '2',
            Price = 1200,
            Name = "XXX Apartment",

            Description = "Middle of the city.",
            FirstRentalDate = "01.06.2023",
            ImageUrl1 = "http://example.com/image1.jpg"
        };
        apartmentController.ModelState.AddModelError("Error!!", "Invalid model state, there must be a mistake!! LOL");

        var result = await apartmentController.Update(invalidApartment);

        Assert.IsType<BadRequestObjectResult>(result);
    }

    // Test for Successful Apartment Deletion

    [Fact]
    public async Task DeletePositiveTest()
    {

        var apartmentToDelete = new Apartment
        {
            Id = 2,
            Adress = "Olso, Center, 5678",
            NumOfRooms = 2,
            Price = 1500,
            Name = "Suoer DUper",
            Square = 450,
            Description = "You are the luciest if you have this house LOL!",
            FirstRentalDate = "15.07.2023",
            ImageUrl1 = "http://fantasy.com/image2.jpg"
        };

        int apartmentId = apartmentToDelete.Id; // Existing apartment ID, valid
        var mockApartmentRepository = new Mock<IApartmentRepo>();
        mockApartmentRepository.Setup(repo => repo.deleteApartment(apartmentId)).ReturnsAsync(true);

        var mockLogger = new Mock<ILogger<ApartmentController>>();
        var mockAccessor = new Mock<IHttpContextAccessor>();
        var apartmentController = new ApartmentController(mockApartmentRepository.Object, mockLogger.Object, mockAccessor.Object);

        var result = await apartmentController.Delete(new Apartment { Id = apartmentId });

        var redirectToActionResult = Assert.IsType<RedirectToActionResult>(result);
        Assert.Equal(nameof(ApartmentController.Table), redirectToActionResult.ActionName);
    }

    // Test for Deletion of the Non-Existent Apartment

    [Fact]
    public async Task DeleteNegativeTest()
    {
        var mockApartmentRepository = new Mock<IApartmentRepo>();
        var mockLogger = new Mock<ILogger<ApartmentController>>();
        var mockAccessor = new Mock<IHttpContextAccessor>();
        var apartmentController = new ApartmentController(mockApartmentRepository.Object, mockLogger.Object, mockAccessor.Object);

        var apartmentToDelete = new Apartment
        {
            Id = 2,
            Adress = "Olso, Center, 5678",
            NumOfRooms = 2,
            Price = 1500,
            Name = "Suoer DUper",
            Square = 450,
            Description = "You are the luciest if you have this house LOL!",
            FirstRentalDate = "15.07.2023",
            ImageUrl1 = "http://fantasy.com/image2.jpg"
        };

        int nonExistingId = -1; // Non-existing apartment ID , -1 is invalid.
        mockApartmentRepository.Setup(repo => repo.deleteApartment(nonExistingId)).ReturnsAsync(false);

        var result = await apartmentController.Delete(new Apartment { Id = nonExistingId });

        Assert.IsType<BadRequestObjectResult>(result);
    }
}

