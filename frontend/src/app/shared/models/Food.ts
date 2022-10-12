export class Food{
  id!:string;//!is used for required member filed
  name!:string;
  price!:number;
  tags?:string[]; //? is used for optional member fields.
  favorite!:boolean;
  stars!:number;
  imageUrl!:string;
  origins!:string[];
  cookTime!:string;
}
