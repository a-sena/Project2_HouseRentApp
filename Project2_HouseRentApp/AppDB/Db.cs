using HouseRentApp.Models;
using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore;

namespace HouseRentApp.AppDB
{
    public class Db : IdentityDbContext
    {
        public Db(DbContextOptions<Db> options) : base(options)
        {

        }

        public DbSet<Apartment> Apartments { get; set; }

        //public DbSet<Rental> Rentals { get; set; }

       /* protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            base.OnModelCreating(modelBuilder);

            //creating the Rental primaryKey from the foreigenKey of both Apartment and User tables
            modelBuilder.Entity<Rental>(x => x.HasKey(aa => new { aa.ApartmentId, aa.UserId }));

            //creating the many to many relations manualy
            modelBuilder.Entity<Rental>()
                .HasOne(u => u.User)
                .WithMany(a => a.Apartments)
                .HasForeignKey(aa => aa.UserId);

            modelBuilder.Entity<Rental>()
           .HasOne(a => a.Apartment)
           .WithMany(u => u.Users)
           .HasForeignKey(aa => aa.ApartmentId);



        }

        internal Task SaveChangesAsync()
        {
            throw new NotImplementedException();
        }*/
    }
}
