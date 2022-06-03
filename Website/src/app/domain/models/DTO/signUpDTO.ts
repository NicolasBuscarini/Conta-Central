import { EmailValidator } from "@angular/forms";

export class SignUpDTO {

   nomeCompleto: string;
   email: EmailValidator;
   userName: string;
   password: string;
   passwordConfirm: string;
   cpf: string;
   dataNascimento: Date;
   cep: number;
   endereco: string;
   endereco2: string;
   phoneNumber: number;

   constructor(nomeCompleto: string, email: EmailValidator, userName: string, password: string, passwordConfirm: string, cpf: string, dataNascimento: Date, cep: number, endereco: string, endereco2: string, phoneNumber: number) {
      this.nomeCompleto =  nomeCompleto;
      this.userName = userName;
      this.email = email;
      this.dataNascimento = dataNascimento;
      this.cpf = cpf;
      this.cep = cep;
      this.endereco = endereco;
      this.endereco2 = endereco2;
      this.phoneNumber = phoneNumber;
      this.password = password;
      this.passwordConfirm = passwordConfirm;
   }

}
