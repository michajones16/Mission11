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

        [HttpGet("AllBooks")]
        public IActionResult GetBooks(int pageSize = 5, int pageNum = 1, string sortOrder = "", [FromQuery] List<string>? BookTypes = null)
        {
            var query = _bookContext.Books.AsQueryable();

            if (BookTypes != null && BookTypes.Any())
            {
                query = query.Where(b => BookTypes.Contains(b.Category));
            }

            if (sortOrder == "asc")
            {
                query = query.OrderBy(b => b.Title);
            }
            else if (sortOrder == "desc")
            {
                query = query.OrderByDescending(b => b.Title);
            }

            var numBooks = query.Count();

            var books = query
                .Skip((pageNum - 1) * pageSize)
                .Take(pageSize)
                .ToList();

            var response = new
            {
                Books = books,
                NumBooks = numBooks
            };

            return Ok(response);
        }

        [HttpGet("GetBookTypes")]
        public IActionResult GetBookTypes()
        {
            var bookTypes = _bookContext.Books
                .Select(b => b.Category)
                .Distinct()
                .ToList();

            return Ok(bookTypes);
        }
    }
}
