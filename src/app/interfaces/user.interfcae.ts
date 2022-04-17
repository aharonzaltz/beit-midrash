export interface User {
  uid: string;
  email: string;
  displayName: string;
  photoURL: string;
  emailVerified: boolean;
}

export enum LoginError {
  incorrectLogin = "auth/invalid-email",
  wrongPassword = "auth/wrong-password",
}
