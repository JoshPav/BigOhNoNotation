import model.PaperSlip;
import solution.DefaultSolutionService;
import solution.ThreeMillionMenSolver;
import timing.FunctionTimingService;
import utils.IoUtils;

import java.time.Instant;
import java.util.ArrayList;
import java.util.List;
import java.util.stream.Collectors;

import static org.assertj.core.api.Assertions.assertThat;

public class ThreeMillionMen {

    private static final List<Integer> INPUT_FILES = List.of(10, 100, 1000, 5000, 10000, 25000, 100000, 1000000, 3000000);
    // The times to run each file before getting an average
    private static final int TIME_TO_RUN = 5;

    // Leave empty to run all
    private static final List<Integer> FILES_TO_RUN = List.of();

    public static void main(String[] args) {

        List<Integer> toRun = FILES_TO_RUN.isEmpty() ? INPUT_FILES : FILES_TO_RUN;
        FunctionTimingService timingService = new FunctionTimingService();

        List<List<Double>> allResults = new ArrayList<>();

        for (Integer count : toRun) {

            System.out.printf("%nSolving for a line of %d people%n", count);

            List<String> expected = IoUtils.readExpected(count);
            List<PaperSlip> input = IoUtils.readInput(count);

            ThreeMillionMenSolver solver = new DefaultSolutionService();

            List<Double> timesTaken = timingService.timeMethod(
                    () -> solver.solve(input),
                    result -> assertThat(result).isEqualTo(expected),
                    TIME_TO_RUN
            );

            // Add the count to the start of the row
            timesTaken.add(0, Double.valueOf(count));

            allResults.add(timesTaken);
        }

        IoUtils.outputToCsv(
                String.valueOf(Instant.now().toEpochMilli()),
                getFileHeaders(TIME_TO_RUN),
                allResults.stream().map(results -> results.stream().map(String::valueOf).collect(Collectors.toList())).collect(Collectors.toList())
        );

    }

    private static List<String> getFileHeaders(int totalRuns) {
        List<String> headers = new ArrayList<>();
        headers.add("Count");
        for (int i = 0; i < totalRuns; i++) {
            headers.add(String.format("Run %d", i + 1));
        }
        return headers;
    }

}
