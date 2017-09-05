using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using NgRule.Entities;

namespace NgRule.Controllers
{
	[Route("api/[controller]")]
    public class SampleDataController : Controller
    {
		[HttpGet("[action]/{id}")]
		public Rule GetRule(string id)
        {
			//Task.Delay(1000).Wait();

			return new Rule()
			{
				Id = id,
				Name = $"Some rule name: {DateTime.Now}",
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
							new Property("to", "pj@theswamp.co.uk"),
                            new Property("cc", ""),
                            new Property("bcc", ""),
                        }
                    },
					new ActionDefinition("change-category")
					{
						Properties = new[]
						{
							new Property("category", "inf")
						}
					}
				}
			};
        }


        [HttpGet("[action]")]
        public MetaData GetMetaData()
        {
            return new MetaData
            {
                ActionMetaData = new[]
                {
                    new ActionMetaData()
                    {
                        Type = "email",
                        Properties = new[]
                        {
                            new MetaDataCapture()
                            {
                                Name = "to",
                                IsRequired = true,
                                Options = new[]
                                {
                                    new Option(null, ".*@.*")
                                }
                            },
                            new MetaDataCapture()
                            {
                                Name = "cc",
                                IsRequired = false,
                                Options = new[]
                                {
                                    new Option(null, ".*@.*")
                                }
                            },
                            new MetaDataCapture()
                            {
                                Name = "bcc",
                                IsRequired = false,
                                Options = new[]
                                {
                                    new Option(null, ".*@.*")
                                }
                            },
                        }
                    },

                    new ActionMetaData()
                    {
                        Type = "change-category",
                        Properties = new[]
                        {
                            new MetaDataCapture()
                            {
                                Name = "category",
                                IsRequired = true,
                                DataType = "select",
                                Options = new[]
                                {
                                    new Option("Information", "inf"),
                                    new Option("Error", "err"),
                                    new Option("Debug", "dbg")
                                }
                            }
                        }
                    },

                    new ActionMetaData()
                    {
                        Type = "add-property",
                        Properties = new[]
                        {
                            new MetaDataCapture()
                            {
                                Name = "category",
                                IsRequired = false,
                            },
                            new MetaDataCapture()
                            {
                                Name = "name",
                                IsRequired = true,
                            },
                            new MetaDataCapture()
                            {
                                Name = "value",
                                IsRequired = true,
                            }
                        }
                    }

                },
                ExpressionMetaData = new[]
                {
                    new ExpressionMetaData()
                    {
                        Operand = "Category",
                        DataType = "select",
                        Options = new[]
                        {
                            new Option("Information", "information"),
                            new Option("Error", "error"),
                            new Option("Debug", "debug")
                        }
                    },
                    new ExpressionMetaData()
                    {
                        Operand = "Timestamp",
                        DataType = "datetime"
                    }
                }
            };
        }
    }
}
