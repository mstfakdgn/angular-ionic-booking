import { Injectable } from '@angular/core';
import { Booking } from './booking.model';

@Injectable({
  providedIn: 'root'
})
export class BookingService {
  private _bookings: Booking[] = [
    {
      id: '123',
      placeId: 'p1',
      placeTitle: 'Manhattan',
      guestNumber: 3,
      userId: 'abc'
    }
  ];

  get bookings() {
    return [...this._bookings];
  }
}
