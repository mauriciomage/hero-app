import { User } from './user.model';
import { Stadium } from './stadium-model';

export interface Agenda {
    id?: string;
    user?: User;
    stadium?: Stadium;
    hour?: string;
    day?: string;
    status?: string;
    price?: string;
    created_at?: string;
}
