import { AuthService } from './../../auth/auth.service';
import { Component, EventEmitter, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-sidenav-list',
  templateUrl: './sidenav-list.component.html',
  styleUrls: ['./sidenav-list.component.css'],
})
export class SidenavListComponent implements OnInit {
  @Output() sideNavToggle = new EventEmitter<void>();
  isAuth = false;
  constructor(private authService: AuthService) {}

  ngOnInit(): void {
    this.authService.authChange.subscribe((authStatus: boolean) => {
      this.isAuth = authStatus;
    });
  }
  onClose(): void {
    this.sideNavToggle.emit();
  }
  onLogout(): void {
    this.onClose();
    this.authService.logout();
  }
}
