import { Component, inject } from '@angular/core';
import { Reserva } from '../interfaces/interfaces';
import { ApiService } from '../api.service';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-list-reservas',
  standalone: true,
  imports: [CommonModule, FormsModule, ReactiveFormsModule, RouterModule],
  templateUrl: './list-reservas.component.html',
  styleUrl: './list-reservas.component.css'
})
export class ListReservasComponent {
  private readonly service = inject(ApiService);
  public allReservas: Reserva[] = [];

  ngOnInit(): void {
    this.loadBookings();
  }

  loadBookings() {
    this.service.getReservas().subscribe(reservas => {
      this.allReservas = reservas;
    });
  }
}
