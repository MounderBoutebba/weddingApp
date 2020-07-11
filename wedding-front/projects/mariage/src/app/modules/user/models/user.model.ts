import { ConnectionType } from '../../auth/models/connectionType.model';
import { Phone } from './phone.model';
import { Company } from './company.model';

export class User {

  firstname: string;
  lastname: string;
  email: string;
  emailVerified: boolean;
  phoneVerified: boolean;
  phoneToken: string;
  phoneTokenRequestCount: number;
  role?: string;
  id?: string;
  networks?: string[] = [];
  languages?: string[] = [];
  phone?: Phone = new Phone();
  photo?: string;
  connectionType?: ConnectionType;
	status?: string;
	state?: string;
  lastConnexionDate?: Date;
  createdAt?: Date;
  company?: Company;
  // @ts-ignore
  public location: { address?: string, lat?: number, lng?: number } = {};

}
