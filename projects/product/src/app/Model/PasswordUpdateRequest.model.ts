export class PasswordUpdateRequest{
    constructor(
        public email:string,
        public newPassword:string
    ){}
}