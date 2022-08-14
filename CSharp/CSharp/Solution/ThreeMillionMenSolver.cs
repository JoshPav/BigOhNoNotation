using System;
using System.Collections.Generic;
using CSharp.Model;

namespace CSharp.Solution
{
    public interface IThreeMillionMenSolver
    {
        
        List<string> Solve(IEnumerable<PaperSlip> input);

    }
}