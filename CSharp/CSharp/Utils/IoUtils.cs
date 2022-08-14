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

            var path = $"output/{fileName}.csv";
            
            var file = new System.IO.FileInfo(path);
            if (!file.Directory.Exists)
            {
                file.Directory.Create();
            }

            File.WriteAllLines(
                path,
                fileContents
            );
        }
        
        public static List<string> ReadExpected(int count)
        {
            return GetPath("answers", count).ToList();
        }
        
        public static List<PaperSlip> ReadInput(int count)
        {
            return GetPath("input", count).ToList().Select(PaperSlip.Parse).ToList();
        }

        private static List<string> GetPath(string directory, int count)
        {
            var path = Path.Combine(GetFilesDirPath(), $"./{directory}/{count}.txt");
            return File.ReadAllLines(path).ToList();
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