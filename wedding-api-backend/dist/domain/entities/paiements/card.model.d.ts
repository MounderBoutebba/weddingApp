export interface Card {
    exp_month: number;
    exp_year: number;
    number: string;
    cvc?: string;
    name?: string;
}
