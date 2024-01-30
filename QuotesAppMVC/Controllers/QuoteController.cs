using Microsoft.AspNetCore.Mvc;
using Newtonsoft.Json;
using QuotesAppMVC.Models;

namespace QuotesAppMVC.Controllers
{
    public class QuoteController : Controller
    {
        public async Task<ActionResult> Index()
        {
            List<Quote> quotes = new List<Quote>();

            using (HttpClient client = new HttpClient())
            using (var response = await client.GetAsync("https://localhost:7099/api/Quotes"))
            {
                string result = await response.Content.ReadAsStringAsync();
                quotes = JsonConvert.DeserializeObject<List<Quote>>(result);
            }
            return View(quotes);
        }
    }
}
