import { Component, OnInit } from '@angular/core';
import { Profile } from '../../Models/profile';
import { ProfileService } from '../../Services/profile.service';
import { ActivatedRoute, Router } from '@angular/router';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';


@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css'],
})
export class ProfileComponent implements OnInit {

  profileDetails: Profile = {
    fullName: "",
    email: "",
    address: "",
    birthDate: new Date(),
    nid: "",
    nidPhoto: "",
    personalPhoto: "",
    phoneNumber: "",
  };

  profileForm: FormGroup;

  selectedFile!: File;

  imageSrc: string | ArrayBuffer | null = null;

  profilePicForm: FormGroup;



  constructor(private profileService: ProfileService,
    private route: ActivatedRoute,
    private toaster:ToastrService,
    private router: Router)
  {
    this.profileForm = new FormGroup({
      fullName:new FormControl(this.profileDetails.fullName,[Validators.required,Validators.minLength(8)]),
      email:new FormControl(this.profileDetails.email,[Validators.required,Validators.email]),
      address:new FormControl(this.profileDetails.address,[Validators.required]),
      nid:new FormControl(this.profileDetails.nid,[Validators.required,Validators.minLength(14),Validators.maxLength(14)]),
      phoneNumber: new FormControl(this.profileDetails.phoneNumber, [Validators.required]),
      personalPhoto: new FormControl('', [Validators.required]),
      BirthDate:new FormControl('',[Validators.required])
    })

    this.profilePicForm = new FormGroup({
      personalPhoto: new FormControl(this.profileDetails.personalPhoto, [Validators.required]),
    })
   }

  ngOnInit(): void {

    console.log('on init .......')

    this.getProfileDetails();


    ///////// form for pic //////////////
    this.profilePicForm.valueChanges.subscribe({
      next:(response)=>{
        this.profileDetails.personalPhoto=response.personalPhoto;
      }
    });
  }


  getProfileDetails(): void {
    this.route.paramMap.subscribe(params => {
      this.profileService.getProfile().subscribe({
        next: (data) => {
          this.profileDetails = data;
          console.log(this.profileDetails); /////
          this.profileForm.setValue({
            fullName: this.profileDetails.fullName,
            email: this.profileDetails.email,
            address: this.profileDetails.address,
            nid: this.profileDetails.nid,
            phoneNumber: this.profileDetails.phoneNumber,
            personalPhoto: this.profileDetails.personalPhoto,
            BirthDate: this.profileDetails.birthDate
          }),

          this.profilePicForm.setValue({
            personalPhoto: this.profileDetails.personalPhoto,
          }),

          this.profileForm.valueChanges.subscribe({
            next:(response)=>{
              this.profileDetails = response;
            }
          });

        },
        error: (error) => {
          console.error(error);
        }
      });
    });
  }


  UpdateProfile(): void {
    this.profileService.updateProfile(this.profileDetails).subscribe({
      next: (response) => {
        // this.toaster.success('تم تعديل البيانات بنجاح')
        this.profileDetails = response;
        window.location.reload();
      },
      error: (error) => {
        this.toaster.error('عفوا حدث خطأ يرجي الحماولة في وقت لاحق ')
        console.error('Error updating profile:', error);
        console.log('Error message:', error.message);
        console.log('Validation errors:', error.error.errors);
      }
    });
  }



  calculateAge(birthdate: Date): number {
    const today = new Date();
    const birthDate = new Date(birthdate);
    let age = today.getFullYear() - birthDate.getFullYear();
    const monthDifference = today.getMonth() - birthDate.getMonth();

    if (monthDifference < 0 || (monthDifference === 0 && today.getDate() < birthDate.getDate())) {
      age--;
    }

    return age;
  }

  selectFile(): void {
    const fileInput = document.getElementById('fileInput') as HTMLInputElement;
    fileInput.click();
  }

  onFileSelected(event: any): void {
    this.selectedFile = event.target.files[0];

    // Read the selected file as a data URL
    const reader = new FileReader();
    reader.onload = (e: any) => {
      this.imageSrc = e.target.result;
    };
    reader.readAsDataURL(this.selectedFile);
  }

  uploadPhoto(): void {
    if (this.selectedFile) {
      const formData = new FormData();
      formData.append('pictureURL', this.selectedFile);

      this.profileService.updateProfileImg(formData).subscribe({
        next: (response) => {
          console.log("Photo uploaded successfully");
          // Optionally, you can update the image source after the upload is successful
          this.profileDetails.personalPhoto = response.imageUrl;
          window.location.reload();
        },
        error: (error) => {
          console.error("Error uploading photo:", error);
        }
      });
    } else {
      console.log("No file selected");
    }
  }
}
