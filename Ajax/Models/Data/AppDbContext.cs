using Microsoft.EntityFrameworkCore;
using System.Linq;

namespace Ajax.Models.Data
{
    public class AppDbContext : DbContext
    {
        public AppDbContext(DbContextOptions<AppDbContext>options):base(options) { }
        public DbSet<Employee> Employees { get; set; }
        public DbSet<Department> Departments { get; set; }
        public DbSet<Position> Positions { get; set; }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.Entity<Department>().HasData(
                   new Department()
                   {
                       Id = 1,
                       Name = "IT",

                   },
                   new Department()
                   {
                       Id = 2,
                       Name = "HR",

                   },
                    new Department()
                    {
                        Id = 3,
                        Name = "Fainance",

                    }
               ); ;
            modelBuilder.Entity<Position>().HasData(
                   new Position()
                   {
                       Id = 1,
                       Name = "QA Tester",

                   },
                   new Department()
                   {
                       Id = 2,
                       Name = "Accountnat",

                   },
                    new Department()
                    {
                        Id = 3,
                        Name = "Senior HR",

                    }
               ); ;
        }

    }
}
