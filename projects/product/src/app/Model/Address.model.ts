export class Address{
    constructor(
        public addressId:number,
        public streetName:string,
        public city:string,
        public state:string,
        public pinCode:number,
        public userId:number,
        public status:string
    ){}
}