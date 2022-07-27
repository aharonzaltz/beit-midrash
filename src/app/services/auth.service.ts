import {Injectable, NgZone} from '@angular/core';
import * as auth from 'firebase/auth';
import {AngularFireAuth} from '@angular/fire/compat/auth';
import {AngularFirestore, AngularFirestoreDocument} from '@angular/fire/compat/firestore';
import {Router} from '@angular/router';
import {LoginError, User} from "../interfaces/user.interfcae";
import firebase from "firebase/compat";
import {catchError, map, switchMap, takeUntil, tap} from "rxjs/operators";
import {BehaviorSubject, from, Observable, of, Subject} from "rxjs";
import {FirebaseErrors, MessageDetails, Severity} from "../interfaces/app.interfaces";
import {MessageService} from "primeng/api";
import {getErrorMessage} from "./auth-utils";
import {getEnumKeyByEnumValue} from "./app-utils.service";


@Injectable({providedIn: 'root'})
export class AuthService {

  private userDataSub = new BehaviorSubject<firebase.User | null>(null)
  getUserData$ = this.userDataSub.asObservable();

  private destroyed$ = new Subject<any>();

  constructor(
    public afs: AngularFirestore, // Inject Firestore service
    public afAuth: AngularFireAuth, // Inject Firebase auth service
    public router: Router,
    public messageService: MessageService,
    public ngZone: NgZone, // NgZone service to remove outside scope warning,
  ) {

    this.afAuth.authState.pipe(
      takeUntil(this.destroyed$)
    ).subscribe((user: firebase.User | null) => {
      this.userDataSub.next(user)
      if (user) {
        localStorage.setItem('user', JSON.stringify(user));
        JSON.parse(localStorage.getItem('user')!);
      } else {
        localStorage.setItem('user', 'null');
        JSON.parse(localStorage.getItem('user')!);
      }
    });
  }

  signIn(email: string, password: string) {
    email = email.trim();
    password = password.trim();
    return from(this.afAuth.signInWithEmailAndPassword(email, password)).pipe(
        tap((result: any) => {
          this.ngZone.run(() => {
            this.router.navigate(['']);
          });
          this.setUserData(result.user);
        }),
        catchError(error => {
          const errorMessage = getErrorMessage(error.code)
          if(errorMessage) {
            this.messageService.add({severity:Severity.error, detail: errorMessage});
          }
          return of(null)
        })
    )
  }

  signUp(email: string, password: string) {
    email = email.trim();
    password = password.trim();
    return from(this.afAuth.createUserWithEmailAndPassword(email, password)).pipe(
        switchMap((result: any) => {
          /* Call the SendVerificaitonMail() function when new user sign
          up and returns promise */
          this.setUserData(result.user);
          return this.sendVerificationMail();
        }),
        catchError((error: any) => {

            const errorMessage = getErrorMessage(error.code)
            if(errorMessage) {
                this.messageService.add({severity:Severity.error, detail: errorMessage});
            }
          return of(null)
        })
    )
  }

  sendVerificationMail() {
    return from(this.afAuth.currentUser).pipe(
        tap(val => val?.sendEmailVerification()),
        tap(val => this.router.navigate(['verify-email-address']))
    )
  }

  forgotPassword(passwordResetEmail: string) {
    passwordResetEmail = passwordResetEmail.trim();
    return from(this.afAuth.sendPasswordResetEmail(passwordResetEmail)).pipe(
        tap(val => {
          this.messageService.add({severity:Severity.success, detail: MessageDetails.sendPasswordResetEmail})
        }),
        catchError(error => {
          const errorMessage = getErrorMessage(error.code)
          if(errorMessage) {
            this.messageService.add({severity:Severity.error, detail: errorMessage});
          }
          return of(null)
        })
    )
  }
  // Returns true when user is looged in and email is verified
  isLoggedIn(): Observable<boolean> {
    return this.getUserData$.pipe(map(val => !!val))
  }
  // Sign in with Google
  googleAuth() {
    return this.authLogin(new auth.GoogleAuthProvider()).pipe(
        tap((res: any) => {
          if (res) {
            this.router.navigate(['']);
          }
        })
    )
  }
  // Auth logic to run auth providers
  authLogin(provider: any) {
    return from(this.afAuth.signInWithPopup(provider)).pipe(
        tap((result: any) => {
          this.ngZone.run(() => {
            this.router.navigate(['']);
          });
          this.setUserData(result.user);
        }),
        catchError((error: any) => {
            const errorMessage = getErrorMessage(error.code)
            if(errorMessage) {
                this.messageService.add({severity:Severity.error, detail: errorMessage});
            }
          return of(null)
        })
    )
  }
  /* Setting up user data when sign in with username/password,
  sign up with username/password and sign in with social auth
  provider in Firestore database using AngularFirestore + AngularFirestoreDocument service */
  setUserData(user: any) {
    const userRef: AngularFirestoreDocument<any> = this.afs.doc(
      `users/${user.uid}`
    );
    const userData: User = {
      uid: user.uid,
      email: user.email,
      displayName: user.displayName,
      photoURL: user.photoURL,
      emailVerified: user.emailVerified,
    };
    return userRef.set(userData, {
      merge: true,
    });
  }

  signOut() {
    return from(this.afAuth.signOut()).pipe(
        tap((val) => {
          localStorage.removeItem('user');
          this.router.navigate(['']);
        })
    )
  }

  ngOnDestroy() {
    this.destroyed$.next();
    this.destroyed$.complete();
  }
}
