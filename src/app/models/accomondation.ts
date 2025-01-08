export class Accomondation{
  constructor(){}
  name:string=""
  type:string=""//select

  facilities:string[]=[]
  //priceRange:
  arrDate:string=""
  depDate:string=""
  numberOfPeople:number=0
  priceRange: { min: number, max: number } = { min: 0, max: 1000 }; 




}
