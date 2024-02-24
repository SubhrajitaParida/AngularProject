import { Product } from "../Model/product.model";


export class Cart{
  constructor(
    public cartId:number,
      public status:string,
      public user:User,
      public quantity:number,
      public amount:number,
      public products:Product[]=[]
  ){}
      

  }

  export class User{
   
      public userId?:number;
      public userName?:string;
      public userMobileNumber?:number;
      public userStatus?:string;
      public userEmail?:String;
      public userPassword?:String;
      public userGender?:String;
      public userRole?:String;

  }

  // export class UpdateProduct{
  //   public  productId?:number;
  //   public  name?:string;
  //   public  price?:number;
  //   public  quantity?:number;
  //   public  description?:string;
  //   public  category?:CategoryEntity;
  // }