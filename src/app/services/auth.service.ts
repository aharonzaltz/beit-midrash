import {Injectable, NgZone} from '@angular/core';
import * as auth from 'firebase/auth';
import {AngularFireAuth} from '@angular/fire/compat/auth';
import {AngularFirestore, AngularFirestoreDocument} from '@angular/fire/compat/firestore';
import {Router} from '@angular/router';
import {LoginError, User} from "../interfaces/user.interfcae";
import firebase from "firebase/compat";
import {map, takeUntil} from "rxjs/operators";
import {BehaviorSubject, Observable, Subject} from "rxjs";
import {MessageDetails, Severity} from "../interfaces/app.interfaces";
import {MessageService} from "primeng/api";


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
    return this.afAuth
      .signInWithEmailAndPassword(email, password)
      .then((result: any) => {
        this.ngZone.run(() => {
          this.router.navigate(['']);
        });
        this.setUserData(result.user);
      })
      .catch((error: any) => {
        const errorCode: LoginError = error.code;
        let errorMessage: MessageDetails | null = null
        switch (errorCode) {
          case LoginError.incorrectLogin:
          case LoginError.wrongPassword:
            errorMessage = MessageDetails.invalidLogin;
            break

          default:
            break;

        }
        if(errorMessage) {
          this.messageService.add({severity:Severity.error, detail: errorMessage});
        }

      });
  }

  signUp(email: string, password: string) {
    email = email.trim();
    password = password.trim();
    return this.afAuth
      .createUserWithEmailAndPassword(email, password)
      .then((result: any) => {
        /* Call the SendVerificaitonMail() function when new user sign
        up and returns promise */
        this.sendVerificationMail();
        this.setUserData(result.user);
      })
      .catch((error: any) => {
        window.alert(error.message);
      });
  }

  sendVerificationMail() {
    return this.afAuth.currentUser
      .then((u: any) => u.sendEmailVerification())
      .then(() => {
        this.router.navigate(['verify-email-address']);
      });
  }

  forgotPassword(passwordResetEmail: string) {
    passwordResetEmail = passwordResetEmail.trim();
    return this.afAuth
      .sendPasswordResetEmail(passwordResetEmail)
      .then(() => {
        window.alert('נשלח מייל אישור הרשמה. אנא בדוק את תיבת המייל שלך!');
      })
      .catch((error: any) => {
        window.alert(error);
      });
  }
  // Returns true when user is looged in and email is verified
  isLoggedIn(): Observable<boolean> {
    return this.getUserData$.pipe(map(val => !!val))
  }
  // Sign in with Google
  googleAuth() {
    return this.authLogin(new auth.GoogleAuthProvider()).then((res: any) => {
      if (res) {
        this.router.navigate(['']);
      }
    });
  }
  // Auth logic to run auth providers
  authLogin(provider: any) {
    return this.afAuth
      .signInWithPopup(provider)
      .then((result: any) => {
        this.ngZone.run(() => {
          this.router.navigate(['']);
        });
        this.setUserData(result.user);
      })
      .catch((error: any) => {
        window.alert(error);
      });
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
    return this.afAuth.signOut().then(() => {
      localStorage.removeItem('user');
      this.router.navigate(['']);
    });
  }

  ngOnDestroy() {
    this.destroyed$.next();
    this.destroyed$.complete();
  }
}
