import { Component, OnInit } from '@angular/core';
import { MeetingService } from '../../Services/meeting.service';
import { ActivatedRoute } from '@angular/router';
import { Meeting } from '../../Models/meeting';
import { Profile } from 'src/app/user/Models/profile';
import { UnitDetails } from 'src/app/unit/Models/unit-details';
import { UnitService } from 'src/app/unit/Services/unit.service';
import { Offer } from 'src/app/offers/Models/offer';
import { OffersService } from 'src/app/offers/Services/offers.service';

@Component({
  selector: 'app-meeting-details',
  templateUrl: './meeting-details.component.html',
  styleUrls: ['./meeting-details.component.css']
})
export class MeetingDetailsComponent implements OnInit{

  constructor(private offerServices:OffersService,private unitServices:UnitService,private meetingServices:MeetingService,private route:ActivatedRoute){}
  ngOnInit(): void {
this.getID();
  }
  meetingId:string='';
  meetings:Meeting[]=[]
  meeting:Meeting={
    buyerID:'',
    date:new Date,
    meeingDate:new Date,
    meetingDetails:'',
    offerID:0,
    ownerID:'',
    stuts:false,
    unitID:0
  };

  offer:Offer={
    buyerID:'',
    buyerName:'',
    id:0,
    message:'',
    ownerID:'',
    ownerName:'',
    price:0,
    unitBuildingID:0
  };
  userProfile:Profile={
    address:'',
    birthDate:new Date,
    email:'',
    fullName:'',
    nid:'',
    nidPhoto:'',
    personalPhoto:'',
    phoneNumber:'',
  }
  unitDetails: UnitDetails = {
    ownerID:'',
    name: '',
    description: '',
    floorNumber: 0,
    area: 0,
    governamnet: '',
    city: '',
    address: '',
    location: '',
    unitType : 0,
    priceType: 0,
    price: 0,
    minPrice: 0,
    maxPrice: 0,
    capacityRoom: 0,
    capacityBathRoom: 0,
    coverImageString:'',
    unitImagesString: ''
  }
  selectedImage: String = '';

  getID(){
    this.route.paramMap.subscribe((params) => {

      this.meetingId = params.get('id')!;

      this.meetingServices.getMettingDeails(this.meetingId).subscribe({
        next:(value)=>{
        const documentData=value.payload.data();
        this.meeting=documentData as Meeting;
          this.getUser();
          this.getUnitDetails();
          this.getOffer();
        this.updateStatus(this.meetingId);

        }

      });
    });
  }

user:string='';
  getUser(){
    console.log("Meeting ===>>>", this.meeting);
    if(this.meeting.buyerID==localStorage.getItem('token')){
      this.user=this.meeting.ownerID;
      console.log("This Is Owner ====>>> ",this.user);
    }
   else{ this.user=this.meeting.buyerID;
            console.log("This Is Buyer ====>>> ",this.user);
    }
    // if('227bff19-13fb-4f84-bb89-e86a5074c61f'==localStorage.getItem('token')){
    //        this.user='4dddbe1c-b9d7-46a8-bec4-455ef035d49e';
    // }
    // else{this.user='227bff19-13fb-4f84-bb89-e86a5074c61f'}

    this.meetingServices.getProfile(this.user).subscribe({
      next:(value)=>{
        this.userProfile=value;
        console.log("Profile",this.userProfile);

      }
    });
  }

  selectImage(index: number) {
    this.selectedImage = "http://localhost:5219/UnitImages/"+this.unitDetails.unitImagesString!.split(',')[index];
  console.log("Selected Image:  === ",this.selectImage);

  }

  getUnitDetails(){
    this.unitServices.getUnitDetails(this.meeting.unitID).subscribe({
      next: (response) =>
      {

        this.unitDetails = response;
        console.log("UnitDetail===>>> ",this.unitDetails);
        this.selectedImage = "http://localhost:5219/UnitImages/"+this.unitDetails.coverImageString;
        console.log("SelectedImage===>>> ",this.selectedImage);

      },
      error: (error) => {
        console.log(error);
      }

    });
  }

  getOffer(){
this.offerServices.getOffer(this.meeting.offerID).subscribe({
  next:(value)=> {
    this.offer=value;
  },
});
  }

  updateStatus(meetingID:string){
this.meetingServices.updateStatus(meetingID);
  }
}
