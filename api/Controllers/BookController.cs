using System;
using System.Collections.Generic;
using System.Linq;
using System.Security.Cryptography.X509Certificates;
using System.Threading.Tasks;
using api.Models;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using static System.Net.WebRequestMethods;

namespace api.Controllers
{
    [Route("api/book")]
    [ApiController]
    public class BookController : ControllerBase
    {
        private readonly BookContext _context;

        public BookController(BookContext context)
        {
            _context = context;
        }

        [HttpGet("get")]
        public List<AddressBook> GetAddresses()
        {
            return _context.AddressBook.ToList();
        }
        [HttpGet("get/{id}")]
        public AddressBook GetSingleAddress(int id)
        {
            return _context.AddressBook.FirstOrDefault(x=>x.Id==id);
        }

        [HttpPost]
        public void add([FromBody]AddressBook address)
        {
             _context.AddressBook.Add(address);
            _context.SaveChanges();
        }
        [HttpPut("edit")]
        public void edit([FromBody]AddressBook address)
        {
            _context.Entry(address).State = EntityState.Modified;
            _context.SaveChanges();
        }

        [HttpPost("multiple/upload")]
        public void Upload([FromBody]List<AddressBook> addresses)
        {
            for (int i = 0; i < addresses.Count; i++)
            {
                _context.AddressBook.Add(addresses[i]);
                _context.SaveChanges();
            }
        }

        [HttpDelete("{id}")]
        public async Task<ActionResult<AddressBook>> delete(int id)
        {
            var addressBook = await _context.AddressBook.FindAsync(id);
            if (addressBook == null)
            {
                return NotFound();
            }

            _context.AddressBook.Remove(addressBook);
            await _context.SaveChangesAsync();

            return addressBook;
        }
    }
}
