import { Phone } from './user.entity';
import { ClientEntity } from './user.entity';
export declare class WeddingEntity {
    id: string;
    conjointEmail: string;
    conjointFirstname: string;
    conjointLastname: string;
    conjointPhone?: Phone;
    date: Date;
    budget: number;
    guestsNumber: number;
    phoneToken: string;
    phoneVerified?: boolean;
    emailVerified?: boolean;
    location: {
        address: string;
        lat: number;
        lng: number;
    };
    client: ClientEntity;
}
