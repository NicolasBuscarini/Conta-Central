export class UserDTO{

	id : string = ""
	userName: string = ""
	Email: string = ""

	constructor(id:string, userName: string, Email: string) {
		this.id = id;
		this.userName = userName;
		this.Email = Email
	}
	
}