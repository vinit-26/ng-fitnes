import { UIService } from './../../shared/ui.service';
import { AuthService } from './../auth.service';
import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {
  // public loginForm!: FormGroup;
  isLoading = false;
  constructor(private authService: AuthService, private uiService: UIService) {
    // this.loginForm = new FormGroup({
    //   email: new FormControl('', {
    //     validators: [Validators.required, Validators.email],
    //   }),
    //   password: new FormControl('', {
    //     validators: [Validators.required, Validators.minLength(6)],
    //   }),
    // });
  }

  ngOnInit(): void {
    this.uiService.loadingStateChanged.subscribe((isLoading: boolean) => {
      this.isLoading = isLoading;
    });
  }

  signInWithGoogle(): void {
    this.authService
      .signInViaProviders()
      .then((result) => {
        console.log(result);
      })
      .catch((err) => console.log(err));
  }

  onSubmit(form: NgForm): void {
    this.authService.login({
      email: form.value.email,
      password: form.value.password,
    });
  }
}
