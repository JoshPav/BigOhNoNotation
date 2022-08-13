package utils;

import model.PaperSlip;

import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.StandardOpenOption;
import java.util.List;
import java.util.stream.Collectors;
import java.util.stream.Stream;

public final class IoUtils {

    private IoUtils() { }

    public static void outputToCsv(String fileName, List<String> headers, List<List<String>> rows) {

        List<String> lines = Stream.concat(
                Stream.of(String.join(",", headers)),
                rows.stream().map(row -> String.join(",", row))
        ).collect(Collectors.toList());
        try {
            Path outputPath = Path.of("output", fileName + ".csv");
            if (!Files.exists(outputPath.getParent())) {
                Files.createDirectories(outputPath.getParent());
            }
            Files.write(outputPath, lines);
        } catch (IOException e) {
            throw new RuntimeException("Error writing to file", e);
        }
    }

    public static List<String> readExpected(int number) {
        return readFile("answers", String.valueOf(number));
    }

    public static List<PaperSlip> readInput(int number) {
        return readFile("input", String.valueOf(number)).stream().map(PaperSlip::parse).collect(Collectors.toList());
    }

    private static List<String> readFile(String dir, String fileName) {
        try {
            return Files.readAllLines(Path.of("..", "files", dir, fileName + ".txt"));
        } catch (IOException e) {
            throw new RuntimeException("Error reading files", e);
        }
    }

}
