import { TypePrice } from "./type-price"
import { UnitType } from "./unit-type"

export interface UnitCard {
    id?:number
    name: string,
    area :number
    governamnet:string
    city :string
    location :string
    unitType: UnitType,
    priceType:TypePrice,
    price:number
    capacityRoom :number,
    capacityBathRoom :number,
    coverImageString :string,

}
