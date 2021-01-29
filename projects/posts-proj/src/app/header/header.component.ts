import { AuthService } from './../auth/auth.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
})
export class HeaderComponent implements OnInit {
  isAuthenticated = false;
  constructor(private authService: AuthService) {}

  ngOnInit(): void {
    this.isAuthenticated = this.authService.getIsAuth();
    this.authService.getAuthStatusListner().subscribe((isAuth) => {
      if (isAuth) {
        this.isAuthenticated = isAuth;
      } else {
        this.isAuthenticated = false;
      }
    });
  }
  onLogout(): void {
    this.authService.logout();
  }
}
