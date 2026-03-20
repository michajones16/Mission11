using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Mission11.API.Data;

namespace Mission11.API.Controllers
{
    [Route("[controller]")]
    [ApiController]
    public class BookController : ControllerBase
    {
        private BookstoreDbContext _bookContext;

        public BookController(BookstoreDbContext temp) => _bookContext = temp;

        [HttpGet]
        public IActionResult Get(int pageSize = 5, int pageNum = 1, string sortOrder = "")
        {
            var query = _bookContext.Books.AsQueryable();

            if (sortOrder == "asc")
            {
                query = query.OrderBy(b => b.Title);
            }
            else if (sortOrder == "desc")
            {
                query = query.OrderByDescending(b => b.Title);
            }

            var books = query
                .Skip((pageNum - 1) * pageSize)
                .Take(pageSize)
                .ToList();

            var numBooks = _bookContext.Books.Count();

            var response = new
            {
                Books = books,
                NumBooks = numBooks
            };

            return Ok(response);
        }
    }
}
