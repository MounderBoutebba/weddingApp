export enum FeeType {
	SINGLE_FEE = 'Frais unique',
	UNIT_FEE = 'Frais par unité',
	GUEST_FEE = 'Frais par invité'
}

export class Option {
    id: string;
    public name: string;
    public description: string;
    public optionRate: number;
    public categories: any;
    public feeType: FeeType;
    private updatedAt: Date;
    private createdAt: Date;

    constructor(name: string, description: string, optionRate: number, feeType: FeeType) {
        this.name = name;
        this.description = description;
        this.optionRate = optionRate;
        this.feeType = feeType;
    }
}
