import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { City } from './interfaces/interfaces';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  private readonly http: HttpClient = inject(HttpClient);

  constructor() { }

  getCities() : Observable<City[]>{
    return this.http.get<City[]>("https://679b8dc433d31684632448c9.mockapi.io/cities");
  }

}
