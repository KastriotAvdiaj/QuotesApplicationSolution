using Microsoft.Extensions.Options;
using QuotesApplication.Configurations;

namespace QuotesApplication.Services
{
    public class OpenAIService : IOpenAiService
    {
        private readonly OpenAI _openAiConfig;
        public OpenAIService(IOptionsMonitor<OpenAI> optionsMonitor) {
            _openAiConfig = optionsMonitor.CurrentValue;
        }

        public async Task<string> CompleteSentence(string text)
        {
            //api instance 
            var api = new OpenAI_API.OpenAIAPI(_openAiConfig.Key);
            var result = await api.Completions.GetCompletion(text);
            return result;
        }
    }
}
