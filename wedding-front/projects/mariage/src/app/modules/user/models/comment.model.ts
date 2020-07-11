import { User } from './user.model';

export class Comments {
	id: string;
	updatedAt: Date;
	createdAt: Date;
	totalNotes: number;
	qualiteService: number;
	professionnalisme: number;
	flexibilite: number;
	rapportQualitePrix: number;
	content: string;
	response: CommentResponse;
	client: User;
}

interface CommentResponse {
	id: string;
	updatedAt: Date;
	createdAt: Date;
	content: string;
	user: User;
}
