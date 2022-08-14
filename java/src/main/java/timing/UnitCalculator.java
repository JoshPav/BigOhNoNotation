package timing;

import java.util.Optional;
import java.util.concurrent.TimeUnit;
import java.util.function.Function;
import java.util.function.UnaryOperator;

public enum UnitCalculator {

    MINUTES(TimeUnit.MINUTES, "m", mins -> mins % 60),
    SECONDS(TimeUnit.SECONDS, "s", seconds -> seconds % 60),
    MILLISECONDS(TimeUnit.MILLISECONDS, "ms", milli -> milli % 1000),
    MICROSECONDS(TimeUnit.MICROSECONDS, "µs", micro -> micro % 1000);

    private final TimeUnit unit;
    private final String suffix;
    private final Function<Long, Long> reminderCalc;


    UnitCalculator(TimeUnit unit, String suffix, UnaryOperator<Long> reminderCalc) {
        this.unit = unit;
        this.suffix = suffix;
        this.reminderCalc = reminderCalc;
    }

    public Optional<String> getAmountWithSuffix(long microSecondsTaken) {
        return getAmount(microSecondsTaken).map(amount -> String.format("%d%s", amount, suffix));
    }

    public Optional<Long> getAmount(long nanoSecondsTaken) {

        long amount = reminderCalc.apply(unit.convert(nanoSecondsTaken, TimeUnit.MICROSECONDS));
        return amount != 0 ? Optional.of(amount) : Optional.empty();
    }

}
