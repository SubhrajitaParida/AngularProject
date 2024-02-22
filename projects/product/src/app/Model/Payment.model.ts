export class Payment{
    constructor(
        public paymentId:number,
        public paymentMode:string,
        public amount:number,
        public status:string,
        public paymentDate:string
    ){}
}