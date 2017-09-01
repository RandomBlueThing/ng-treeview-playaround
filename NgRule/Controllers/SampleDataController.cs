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
        public Expression ExpressionData()
        {
            return new Expression("match_all")
            {
                Children = new[]
                {
                    new Expression("eq", "category", null, "info"),
                    new Expression("eq", "summary", null, "test"),
                    new Expression("match_any")
                    {
                        Children = new[]
                        {
                            new Expression("eq", "property", "prop-one", "1"),
                            new Expression("eq", "property", "prop-two", "2")
                        }
                    },
                    new Expression("eq", "property", "prop-three", "3")
                }
            };
        }

        [HttpPost("[action]")]
        public void ExpressionData([FromBody] Expression expression)
        {

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
                        new Menu("one.02")
                        {
                            Children = new List<Menu>()
                            {
                                new Menu("one.02.01")
                                {
                                    Children = new List<Menu>()
                                    {
                                        new Menu("one.02.01.01")
                                    }
                                },
                                new Menu("one.02.02"),
                            }
                        }
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

        public class Expression
        {
            public Expression()
            {
            }

            public Expression(string op)
                : this(op, null, null, null)
            {
            }

            public Expression(string op, string operand, string arg, string value)
                : this()
            {
                Operator = op;
                Operand = operand;
                Argument = arg;
                Value = value;
                IsActive = true;
            }

            public string Operator { get; set; }
            public string Operand { get; set; }
            public string Argument { get; set; }
            public string Value { get; set; }
            public bool IsActive { get; set; }

            public Expression[] Children { get; set; }
        }
    }
}
