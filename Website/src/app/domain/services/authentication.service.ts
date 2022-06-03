import { Injectable } from "@angular/core";
import { Router } from "@angular/router";
import { BehaviorSubject, Observable } from "rxjs";
import { map } from "rxjs/operators";
import { AuthenticationRepository } from "src/app/data/repositories/authentication.repository";
import { SignUpDTO } from "../models/DTO/signUpDTO";
import { SsoDTO } from "../models/sso";
import { User } from "../models/user";

@Injectable({ providedIn: 'root' })
export class AuthenticationService {
   private currentUserSubject: BehaviorSubject<User>;
   public currentUserObservable: Observable<User>;

   private accessTokenSubject: BehaviorSubject<string>;
   public accessTokenObservable: Observable<string>;

   constructor(
      private authRepository: AuthenticationRepository,
      private router: Router
   ) {
      this.currentUserSubject = new BehaviorSubject<User>(JSON.parse(localStorage.getItem('currentUser')));
      this.currentUserObservable = this.currentUserSubject.asObservable();

      this.accessTokenSubject = new BehaviorSubject<string>(localStorage.getItem('accessToken'));
      this.accessTokenObservable = this.accessTokenSubject.asObservable();
   }

   public get currentUser(): User {
      return this.currentUserSubject.value;
   }

   public get access_token(): string {
      return this.accessTokenSubject.value;
   }

   login(username: string, password: string): Observable<SsoDTO> {
      return this.authRepository.login(username, password)
         .pipe(map(data => {
            localStorage.setItem('currentUser', JSON.stringify(data.user));
            localStorage.setItem('accessToken', data.access_token);

            this.currentUserSubject.next(data.user);
            this.accessTokenSubject.next(data.access_token);

            return data;
         }));
   }

   reset() {
      localStorage.removeItem('currentUser');
      this.currentUserSubject.next(null);

      localStorage.removeItem('accessToken');
      this.accessTokenSubject.next(null);

      this.router.navigate(['/']);
   }

   signUp(user: SignUpDTO) {
      return this.authRepository.signUp(user);
   }
    
}