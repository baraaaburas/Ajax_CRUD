using Ajax.Models;
using Ajax.Models.Data;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace Ajax.Controllers
{
    public class EmployeeController : Controller
    {
        private readonly ILogger<HomeController> _logger;
        private readonly AppDbContext _appContext;


        public EmployeeController(ILogger<HomeController> logger, AppDbContext appContext)
        {
            _logger = logger;
            _appContext = appContext;
        }
        public IActionResult Index()
        {
            ViewBag.Departments = _appContext.Departments.ToList();
            ViewBag.Positions = _appContext.Positions.ToList();
            ViewBag.Managers = _appContext.Employees.Where(x => x.ManagerId == null).ToList();
            return View();
        }
        [HttpGet]
        public JsonResult GetEmployees()
        {
            List<Employee> employees = _appContext.Employees.Include(x => x.Department).Include(y => y.Position).Include(y => y.Manager).ToList();
            return Json(employees);
        }


        [HttpPost]
        public JsonResult Insert(Employee employee)
         {
            if (!ModelState.IsValid)
            {
                _appContext.Employees.Add(employee);
                _appContext.SaveChanges();
                return Json("Employee Added.");
            }
            return Json("Failed");
        }
        [HttpGet]
        public JsonResult Edit(int id)
        {
            var employee = _appContext.Employees.Find(id);
            return Json(employee);
           }
        [HttpPut]
        public JsonResult Edit([FromBody]Employee employee) 
        { 
            if(!ModelState.IsValid)
            {
                _appContext.Employees.Update(employee);
                _appContext.SaveChanges();
                return Json("Employee data Updated");

            }
            return Json("Error ");
        }

        [HttpPost]
        public JsonResult Delete(int id)
        {
            var employee = _appContext.Employees.Find(id);
            if(employee != null)
            {
                _appContext.Employees.Remove(employee);
                _appContext.SaveChanges();
                return Json("Employee Deleted");
            }
            return Json("Employee not found");
        }






    }
}
