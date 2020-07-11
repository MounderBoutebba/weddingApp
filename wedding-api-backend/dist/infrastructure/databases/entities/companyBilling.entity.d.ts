import { CompanyEntity } from './company.entity';
export declare enum CondRefundDepositType {
    SYSTEMATIC_REFUND = "remboursement systematique",
    CONDITIONAL_REFUND = "remboursement conditionnel"
}
export declare enum CondRefundDepositCause {
    GRIEVOUS_FAMILY_EVENT = "Ev\u00E9nement familial grave",
    EVENT_PREVENTING_UNFOLDING = "Tout \u00E9venement empechant le d\u00E9roulement du mariage",
    PERSONAL_JUDGMENT = "Selon mon jugement personnel de la situation"
}
export declare class CompanyBillingEntity {
    id: string;
    paymentSecure: boolean;
    depositPayment: boolean;
    depositPercentage: number;
    condRefundDepositClient: CondRefundDepositType;
    condRefundDepositClientCause: CondRefundDepositCause;
    percentageRefundDepositClient: number;
    condRefundDepositCompany: CondRefundDepositType;
    condRefundDepositCompanyCause: CondRefundDepositCause;
    percentageRefundDepositCompany: number;
    updatedAt: Date;
    createdAt: Date;
    company: Promise<CompanyEntity>;
}
