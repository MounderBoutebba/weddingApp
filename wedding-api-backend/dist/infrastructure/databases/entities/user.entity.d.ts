import { WeddingEntity } from './wedding.entity';
import { PaiementEntity } from './paiement.entity';
import { CompanyEntity } from './company.entity';
import { ReservationEntity } from './reservation.entity';
import { NotificationsEntity } from './notifications.entity';
import { UserFavoriteEntity } from './user-favorite.entity';
export declare enum ConnectionType {
    USER_PASSWORD = "USER_PASSWORD",
    GOOGLE = "GOOGLE",
    FACEBOOK = "FACEBOOK"
}
export declare enum Roles {
    CLIENT = "client",
    PROVIDER = "provider",
    ADMIN = "admin"
}
export declare enum Status {
    PUBLISHED = "PUBLISHED",
    UNPUBLISHED = "UNPUBLISHED",
    ARCHIVED = "ARCHIVED"
}
export declare enum State {
    COMPLETED = "COMPLETED",
    UNCOMPLETED = "UNCOMPLETED"
}
export declare class Phone {
    country: string;
    phoneNumber: string;
    toString(): string;
}
export declare class UserEntity {
    id: string;
    notifications: NotificationsEntity[];
    location: {
        address: string;
        lat: number;
        lng: number;
    };
    email: string;
    emailVerified?: boolean;
    phoneVerified?: boolean;
    phoneToken: string;
    phoneTokenRequestCount: number;
    firstname?: string;
    deletedAt?: Date | null;
    languages?: string[];
    lastname?: string;
    phone?: Phone;
    status?: Status;
    state?: State;
    lastConnexionDate?: Date;
    connectionType: ConnectionType;
    role: Roles;
    photo: string;
    paiement: PaiementEntity;
    createdAt: Date;
}
export declare class ClientEntity extends UserEntity {
    favorites: UserFavoriteEntity[];
    wedding: Promise<WeddingEntity>;
    reservations: ReservationEntity[];
}
export declare class ProviderEntity extends UserEntity {
    siret?: number;
    company: CompanyEntity;
    verifiedProvider: boolean;
}
