import { Address } from "./Address.model";
import { Payment } from "./Payment.model";


export class Order{
    constructor(
        public orderId:number,
        public orderedDate:string,
        public status:string,
        public address:Address,
        public cartId:number,
        public payment:Payment
    ){}
    
}