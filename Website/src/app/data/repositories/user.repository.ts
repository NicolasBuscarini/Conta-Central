import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { map } from "rxjs/operators";
import { UserDTO } from "src/app/domain/models/DTO/userDTO";
import { environment } from "src/environments/environment";

@Injectable({
    providedIn: 'root'
})
export class UserRepository {

    private apiUrl = environment.apiUrl;
    
    httpOptions = {
        headers: new HttpHeaders({ 'Content-Type': 'application/json' })
    };

    constructor(
        private httpClient: HttpClient
    ) { }
        
    getUserDTO(id: string): Observable<UserDTO> {
      return this.httpClient.get(`${this.apiUrl}/api/Auth/get-userdto?id=` + id)
      .pipe(
         map((ret: UserDTO) => {
            return ret;
         })
      );
   }

}