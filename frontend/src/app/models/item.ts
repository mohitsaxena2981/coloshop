// import { Category } from "./category";

// export class Item {
//     _id!:string;
//     name!:string;
//     description!:string;
//     price!:number;
//     image!:string;
//     category!:Category
// }

import { Category } from "./category";
export class Item {
    _id!: string;
    name!: string;
    description!: string;
    price!: number;
    image!: string;
    category!: Category;
    newArrival!: boolean; // Add the newCategory field
  }
  