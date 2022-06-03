import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { map } from "rxjs/operators";
import { SignUpDTO } from "src/app/domain/models/DTO/signUpDTO";
import { SsoDTO } from "src/app/domain/models/sso";
import { environment } from "src/environments/environment";

@Injectable({
    providedIn: 'root'
})
export class AuthenticationRepository {

    private apiUrl = environment.apiUrl;

    httpOptions = {
        headers: new HttpHeaders({ 'Content-Type': 'application/json' })
    };

    constructor(
        private httpClient: HttpClient
    ) { }
        
    login(username: string, password: string): Observable<SsoDTO> {
        return this.httpClient.post<SsoDTO>(`${this.apiUrl}/api/auth/sign-in`, { username, password })
        .pipe(map((ret: SsoDTO) => {
            return ret;
        }));
    }

    signUp(newUser: SignUpDTO): Observable<boolean> {
        return this.httpClient.post(`${this.apiUrl}/api/auth/sign-up`, newUser)
        .pipe(map((ret: boolean) => {
            return ret;
        }));
    }
}