export interface OptionDivers {
    name: string;
    description: string;
    optionRate: number;
    examplaire?: number;
    feeType: FeeType;
    checked: boolean;
}
export declare enum FeeType {
    SINGLE_FEE = "Frais unique",
    UNIT_FEE = "Frais par unit\u00E9",
    GUEST_FEE = "Frais par invit\u00E9"
}
