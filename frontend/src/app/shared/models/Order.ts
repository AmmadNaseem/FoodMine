import { LatLng } from "leaflet";
import { CartItem } from "./Cartitem";

export class Order{
  id!:number;
  items!: CartItem[];
  totalPrice!:number;
  name!: string;
  address!: string;
  addressLatLng?:LatLng; //IT HOLDS THE LATITUTE AND LONGITUTU
  paymentId!: string;
  createdAt!: string;
  status!: string;
}
