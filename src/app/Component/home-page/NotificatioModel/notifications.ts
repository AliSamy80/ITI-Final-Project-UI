export interface Notifications {
  userId:string,
  message:string,
  starus:boolean,
  location:string,
  date:Date
}
export interface NotificationID{
  id:string
}

export interface Meetings{
  meetingDetails:string,
meeingDate:Date,
date:Date,
ownerID:string,
buyerID:string,
unitID:number,
offerID:number,
stuts:boolean
}

export interface MeetingID{
  id:string
}
