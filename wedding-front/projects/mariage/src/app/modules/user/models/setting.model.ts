export class Setting {
    id: string;
    public periodStartDate: Date;
    public periodEndDate: Date;
    public increaseWeek: number;
    public increaseWeekend: number;
    public autoApplication: boolean;
    private updatedAt: Date;
    private createdAt: Date;

    constructor(periodStartDate: Date, periodEndDate: Date, increaseWeek: number, increaseWeekend: number, autoApplication: boolean) {
        this.periodStartDate = periodStartDate;
        this.periodEndDate = periodEndDate;
        this.increaseWeek = increaseWeek;
        this.increaseWeekend = increaseWeekend;
        this.autoApplication = autoApplication;
    }

}
