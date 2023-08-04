import { TypePrice } from "./type-price"
import { UnitType } from "./unit-type"

export interface UnitDetails {
  ownerID:string
  id?:number
  name: string,
  area :number
  governamnet:string
  city :string
  location :string
  unitType: UnitType
  price:number
  capacityRoom :number,
  capacityBathRoom :number,
  coverImageString :string
  description :string
  floorNumber?:number
  address:string
  priceType: TypePrice ,
  minPrice?:number
  maxPrice?:number
  unitImagesString?:string
  categoryId?:number;
}

