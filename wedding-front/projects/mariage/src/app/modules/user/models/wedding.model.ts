import { User } from './user.model';
import { Phone } from './phone.model';

export class Wedding {
  id: string;
  date: Date;
  budget: number;
  guestsNumber: number;
  conjoint: User = new User();
  phoneVerified?: boolean;
  phoneToken: string;
  conjointEmail: string;
  conjointFirstname: string;
  conjointLastname: string;
  emailVerified?: boolean;
  conjointPhone ?: Phone = new Phone();
  // @ts-ignore
  location: { address: string, lat: number, lng: number } = {};
}



