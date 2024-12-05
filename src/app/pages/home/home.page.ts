import { Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import {
  IonContent,
  IonHeader,
  IonTitle,
  IonToolbar,
  IonCard,
  IonCardTitle,
  IonCardContent,
  IonCardHeader,
  IonButton,
} from '@ionic/angular/standalone';
import { Router } from '@angular/router';
import { Auth, User } from '@angular/fire/auth';
import { AuthService } from 'src/app/shared/services/auth.service';
import { ToastController } from '@ionic/angular';

@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
  standalone: true,
  imports: [
    IonButton,
    IonContent,
    IonHeader,
    IonTitle,
    IonCard,
    IonCard,
    IonToolbar,
    CommonModule,
    FormsModule,
    IonCardTitle,
    IonCardContent,
  ],
})
export class HomePage implements OnInit {
  private _router = inject(Router);
  private _authService = inject(AuthService);

  private _toast = inject(ToastController);

  user: User | null = null;

  ngOnInit(): void {
    this._authService.authState$.subscribe({
      next: (data) => {
        console.log(data);
        this.user = data as User;
      },
      error: (error) => {
        console.log(error);
      },
    });
  }

  taxis = [
    {
      id: 1,
      tipo: 'taxi',
    },
    {
      id: 2,
      tipo: 'mototaxi',
    },
  ];

  constructor() {}

  pushRotuer(router: string) {
    const idTransporte =
      router === 'get-taxi' ? this.taxis[0].id : this.taxis[1].id;

    this._router.navigate([`/${router}`], {
      queryParams: {
        id: idTransporte,
      },
    });
  }

  pushLogin() {
    this._router.navigateByUrl('/login');
  }

  async cerrarSesion() {
    this._authService.cerrarSesion();

    const toast = await this._toast.create({
      message: 'Cerraste sesión',
      color: 'danger',
      duration: 1500,
      position: 'middle',
    });

    await toast.present();
    this._router.navigateByUrl('/home');
  }
}
