using HouseRentApp.Models;

namespace HouseRentApp.AppDB
{
    public class DbInit
    {
        public static void Seed(IApplicationBuilder app)
        {
            using var serviceScope = app.ApplicationServices.CreateScope();
            Db context = serviceScope.ServiceProvider.GetRequiredService<Db>();



            if (!context.Apartments.Any())
            {
                var items = new List<Apartment>
                {
                    new Apartment
                    {
                        Name ="Beautiful central apartment",
                        Price = 1200,
                        Adress = "Gamle Oslo,Oslo,Norway",
                        NumOfRooms = 3,

                        FirstRentalDate = "11.11.2023",
                        Square= 84,
                        //Used source for description: Entire condo hosted by Christopher, Airbnb
                        //Source:https://www.airbnb.com/rooms/48674713?adults=1&category_tag=Tag%3A8536&children=0&enable_m3_private_room=true&infants=0&pets=0&photo_id=1146833692&search_mode=flex_destinations_search&check_in=2024-01-15&check_out=2024-01-21&source_impression_id=p3_1697727377_s%2BnLMlWPIIXYjT20&previous_page_section_name=1000&federated_search_id=a7361505-c3c4-4b5f-a69d-90de1b82b2ae
                        Description ="Brilliant and lavish 4-bedroom penthouse apartment with stunning private rooftop terrace of 78 sqm. The apartment has a good floor plan and a number of good qualities such as.\r\nTwo bathrooms, two balconies, a stake oak parquet floor, two refrigerators, and a small wine cabinet. Pergola of 21 sqm. and jacuzzi on roof terrace.\r\nFrom the roof terrace there are panoramic views over the Oslo fjord and towards Oslo city centre area.\r\n3 bedrooms. Two of them have a double bed and a children's room with a bed.",
                        ImageUrl1 = "/images/1house.jpg",
                        ImageUrl2 = "/images/1room.jpg",
                        ImageUrl3 = "/images/1kitchen.jpg",
                        ImageUrl4 = "/images/1bedroom.jpg"
                    },
                    new Apartment
                    {
                        Name ="Modern Apartment",
                        Price = 1200,
                        Adress = "Søndre Nordstrand, Oslo, Norway",
                        NumOfRooms = 1,

                        FirstRentalDate = "31.10.2023",
                        Square= 74,
                        //Used source for description:Entire condo hosted by Anna,Airbnb
                        //Link : https://www.airbnb.com/rooms/678736544805985877?adults=1&category_tag=Tag%3A8536&children=0&enable_m3_private_room=true&infants=0&pets=0&search_mode=flex_destinations_search&check_in=2023-11-06&check_out=2023-11-11&source_impression_id=p3_1697724988_4Kr%2B4%2BOicYWwMf36&previous_page_section_name=1000
                        Description ="Spacious apartment with high comfort..\r\nLovely view from penthouse with west-facing terrace.\r\n\r\nProximity to public transport to Oslo city centre and guest parking outside the building. There is a bus to Ekebergsletta and Tusenfryd is only a 15 min drive away and a short way to Oslofjord's beaches and more.",
                        ImageUrl1 = "/images/5house.jpg",
                        ImageUrl2 = "/images/2room.jpg",
                        ImageUrl3 = "/images/2kitchen.jpg",
                        ImageUrl4 = "/images/2bedroom.jpg"
                    },
                    new Apartment
                    {
                        Name ="Stylish Apartment",
                        Price = 1500,
                        Adress = "Stabekk, Oslo, Norway",
                        NumOfRooms = 1,

                        FirstRentalDate = "11.12.2023",
                        Square= 24,
                        //Used source for description: Entire condo hosted by Morten, Airbnb
                        //Link: https://www.airbnb.com/rooms/899282881983430496?adults=1&category_tag=Tag%3A8536&children=0&enable_m3_private_room=true&infants=0&pets=0&photo_id=1667326550&search_mode=flex_destinations_search&check_in=2023-11-12&check_out=2023-11-17&source_impression_id=p3_1697727377_Kqs5Z5rfL1XYZ3PI&previous_page_section_name=1000&federated_search_id=a7361505-c3c4-4b5f-a69d-90de1b82b2ae
                        Description ="Unique home in the coziest street of Oslo. Child-friendly and inclusive. Short way to the centre, cafes and restaurants. Lovely secluded outdoor area with barbecue and lounge atmosphere. When to enjoy Oslo this is a perfect starting point",
                        ImageUrl1 = "/images/6house.jpg",
                        ImageUrl2 = "/images/3room.jpg",
                        ImageUrl3 = "/images/3kitchen.jpg",
                        ImageUrl4 = "/images/3bedroom.jpg"
                    },
                    new Apartment
                    {
                        Name ="Best Apartment in Oslo",
                        Price = 1200,
                        Adress = "Ullern, Oslo,Norway",

                        Square= 24,
                        NumOfRooms = 1,
                        FirstRentalDate = "01.12.2023",
                        //Used source for description: Entire rental unit hosted by Jon-Miguel, Airbnb
                        //Link: https://www.airbnb.com/rooms/17553046?adults=1&category_tag=Tag%3A8536&children=0&enable_m3_private_room=true&infants=0&pets=0&photo_id=287698843&search_mode=flex_destinations_search&check_in=2023-11-03&check_out=2023-11-08&source_impression_id=p3_1697727736_7a5iQQajaYB1D6XA&previous_page_section_name=1000
                        Description ="Located on the pier promenade boardwalk of one of Oslo's best and most upscale areas, this is the BEST place to be spending your visit in Oslo!\r\n\r\nRestaurants, bars, shopping, beaches, museums etc is located right outside the apartment building and most things are only a short walk away. There is however also a bus stop around the corner, about a 2 min walk, that will connect you to anywhere in the city.\r\n\r\nThe apartment has both washer/dryer and a balcony with a fantastic ocean view!!",
                        ImageUrl1 = "/images/7house.jpg",
                        ImageUrl2 = "/images/4room.jpg",
                        ImageUrl3 = "/images/2kitchen.jpg",
                        ImageUrl4 = "/images/4bedroom.jpg"

                    }

                };
                context.AddRange(items);
                context.SaveChanges();
            }
        }
    }
}


