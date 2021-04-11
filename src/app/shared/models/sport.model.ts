import { User } from './user.model';

export interface Agenda {
    id?: string;
    user?: User;
    name?: string;
    description?: string;
    created_at?: string;
}
