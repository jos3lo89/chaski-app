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
  IonInput,
  IonList,
  IonButton,
  IonBackButton, IonSpinner } from '@ionic/angular/standalone';
import { AuthService } from 'src/app/shared/services/auth.service';
import { RouterLink } from '@angular/router';
import { ToastController } from '@ionic/angular';

@Component({
  selector: 'app-register',
  templateUrl: './register.page.html',
  styleUrls: ['./register.page.scss'],
  standalone: true,
  imports: [IonSpinner,
    IonBackButton,
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
    RouterLink,
    ReactiveFormsModule,
    CommonModule,
  ],
})
export class RegisterPage implements OnInit {
  private _authService = inject(AuthService);
  private _fb = inject(FormBuilder);
  private _toast = inject(ToastController);
  public form = this._fb.group({
    email: this._fb.control('', [Validators.required, Validators.email]),
    password: this._fb.control('', [Validators.required]),
  });

  isloadingSubmitBtn = false;
  constructor() {}

  ngOnInit() {}

  async registrar() {
    try {
      this.isloadingSubmitBtn = true;

      const { email, password } = this.form.value;

      await this._authService.registrar({
        email,
        password,
      });

      this.form.reset();

      const toast = await this._toast.create({
        message: 'Ya estas registrado',
        duration: 1500,
        position: 'middle',
      });

      await toast.present();
      this.isloadingSubmitBtn = false;
    } catch (error) {
      console.log(error);
      this.isloadingSubmitBtn = false;
    }
  }
}
