import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { SignUpDTO } from 'src/app/domain/models/DTO/signUpDTO';
import { AuthenticationService } from 'src/app/domain/services/authentication.service';

@Component({
   selector: 'app-register',
   templateUrl: './register.component.html',
   styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {

   public errorAlert: string = "";

   public signUpForm = new FormGroup({
      'nomeCompleto':    new FormControl("", [ Validators.required ]),
      'email':           new FormControl("", [ Validators.required ]),
      'userName':        new FormControl("", [ Validators.required, RegisterComponent.cannotContainSpace ]),
      'password':        new FormControl("", [ Validators.required ]),
      'passwordConfirm': new FormControl("", [ Validators.required ]),
      'cpf':             new FormControl("", [ Validators.required ]),
      'dataNascimento':  new FormControl("", [ Validators.required ]),
      'cep':             new FormControl("", [ Validators.required ]),
      'endereco':        new FormControl("", [ Validators.required ]),
      'endereco2':       new FormControl(""),
      'phoneNumber':     new FormControl("", [ Validators.required])
   });
   
   constructor(
      private authenticationService: AuthenticationService,
      private router: Router
   ) { }

   ngOnInit(): void { }
   
   get fSignUp() {
      return this.signUpForm.controls;
   }

   static cannotContainSpace(control: AbstractControl) {
      if((control.value as string).indexOf(' ') >= 0)
         return{cannotContainSpace : true};
      return null
   }
   
   async signUp() { 
      this.limparAlert();
      if (this.signUpForm.invalid) {
			this.errorAlert = "Cadastro de usuário falhou! Por favor, preencha os campos corretamente.";
			console.log(this.errorAlert);
			return;
		}      
      try {
         let signUpDTO: SignUpDTO = new SignUpDTO(
            this.fSignUp.nomeCompleto.value, 
            this.fSignUp.email.value,
            this.fSignUp.userName.value,
            this.fSignUp.password.value,
            this.fSignUp.passwordConfirm.value,
            this.fSignUp.cpf.value,
            this.fSignUp.dataNascimento.value, 
            this.fSignUp.cep.value,
            this.fSignUp.endereco.value, 
            this.fSignUp.endereco2.value,
            this.fSignUp.phoneNumber.value,
         );
         console.log(signUpDTO);
         if (await this.authenticationService.signUp(signUpDTO).toPromise()){
            this.signIn();
         };
      } catch(error) {
         console.log(`Erro ao se registrar: ${error.error}`);
         this.errorAlert = `Erro: ${error.error}`;
      } 
   }

   async signIn() {
      try{
         await this.authenticationService.login(this.fSignUp.userName.value, this.fSignUp.passwordConfirm.value).toPromise();
         this.router.navigate(['/dash']);
      } catch(error) {
         console.log(`Erro ao realizar login: ${error.error}`);
      };
   }

   limparAlert(): void {
      this.errorAlert = "";
   }

}
