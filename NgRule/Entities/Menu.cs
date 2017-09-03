using System.Collections.Generic;

namespace NgRule.Entities
{
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

}
