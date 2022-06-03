import { User } from "./user";

export class SsoDTO{
    access_token: string;
    expiration: string;
    user: User 
}