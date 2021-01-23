import { UIService } from './../shared/ui.service';
import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { Router } from '@angular/router';
import { Subject } from 'rxjs';
import firebase from 'firebase/app';

import { TrainingService } from './../traning/training.service';
import { AuthData } from './auth-data.model';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private isAuthenticated = false;
  authChange = new Subject<boolean>();
  constructor(
    private router: Router,
    private afa: AngularFireAuth,
    private trainingService: TrainingService,
    private uiService: UIService
  ) {}

  initAuthListner(): void {
    this.afa.authState.subscribe((user) => {
      if (user) {
        this.isAuthenticated = true;
        this.authChange.next(true);
        this.router.navigate(['/training']);
      } else {
        this.trainingService.cancelSubscription();
        this.isAuthenticated = false;
        this.authChange.next(false);
        this.router.navigate(['/login']);
      }
    });
  }

  registerUser(authData: AuthData): void {
    this.uiService.loadingStateChanged.next(true);
    this.afa
      .createUserWithEmailAndPassword(authData.email, authData.password)
      .then((response) => {
        this.uiService.loadingStateChanged.next(false);
      })
      .catch((error) => {
        this.uiService.loadingStateChanged.next(false);
        this.uiService.showSnackBar(error.message, undefined, 3000);
      });
  }
  login(authData: AuthData): void {
    this.uiService.loadingStateChanged.next(true);
    this.afa
      .signInWithEmailAndPassword(authData.email, authData.password)
      .then((response) => {
        this.uiService.loadingStateChanged.next(false);
      })
      .catch((error) => {
        this.uiService.loadingStateChanged.next(false);
        this.uiService.showSnackBar(error.message, undefined, 3000);
      });
  }
  logout(): void {
    this.afa.signOut();
  }

  isAuth(): boolean {
    return this.isAuthenticated;
  }
  signInViaProviders(): Promise<firebase.auth.UserCredential> {
    const provider = new firebase.auth.GoogleAuthProvider();
    return this.afa.signInWithPopup(provider);
  }
}
