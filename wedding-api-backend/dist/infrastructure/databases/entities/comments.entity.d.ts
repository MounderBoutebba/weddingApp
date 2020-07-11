import { CompanyEntity } from './company.entity';
import { ClientEntity } from './user.entity';
import { CommentsResponseEntity } from './commentsResponse.entity';
import { ReservationEntity } from './reservation.entity';
export declare class CommentsEntity {
    id: string;
    private updatedAt;
    private createdAt;
    totalNotes: number;
    qualiteService: number;
    professionnalisme: number;
    flexibilite: number;
    rapportQualitePrix: number;
    content: string;
    response: CommentsResponseEntity;
    company: CompanyEntity;
    client: ClientEntity;
    reservation: ReservationEntity;
}
