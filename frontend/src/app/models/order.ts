import { Item } from "./item";
export class Order {
    _id!: string;
    user!: string;
    items!: Item;
    createdAt!: Date;
  }
  