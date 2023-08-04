import { TypePrice } from "./type-price"
import { UnitType } from "./unit-type"

export interface Addunit {
  Name:string,
  Area:number,
  Governamnet:string,
  City:string ,
  Location:string ,
  Price:number ,
  CapacityRoom:number ,
  CapacityBathRoom:number,
  CoverImage:string,
  Description:string ,
  FloorNumber?:number ,
  Address:string ,
  PriceType:TypePrice,
  MinPrice?:number,
  MaxPrice?:number,
  Duration:number ,
  CategoryId:number,
  UnitImagesFile:any[],
  UnitConcreteImagesFile:any[]
}
