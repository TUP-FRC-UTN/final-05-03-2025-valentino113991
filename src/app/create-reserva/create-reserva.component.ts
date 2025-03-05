import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { AbstractControl, AsyncValidatorFn, FormArray, FormControl, FormGroup, FormsModule, ReactiveFormsModule, ValidationErrors, Validators } from '@angular/forms';
import { City, Passenger, Reserva, ServiceModel } from '../interfaces/interfaces';
import { ApiService } from '../api.service';
import { catchError, map, Observable, of, tap } from 'rxjs';

@Component({
  selector: 'app-create-reserva',
  standalone: true,
  imports: [CommonModule, FormsModule, ReactiveFormsModule],
  templateUrl: './create-reserva.component.html',
  styleUrl: './create-reserva.component.css'
})
export class CreateReservaComponent {
  origenesSelect: City[] = [];
  destinosSelect: City[] = [];
  servicesSelect: ServiceModel[] = [];
  servicesFiltrados: ServiceModel[] = [];
  formReactivoPrimero: FormGroup;
  formReactivoSegundo: FormGroup;
  private readonly service = inject(ApiService);

  constructor() {
    this.formReactivoPrimero = new FormGroup({
      campoOrigenId: new FormControl('', [Validators.required]),
      campoDestinoId: new FormControl('', [Validators.required]),
      campoFechaIda: new FormControl('', [Validators.required])
    });

    this.formReactivoSegundo = new FormGroup({
      serviceId: new FormControl('', [Validators.required]),
      documento: new FormControl('', [Validators.required, Validators.minLength(6)], [this.verificarDni()]),
      nombre: new FormControl('', [Validators.required, Validators.minLength(2)]),
      apellido: new FormControl('', [Validators.required, Validators.minLength(2)]),
      pasajeros: new FormArray([], [Validators.required])
    });
    
  }

  verificarDni(): AsyncValidatorFn {
    return (control: AbstractControl): Observable<ValidationErrors | null> => {
      const documento = control.value;
      const serviceId = this.formReactivoSegundo.get('serviceId')?.value; 

 
      if (!documento || !serviceId) {
        return of(null);
      }


      return this.service.getReservas().pipe(
        map((reservas: Reserva[]) => {
          const reservaExistente = reservas.some(
            (reserva) => reserva.document === documento && reserva.service === serviceId
          );
          return reservaExistente ? { documentoReservado: true } : null; 
        }),
        catchError(() => of(null)) 
      );
    };
  }



  pasajerosArray(): FormArray {
    return this.formReactivoSegundo.get("pasajeros") as FormArray;
  }

  addPasajero() {
    const p = new FormGroup({
      document: new FormControl('', [Validators.required, Validators.minLength(6)]),
      firstName: new FormControl('', [Validators.required, Validators.minLength(2)]),
      lastName: new FormControl('', [Validators.required, Validators.minLength(2)])
    });
    this.pasajerosArray().push(p);
  }

  removePasajero(i: number) {
    this.pasajerosArray().removeAt(i);
  }

  ngOnInit(): void {
    this.loadOrigenes();
    this.loadDestinos();
  }

  loadServices(){
    this.service.getServices().subscribe({
      next: (data: ServiceModel[]) => {
        this.servicesSelect = data;
      },
      error: (err) => {
        console.error('Error:', err);
      }
    });
  }

  loadOrigenes(){
    this.service.getCities().subscribe({
      next: (data: City[]) => {
        this.origenesSelect = data;
      },
      error: (err) => {
        console.error('Error:', err);
      }
    });
  }

  loadDestinos(){
    this.service.getCities().subscribe({
      next: (data: City[]) => {
        this.destinosSelect = data;
      },
      error: (err) => {
        console.error('Error:', err);
      }
    });
  }

  onSubmitFormPrimero() {
    const fechaIda = this.formReactivoPrimero.get('campoFechaIda')?.value || '';

    this.service.getWithDepartureDate(fechaIda).subscribe({
      next: (data: ServiceModel[]) => {
        this.servicesFiltrados = data;
      },
      error: (err) => {
        console.error('Error:', err);
      }
    });

  }

  get isFormInvalid(): boolean {
    return this.formReactivoPrimero.invalid;
  }

  onSubmitFormSegundo(){

    //array de pasajeros
    const pasajerosPost: Passenger[] = [];
    for (let i = 0; i < this.pasajerosArray().length; i++) {
      const pPost: Passenger = {
        document: this.pasajerosArray().at(i).get('document')?.value,
        firstname: this.pasajerosArray().at(i).get('firstname')?.value,
        lastname: this.pasajerosArray().at(i).get('lastname')?.value,
      }
      pasajerosPost.push(pPost);
    }

    //order
    const reservaPost: Reserva = {
      document: this.formReactivoSegundo.get('documento')?.value || '',
      firstName: this.formReactivoSegundo.get('nombre')?.value || '',
      lastName: this.formReactivoSegundo.get('apellido')?.value || '',
      service: this.formReactivoSegundo.get('serviceId')?.value || '',
      reservationCode: 'a-realizar',
      passengers: pasajerosPost
    }

    this.service.postReserva(reservaPost).subscribe({
      next: (response) => {
        alert('booking saved succesfully!!!');
      },
      error: (error) => {
        console.error('Error:', error);
      }
    });
  }
}
