import { UnitCard } from "./unit-card"

export interface ICategory {
  id:number,
  name:string,
  coverImage:string
}

export interface ICategoryWithBuilding {
  id:number,
  name:string,
  coverImage:string,
  unitBuildingCardDTOs:UnitCard[]
}
