import { inject, Injectable } from '@angular/core';
import {
  Auth,
  authState,
  createUserWithEmailAndPassword,
  GoogleAuthProvider,
  signInWithEmailAndPassword,
  signInWithPopup,
  User,
} from '@angular/fire/auth';
import { Observable } from 'rxjs';
@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private _auht = inject(Auth);
  constructor() {}

  async registrar(user: any) {
    await createUserWithEmailAndPassword(this._auht, user.email, user.password);
  }

  async login(user: any) {
    return await signInWithEmailAndPassword(
      this._auht,
      user.email,
      user.password
    );
  }

  async loginWithGoogle() {
    const googleProvider = new GoogleAuthProvider();
    return await signInWithPopup(this._auht, googleProvider);
  }

  get authState$(): Observable<User | null> {
    return authState(this._auht);
  }

  async cerrarSesion() {
    await this._auht.signOut();
  }
}
