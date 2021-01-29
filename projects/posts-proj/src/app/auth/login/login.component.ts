import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { NgForm } from '@angular/forms';

import { AuthService } from './../auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit, OnDestroy {
  isLoading = false;
  authSub: Subscription;
  constructor(private authService: AuthService) {}

  ngOnInit(): void {
    this.authSub = this.authService
      .getAuthStatusListner()
      .subscribe((authStatus) => {
        this.isLoading = false;
      });
  }

  onLogin(form: NgForm): void {
    this.isLoading = true;
    this.authService.login(form.value.email, form.value.password);
  }
  ngOnDestroy(): void {
    this.authSub.unsubscribe();
  }
}
