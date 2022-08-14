using System;
using System.Collections.Generic;
using System.Linq;

namespace CSharp.Timing
{
    public class FunctionTimingService
    {
        
        public List<double> TimeMethod<T>(Func<T> methodToTime, Action<T> postRun, int timesToRun) {

            List<long> ticksTaken = new List<long>();

            for (int i = 0; i < timesToRun; i++) {

                var watch = new System.Diagnostics.Stopwatch();
                
                watch.Start();

                T result = methodToTime.Invoke();

                watch.Stop();

                var elapsed = watch.Elapsed;
                
                Console.WriteLine($"Time taken: {GetFormattedTime(elapsed)}");
                
                postRun.Invoke(result);

                ticksTaken.Add(elapsed.Ticks);
            }

            long avgTicksTaken = ticksTaken.Aggregate((l, l1) => l + l1) / ticksTaken.Count;
            
            Console.WriteLine($"Average time taken: {GetFormattedTime(new TimeSpan(avgTicksTaken))}\n\n");

            return ticksTaken.Select(ticks => new TimeSpan(ticks).TotalMilliseconds).ToList() ;
        }

        private static string GetFormattedTime(TimeSpan timeSpan)
        {
            return timeSpan.ToString(@"mm\m\ ss\s\ fff\m\s");
        }
        
    }
}