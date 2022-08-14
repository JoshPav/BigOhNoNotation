using System;
using System.Collections.Generic;
using System.Threading;
using CSharp.Model;

namespace CSharp.Solution
{
    public class DefaultSolutionService : IThreeMillionMenSolver
    {
        public List<string> Solve(IEnumerable<PaperSlip> input)
        {
            Thread.Sleep(new Random().Next(100, 10000));
            throw new System.NotImplementedException();
        }
    }
}