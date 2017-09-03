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



		[HttpGet("[action]/{id}")]
		public Rule GetRule(string id)
        {
			Task.Delay(2000).Wait();

			return new Rule()
			{
				Id = id,
				Expression = new Expression("match_all")
				{
					Children = new[]
					{
						new Expression("eq", "Category", null, "info"),
						new Expression("eq", "Summary", null, "test"),
						new Expression("match_any")
						{
							Children = new[]
							{
								new Expression("eq", "Property", "prop-one", "1"),
								new Expression("eq", "Property", "prop-two", "2")
							}
						},
						new Expression("eq", "Property", "prop-three", "3")
					}
				},
				Actions = new[] 
				{
					new ActionDefinition("email")
					{
						Properties = new[]
						{
							new Property("to", "pj@theswamp.co.uk")
						}
					},
					new ActionDefinition("change-category")
					{
						Properties = new[]
						{
							new Property("category", "Information")
						}
					}
				}
			};
        }

        [HttpGet("[action]")]
        public Expression ExpressionData()
        {
            return new Expression("match_all")
            {
                Children = new[]
                {
                    new Expression("eq", "Category", null, "info"),
                    new Expression("eq", "Summary", null, "test"),
                    new Expression("match_any")
                    {
                        Children = new[]
                        {
                            new Expression("eq", "Property", "prop-one", "1"),
                            new Expression("eq", "Property", "prop-two", "2")
                        }
                    },
                    new Expression("eq", "Property", "prop-three", "3")
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

		public class Rule
		{
			public string Id { get; set; }
			public string Name { get; set; }
			public Expression Expression { get; set; }
			public ActionDefinition[] Actions { get; set; }
		}

		public class ActionDefinition
		{
			public ActionDefinition()
			{
				IsActive = true;
			}


			public ActionDefinition(string type)
				: this()
			{
				Type = type;
			}

			public string Type { get; set; }
			public bool IsActive { get; set; }
			public Property[] Properties { get; set; }
		}


		public class Property
		{
			public Property()
			{
			}

			public Property(string name, string value)
				: this()
			{
				Name = name;
				Value = value;
			}

			public string Category { get; set; }
			public string Name { get; set; }
			public string Value { get; set; }
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
