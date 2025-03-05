import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { City } from '../interfaces/interfaces';
import { ApiService } from '../api.service';

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
  private readonly service = inject(ApiService);

  ngOnInit(): void {
    this.loadOrigenes();
    this.loadDestinos();
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
}
