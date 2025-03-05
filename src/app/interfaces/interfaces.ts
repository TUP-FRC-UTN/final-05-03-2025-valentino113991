export interface City {
    city: string;
    id: string;
  }
  
  export interface ServiceModel {
    id: string;
    origin: string;
    destination: string;
    departureDate: string;
    departureTime: string;
    arrivalDate: string;
    arrivalTime: string;
  }

  export interface Passenger {
    document: string;
    firstname: string;
    lastname: string;
  }

  export interface Reserva {
    document: string;
    firstName: string;
    lastName: string;
    service: string; 
    reservationCode: string;
    passengers: Passenger[];
  }
  
  
  