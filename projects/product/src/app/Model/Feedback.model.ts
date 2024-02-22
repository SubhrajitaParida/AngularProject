import { Order } from "./Order.model";

export class Feedback{
    constructor(
        public feedbackId:number,
        public userId:number,
        public order:Order,
        public feedback:string,
        public ratings:number,
        public feedbackDate:string
    ){}
}