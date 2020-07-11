export declare class IbanDto {
    type: 'ach_credit_transfer' | 'ach_debit' | 'alipay' | 'bancontact' | 'card' | 'card_present' | 'eps' | 'giropay' | 'ideal' | 'multibanco' | 'p24' | 'sepa_debit' | 'sofort' | 'three_d_secure' | 'wechat';
    iban: string;
    currency: string;
    name: string;
}
