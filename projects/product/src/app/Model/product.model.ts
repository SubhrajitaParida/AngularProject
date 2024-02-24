import { CategoryEntity } from "./category.model";


export class Product{
    constructor(
        public  productId:number,
        public  name:string,
        public  price:number,
        public  quantity:number,
        public  description:string,
        public quantityProduct:number,
        public image:string,
        public status:String,
        public  category:CategoryEntity
    ){}
}

