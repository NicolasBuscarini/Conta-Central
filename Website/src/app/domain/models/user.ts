import { EmailValidator } from "@angular/forms";

export class User {
    id: string;
    email: EmailValidator;
    userName: string;
    password: string;
    cpf: string;
    token?: string;
}