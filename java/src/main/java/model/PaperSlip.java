package model;

public class PaperSlip {

    private final String person;
    private final String neighbor;

    public PaperSlip(String person, String neighbor) {
        this.person = person;
        this.neighbor = neighbor;
    }

    public static PaperSlip parse(String s) {
        String[] split = s.split(",");
        return new PaperSlip(split[0], split[1]);
    }

    public String getPerson() {
        return person;
    }

    public String getNeighbor() {
        return neighbor;
    }
}
