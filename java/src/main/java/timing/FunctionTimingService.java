package timing;

import org.apache.commons.lang3.time.StopWatch;

import java.util.ArrayList;
import java.util.List;
import java.util.concurrent.TimeUnit;
import java.util.function.Consumer;
import java.util.function.Supplier;
import java.util.stream.Collectors;

public class FunctionTimingService {

    public <T> List<Long> timeMethod(Supplier<T> methodToTime, Consumer<T> postRun, int timesToRun) {

        List<Long> timings = new ArrayList<>();

        for (int i = 0; i < timesToRun; i++) {

            StopWatch stopWatch = new StopWatch();

            stopWatch.start();

            T result = methodToTime.get();

            stopWatch.stop();

            long timeTakenMicro = stopWatch.getTime(TimeUnit.MICROSECONDS);
            System.out.printf("Time taken: %s%n", getTimeTaken(timeTakenMicro));

            postRun.accept(result);

            timings.add(timeTakenMicro);
        }

        long avgTimeTakenMicro = timings.stream().reduce(Long::sum).map(total -> total / timings.size()).orElse(0L);

        System.out.printf("Average time taken: %s%n%n", getTimeTaken(avgTimeTakenMicro));

        // Convert nanos back to MS
        return timings.stream().map(micro -> micro / 1000).collect(Collectors.toList());
    }

    private static String getTimeTaken(long microSecondsTaken) {

        List<String> output = new ArrayList<>();

        int i = 0;

        UnitCalculator[] calculators = UnitCalculator.values();

        while (output.size() < 2 && i < calculators.length) {
            var unitString = calculators[i].getAmountWithSuffix(microSecondsTaken);
            unitString.ifPresent(output::add);
            i++;
        }

        return String.join(" ", output);
    }

}
