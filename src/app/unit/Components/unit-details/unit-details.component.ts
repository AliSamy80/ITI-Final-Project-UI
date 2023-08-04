import { Component, OnInit } from '@angular/core';
import { UnitDetails } from '../../Models/unit-details';
import { UnitService } from '../../Services/unit.service';
import { ActivatedRoute } from '@angular/router';
import { Offer } from 'src/app/offers/Models/offer';
import { OffersService } from 'src/app/offers/Services/offers.service';
import { UnitType } from '../../Models/unit-type';
import { TypePrice } from '../../Models/type-price';
import { UnitCard } from '../../Models/unit-card';
import { Favorites } from '../../Models/favorites';
import { NotificationsService } from 'src/app/Services/Notifications/notifications.service';
import { Notifications } from 'src/app/Component/home-page/NotificatioModel/notifications';
import { ToastrService } from 'ngx-toastr';


@Component({
  selector: 'app-unit-details',
  templateUrl: './unit-details.component.html',
  styleUrls: ['./unit-details.component.css'],

})

export class UnitDetailsComponent implements OnInit{



    ////////// For Offer ///////////////
    addedOffer: Offer = {
      id: 0,
      message: '',
      price: 0,
      unitBuildingID: 0,
      buyerID: '',
      ownerID: '',
      buyerName:'',
      ownerName:''
  }



unitID:any;
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
title?:string;
cityonlyy?: string;
    selectedImage: String = '';
    constructor(private unitservice: UnitService,private route: ActivatedRoute,private toaster:ToastrService,
       private offerservice : OffersService,private notificationServices:NotificationsService){

       }

    ngOnInit(): void {

      console.log("On Init **************");

      this.route.paramMap.subscribe((params) => {

        this.unitID = params.get('id')!;
        console.log("===== id ===",this.unitID);

        // if (id) {
        //   this.addedOffer.unitBuildingID = Number(id);
        // }

        this.unitservice.getUnitDetails(this.unitID).subscribe({
          next: (response) =>
          {

            this.unitDetails = response;
            console.log("UnitDetail===>>> ",this.unitDetails);
this.cityonlyy=this.unitDetails.governamnet;
            this.selectedImage = "http://localhost:5219/UnitImages/"+this.unitDetails.coverImageString;
            console.log("SelectedImage===>>> ",this.selectedImage);

          },
          error: (error) => {
            console.log(error);
          }

        });
      });

    }


    selectImage(index: number) {
      this.selectedImage = "http://localhost:5219/UnitImages/"+this.unitDetails.unitImagesString!.split(',')[index];
    }

     token:string|null = localStorage.getItem('token');

  addOfferComponent() {


          if (this.token) {
        this.addedOffer.buyerID = this.token;
      }
      this.addedOffer.ownerID = this.unitDetails.ownerID
      this.addedOffer.unitBuildingID=this.unitID;

      this.offerservice.addOffer(this.addedOffer).subscribe({
        next: (value) => {
          const notification:Notifications={
            date:new Date,
            location:'offer/offers',
            message:'لقد تلقيت عرضا جديدا اذهب الي العروض لرؤية احدث العروض المرسلة',
            starus:false,
            userId:this.addedOffer.ownerID
          }
this.notificationServices.sendNotification(notification)
this.toaster.success('تم إرسال العرض بنجاح في انتظار رد المالك');
          this.addedOffer.message = '';
          this.addedOffer.price = 0;
        },
        error: (err) => console.log(err)
      })
    }




}
