import { Routes } from '@angular/router';
import { CreateReservaComponent } from './create-reserva/create-reserva.component';
import { ListReservasComponent } from './list-reservas/list-reservas.component';

export const routes: Routes = [
    {
        path: '',
        redirectTo: '/create-pasaje',
        pathMatch: 'full'
    },
    { 
        path: 'create-pasaje',
        component: CreateReservaComponent
    },
    { 
        path: 'list-reservas',
        component: ListReservasComponent
    }

];
