import { CategoryEntity } from "./category.model";


export class Product{
    constructor(
        public  productId:number,
        public  name:string,
        public  price:number,
        public  quantity:number,
        public  description:string,
        public quantityProduct:number,
        public  category:CategoryEntity
    ){}
}

