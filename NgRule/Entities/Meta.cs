using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace NgRule.Entities
{
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

    public class MetaData
    {
        public ActionMetaData[] ActionMetaData { get; set; }
        public ExpressionMetaData[] ExpressionMetaData { get; set; }
    }

    public class ActionMetaData
    {
        public string Type { get; set; }
        public MetaDataCapture[] Properties { get; set; }
    }

    // This looks almost the same as MetaDataCapture....
    public class ExpressionMetaData
    {
        public string Operand { get; set; }
        public string DataType { get; set; }
        public Option[] Options { get; set; }
    }


    public class MetaDataCapture
    {
        public string Name { get; set; }
        public bool IsRequired { get; set; }
        public string DataType { get; set; }
        public Option[] Options { get; set; }
    }
}
