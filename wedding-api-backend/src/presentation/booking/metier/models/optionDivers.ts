export interface OptionDivers {
    name: string,
    description: string,
    optionRate: number,
    examplaire?: number,
    feeType: FeeType,
    checked: boolean,
}
export enum FeeType {
    SINGLE_FEE = 'Frais unique',
    UNIT_FEE = 'Frais par unité',
    GUEST_FEE = 'Frais par invité'
}