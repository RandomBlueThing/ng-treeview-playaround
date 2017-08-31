using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;

namespace NgRule.Controllers
{
    [Route("api/[controller]")]
    public class SampleDataController : Controller
    {
        private static string[] Summaries = new[]
        {
            "Freezing", "Bracing", "Chilly", "Cool", "Mild", "Warm", "Balmy", "Hot", "Sweltering", "Scorching"
        };

        [HttpGet("[action]")]
        public IEnumerable<WeatherForecast> WeatherForecasts()
        {
            var rng = new Random();
            return Enumerable.Range(1, 5).Select(index => new WeatherForecast
            {
                DateFormatted = DateTime.Now.AddDays(index).ToString("d"),
                TemperatureC = rng.Next(-20, 55),
                Summary = Summaries[rng.Next(Summaries.Length)]
            });
        }

        [HttpGet("[action]")]
        public IEnumerable<Menu> MenuData()
        {
            return new[] {
                new Menu("one")
                {
                    Children = new List<Menu>()
                    {
                        new Menu("one.01"),
                        new Menu("one.02"),
                    }
                },
                new Menu("two")
                {
                    Children = new List<Menu>()
                    {
                        new Menu("two.01"),
                        new Menu("two.02"),
                    }
                }
            };
        }

        public class Menu
        {
            public Menu()
            {
            }


            public Menu(string title)
            {
                Title = title;
            }


            public string Title { get; set; }
            public List<Menu> Children { get; set; }
        }

        public class WeatherForecast
        {
            public string DateFormatted { get; set; }
            public int TemperatureC { get; set; }
            public string Summary { get; set; }

            public int TemperatureF
            {
                get
                {
                    return 32 + (int)(TemperatureC / 0.5556);
                }
            }
        }
    }
}
