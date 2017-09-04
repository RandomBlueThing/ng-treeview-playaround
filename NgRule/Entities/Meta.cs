using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace NgRule.Entities
{
    public class Meta
    {
        public string Type { get; set; }
        public string Source { get; set; }
        public string PropertyName { get; set; }
        public bool IsRequired { get; set; }
        public string DataType { get; set; }
        public Option[] Options { get; set; }
    }

    public class Option
    {
        public Option()
        {
        }

        public Option(string display, string value)
            : this()
        {
            Display = display;
            Value = value;
        }

        public string Display { get; set; }
        public string Value { get; set; }
    }
}
