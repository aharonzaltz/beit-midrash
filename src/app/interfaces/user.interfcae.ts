export interface User {
  uid: string;
  email: string;
  displayName: string;
  photoURL: string;
  emailVerified: boolean;
}

export enum LoginError {
  wrongPassword = "auth/wrong-password",
  networkFailed = "auth/network-request-failed",
  invalidEmail = "auth/invalid-email",
  userNotFound = "auth/user-not-found",
  weakPassword = "auth/weak-password",
  emailAlreadyInUse = "auth/email-already-in-use",
}
