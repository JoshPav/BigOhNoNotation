package timing;

import org.apache.commons.lang3.time.StopWatch;

import java.util.ArrayList;
import java.util.List;
import java.util.concurrent.TimeUnit;
import java.util.function.Consumer;
import java.util.function.Supplier;

public class FunctionTimingService {

    public <T> List<Long> timeMethod(Supplier<T> methodToTime, Consumer<T> postRun, int timesToRun) {

        List<Long> timings = new ArrayList<>();

        for (int i = 0; i < timesToRun; i++) {

            StopWatch stopWatch = new StopWatch();

            stopWatch.start();

            T result = methodToTime.get();

            stopWatch.stop();

            postRun.accept(result);

            timings.add(stopWatch.getTime(TimeUnit.MILLISECONDS));

        }

        return timings;

    }

}
