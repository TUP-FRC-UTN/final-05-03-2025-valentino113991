import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { City, Reserva, ServiceModel } from './interfaces/interfaces';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  private readonly http: HttpClient = inject(HttpClient);

  constructor() { }

  getCities() : Observable<City[]>{
    return this.http.get<City[]>("https://679b8dc433d31684632448c9.mockapi.io/cities");
  }

  getServices() : Observable<ServiceModel[]>{
    return this.http.get<ServiceModel[]>("https://679b8dc433d31684632448c9.mockapi.io/services");
  }

  getWithDepartureDate(fecha: any) : Observable<ServiceModel[]>{
    return this.http.get<ServiceModel[]>("https://679b8dc433d31684632448c9.mockapi.io/services?departureDate=" + fecha);
  }

  postReserva(reserva: Reserva) : Observable<Reserva>{
    return this.http.post<Reserva>("https://671fe287e7a5792f052fdf93.mockapi.io/reservations", reserva);
  }

  getReservas() : Observable<Reserva[]>{
    return this.http.get<Reserva[]>("https://671fe287e7a5792f052fdf93.mockapi.io/reservations");
  }
}
