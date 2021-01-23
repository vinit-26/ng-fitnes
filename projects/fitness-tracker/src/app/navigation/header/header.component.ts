import { AuthService } from './../../auth/auth.service';
import { Component, EventEmitter, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
})
export class HeaderComponent implements OnInit {
  @Output() sidenavToggle = new EventEmitter<void>();
  isAuth!: boolean;
  constructor(private authService: AuthService) {}

  ngOnInit(): void {
    this.authService.authChange.subscribe((authStatus: boolean) => {
      this.isAuth = authStatus;
    });
  }
  onSidenavToggle(): void {
    this.sidenavToggle.emit();
  }
  onLogout(): void {
    this.authService.logout();
  }
}
