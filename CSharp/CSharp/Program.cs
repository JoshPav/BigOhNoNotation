using System;
using System.Collections.Generic;
using System.Linq;
using CSharp.Solution;
using CSharp.Timing;
using CSharp.utils;
using Xunit;

namespace CSharp
{
    internal class Program
    {
        private static readonly int[] INPUT_FILES = {10, 100, 1000, 5000, 10000, 25000, 100000, 1000000, 3000000};
        // The times to run each file before getting an average
        private static readonly int TIMES_TO_RUN = 5;

        // Leave empty to run all
        private static readonly int[] FILES_TO_RUN = {};
        
        public static void Main(string[] args)
        {
            IEnumerable<int> toRun = FILES_TO_RUN.Any() ? FILES_TO_RUN : INPUT_FILES;
            
            var allResults = new List<List<long>>();

            FunctionTimingService timingService = new FunctionTimingService();
            
            foreach (var count in toRun)
            {
                Console.WriteLine($"\nSolving for a line of {count} people\n");

                var expected= IoUtils.ReadExpected(10);
                var input = IoUtils.ReadInput(10);

                IThreeMillionMenSolver solver = new DefaultSolutionService();
                
                var timesTaken = timingService.TimeMethod(
                        () => solver.Solve(input),
                        result => Assert.Equal(expected, result),
                        TIMES_TO_RUN
                    );
                    
                // Add the count to the start of the row
                timesTaken.Insert(0, Convert.ToInt64(count));

                allResults.Add(timesTaken);
                
            }
            
            IoUtils.OutputToCsv(
                new DateTimeOffset(DateTime.UtcNow).ToUnixTimeSeconds().ToString(), 
                new List<string>(),
                allResults.Select(row => row.Select(time => time.ToString()))
            );

        }

        private static List<string> GetHeaders(int totalRuns)
        {
            List<string> headers = new List<string>();
            headers.Add("Count");
            for (int i = 0; i < totalRuns; i++) {
                headers.Add(String.Format($"Run {i + 1}"));
            }
            return headers;
        }
    }
}