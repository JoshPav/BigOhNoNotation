using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using CSharp.Model;

namespace CSharp.utils
{
    public static class IoUtils
    {
        public static void OutputToCsv(string fileName, IEnumerable<string> headers, IEnumerable<IEnumerable<string>> rows)
        {

            List<string> fileContents = new List<string>();
            fileContents.Add(String.Join(",", headers));
            fileContents.AddRange(rows.Select(row => String.Join(",", row)));
            
            File.WriteAllLines(
                $"output/{fileName}.csv",
                fileContents
            );
        }
        
        public static IEnumerable<string> ReadExpected(int count)
        {
            return GetPath("answers", count).ToList();
        }
        
        public static IEnumerable<PaperSlip> ReadInput(int count)
        {
            return GetPath("input", count).ToList().Select(PaperSlip.Parse).ToList();
        }

        private static IEnumerable<string> GetPath(string directory, int count)
        {
            var path = Path.Combine(GetFilesDirPath(), $"./{directory}/{count}.txt");
            return File.ReadAllLines(path);
        }

        private static string GetFilesDirPath()
        {
            var dirInfo = Directory.GetParent(".");

            while (dirInfo.Name != "three_million_men")
            {
                dirInfo = dirInfo.Parent;
            }

            return dirInfo.GetDirectories().First(dir => dir.Name.Contains("files")).FullName;
        }
    }
}