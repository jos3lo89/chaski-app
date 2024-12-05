import { Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  FormBuilder,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import {
  IonContent,
  IonHeader,
  IonTitle,
  IonToolbar,
  IonCard,
  IonCardHeader,
  IonCardTitle,
  IonCardContent,
  IonList,
  IonInput,
  IonButton,
  IonSpinner,
  IonBackButton,
} from '@ionic/angular/standalone';
import { Router, RouterLink } from '@angular/router';
import { AuthService } from 'src/app/shared/services/auth.service';
import { ToastController } from '@ionic/angular';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
  standalone: true,
  imports: [
    IonBackButton,
    IonSpinner,
    IonButton,
    IonList,
    IonInput,
    IonCardContent,
    IonCardTitle,
    IonCardHeader,
    IonCard,
    IonContent,
    IonHeader,
    IonTitle,
    IonToolbar,
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    RouterLink,
  ],
})
export class LoginPage implements OnInit {
  constructor() {}
  private _formBuilder = inject(FormBuilder);
  private _authService = inject(AuthService);
  isLoadingGoogleBtn = false;
  private _toast = inject(ToastController);
  private _router = inject(Router);

  form = this._formBuilder.group({
    email: this._formBuilder.control('', [
      Validators.required,
      Validators.email,
    ]),
    password: this._formBuilder.control('', [
      Validators.required,
      Validators.minLength(8),
    ]),
  });

  isLoadingBtnSubmit = false;

  ngOnInit() {}

  async ingresar() {
    try {
      console.log(this.form.value);
      this.isLoadingBtnSubmit = true;

      const { email, password } = this.form.value;

      await this._authService.login({
        email,
        password,
      });

      this.form.reset();

      const toast = await this._toast.create({
        message: 'Vienvenido',
        duration: 1500,
        position: 'middle',
      });

      await toast.present();
      this.isLoadingBtnSubmit = false;
      this._router.navigateByUrl('/home');
    } catch (error) {
      console.log(error);
    } finally {
      this.isLoadingBtnSubmit = false;
    }
  }

  async loginWithGoogle() {
    try {
      this.isLoadingGoogleBtn = true;
      const user = await this._authService.loginWithGoogle();
      this._router.navigateByUrl('/home');
      const toast23 = await this._toast.create({
        message: `Vienvenido ${
          user.user.displayName ? user.user.displayName : user.user.email
        }`,
        duration: 1500,
        position: 'middle',
      });
      this.isLoadingGoogleBtn = false;

      await toast23.present();
    } catch (error) {
      const toast = await this._toast.create({
        message: 'Error al iniciar sesión',
        position: 'middle',
        duration: 1500,
      });
      await toast.present();

      console.log(error);
      this.isLoadingGoogleBtn = false;
    }
  }
}
