import { CommonModule } from '@angular/common';
import { Component, inject, OnInit } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import {
  IonContent,
  IonHeader,
  IonTitle,
  IonToolbar,
  IonBackButton,
  IonItem,
  IonLabel,
  IonInput,
  IonNote,
  IonSelect,
  IonSelectOption,
  IonButton,
} from '@ionic/angular/standalone';
import { ToastController } from '@ionic/angular';

@Component({
  selector: 'app-get-taxi',
  templateUrl: './get-taxi.page.html',
  styleUrls: ['./get-taxi.page.scss'],
  standalone: true,
  imports: [
    IonButton,
    IonNote,
    IonInput,
    IonLabel,
    IonItem,
    IonContent,
    IonHeader,
    IonTitle,
    IonToolbar,
    IonBackButton,
    ReactiveFormsModule,
    CommonModule,
  ],
})
export class GetTaxiPage implements OnInit {
  private _activityRotuer = inject(ActivatedRoute);
  private _fb = inject(FormBuilder);
  private _toast = inject(ToastController);

  taxis = [
    { id: 1, tipo: 'taxi' },
    { id: 2, tipo: 'mototaxi' },
  ];

  form = this._fb.group({
    vehiculo: this._fb.control(this.taxis[0].tipo),
    nombres: this._fb.control('', [Validators.required]),
    mi_ubicaicon: this._fb.control('', [Validators.required]),
    mi_destino: this._fb.control('', [Validators.required]),
    cant_pasajeros: this._fb.control(1, [
      Validators.required,
      Validators.max(4),
      Validators.min(1),
    ]),
  });

  constructor() {
    this._activityRotuer.queryParamMap.subscribe({
      next: (data) => console.log('Query Param ID:', data.get('id')),
    });
  }

  ngOnInit() {}

  async onSubmit() {
    if (this.form.valid) {
      const toast = await this._toast.create({
        message: 'Taxi pedido',
        duration: 1500,
        position: 'middle',
      });

      await toast.present();
      this.form.reset();
      console.log('Datos del formulario:', this.form.value);
    } else {
      console.error('Formulario no válido');
    }
  }
}
