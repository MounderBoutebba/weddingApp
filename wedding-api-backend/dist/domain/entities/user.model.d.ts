import { Phone } from '../../infrastructure/databases/entities';
import { Categorie } from './categories/categorie.model';
import { Customer } from './paiements/customer.model';
export interface User {
    id?: string;
    email: string;
    phone?: Phone;
    connectionType: ConnectionType;
    paiement?: Customer;
    phoneTokenRequestCount: number;
    role: Roles;
    firstname?: string;
    lastname?: string;
    location: {
        address: string;
        lat: number;
        lng: number;
    };
}
export declare enum Roles {
    CLIENT = "client",
    PROVIDER = "provider",
    ADMIN = "admin"
}
export interface Client extends User {
    eventdate: Date;
}
export interface Provider extends User {
    siret: number;
    categorie: Categorie;
    verifiedProvider: boolean;
    securePayment: boolean;
}
export declare enum ConnectionType {
    USER_PASSWORD = "USER_PASSWORD",
    GOOGLE = "GOOGLE",
    FACEBOOK = "FACEBOOK"
}
