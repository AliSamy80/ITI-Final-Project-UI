import { Injectable, inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { UserService } from '../Services/user.service';

export const userAuthGGuard: CanActivateFn = (route, state) => {
  const service=inject(UserService);
  const router=inject(Router);


    if (service.isAuthenticated()) {
      return true;
    } else {
      router.navigate(['user/login']);
      return false;
    }
  }


