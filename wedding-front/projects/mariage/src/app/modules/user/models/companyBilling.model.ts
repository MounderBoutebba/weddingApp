export enum CondRefundDepositType {
    SYSTEMATIC_REFUND = 'remboursement systematique',
    CONDITIONAL_REFUND = 'remboursement conditionnel'
  }

export enum CondRefundDepositCause {
    GRIEVOUS_FAMILY_EVENT = 'Evénement familial grave',
    EVENT_PREVENTING_UNFOLDING = 'Tout évenement empechant le déroulement du mariage',
    PERSONAL_JUDGMENT = 'Selon mon jugement personnel de la situation'
  }

export class CompanyBilling {
  id: string;
  public paymentSecure: boolean;
  public depositPayment: boolean;
  public depositPercentage: number;
  public condRefundDepositClient: CondRefundDepositType;
  public condRefundDepositClientCause: CondRefundDepositCause;
  public percentageRefundDepositClient: number;
  public condRefundDepositCompany: CondRefundDepositType;
  public condRefundDepositCompanyCause: CondRefundDepositCause;
  public percentageRefundDepositCompany: number;
  private updatedAt: Date;
  private createdAt: Date;

  constructor(paymentSecure: boolean, depositPayment: boolean, depositPercentage: number,
              condRefundDepositClient: CondRefundDepositType, condRefundDepositClientCause: CondRefundDepositCause,
              percentageRefundDepositClient: number, condRefundDepositCompany: CondRefundDepositType,
              condRefundDepositCompanyCause: CondRefundDepositCause, percentageRefundDepositCompany: number) {

                this.paymentSecure = paymentSecure;
                this.depositPayment = depositPayment;
                this.depositPercentage = depositPercentage;
                this.condRefundDepositClient = condRefundDepositClient;
                this.condRefundDepositClientCause = condRefundDepositClientCause;
                this.percentageRefundDepositClient = percentageRefundDepositClient;
                this.condRefundDepositCompany = condRefundDepositCompany;
                this.condRefundDepositCompanyCause = condRefundDepositCompanyCause;
                this.percentageRefundDepositCompany = percentageRefundDepositCompany;
              }

}
