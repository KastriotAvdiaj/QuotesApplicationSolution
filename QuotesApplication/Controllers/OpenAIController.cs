using Microsoft.AspNetCore.Mvc;
using QuotesApplication.Services;

namespace QuotesApplication.Controllers
{
    public class OpenAIController : Controller
    {

        private readonly IOpenAiService _openAiService;

        public OpenAIController(IOpenAiService openAiService)
        {
            _openAiService = openAiService;
        }
        public IActionResult Index()
        {
            return View();
        }

        [HttpPost]
        [Route("CompleteSentence")]
        public async Task<IActionResult> CompleteSentence(string text)
        {
            var result = await _openAiService.CompleteSentence(text);
            return Ok(result);
        }
    }
}
