namespace CSharp.Model
{
    public class PaperSlip
    {
        
        public string Person { get; }
        public string Neighbour { get; }
        
        public PaperSlip(string Person, string Neighbour)
        {
            this.Person = Person;
            this.Neighbour = Neighbour;
        }

        public static PaperSlip Parse(string line)
        {
            string[] split = line.Split(',');
            return new PaperSlip(split[0], split[1]);
        }
    }
}