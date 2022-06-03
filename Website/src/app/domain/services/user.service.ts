import { Injectable } from "@angular/core";
import { UserRepository } from "src/app/data/repositories/user.repository";
import { UserDTO } from "../models/DTO/userDTO";

@Injectable({
   providedIn: 'root'
})
export class UserService {
   
   usersIdName: Map<string, string> = new Map();
   user: UserDTO;

   constructor(
      private userRepository: UserRepository
   ) { }

   getUserDTO(id: string) {
      return this.userRepository.getUserDTO(id).pipe(ret => {
         return ret;
      });
   } 

   async getUserNameById(id: string) {
      if (this.usersIdName.has(id)) {
         return this.usersIdName.get(id);
      }
      let user = await this.getUserDTO(id).toPromise();
      let name: string = user.userName;
      this.usersIdName.set(id, name);
      return name;
   }
   
}
