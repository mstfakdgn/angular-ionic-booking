import { Injectable } from '@angular/core';
import { Booking } from './booking.model';
import { BehaviorSubject } from 'rxjs';
import { AuthService } from '../auth/auth.service';
import { take, tap, delay, concat, switchMap, map } from 'rxjs/operators';
import { HttpClient } from '@angular/common/http';

interface FetchedBooking {
  bookedFrom: Date;
  bookedTo: Date;
  firstName: string;
  guestNumber: number;
  lastName: string;
  placeId: string;
  placeImage: string;
  placeTitle: string;
  userId: string;

}

@Injectable({
  providedIn: 'root'
})
export class BookingService {
  private _bookings = new BehaviorSubject<Booking[]>([]);

  constructor(
    private authService: AuthService,
    private http: HttpClient,
  ) {

  }

  get bookings() {
    return this._bookings.asObservable();
  }

  fetchBookings() {
    return this.http.get<{[key: string]: FetchedBooking}>('https://ionic-angular-978a3.firebaseio.com/booked.json')
      .pipe(map(resData => {
        const bookedPlaces = [];
        for (const key in resData) {
          if (resData.hasOwnProperty(key)) {
            console.log(resData[key]);
            bookedPlaces.push(
              new Booking(
                key,
                resData[key].placeId,
                resData[key].userId,
                resData[key].placeTitle,
                resData[key].placeImage,
                resData[key].firstName,
                resData[key].lastName,
                resData[key].guestNumber,
                resData[key].bookedFrom,
                resData[key].bookedTo,
              )
            );
          }
        }
        return bookedPlaces;
      }),
      tap(bookedPlaces => {
        this._bookings.next(bookedPlaces);
      })
      );
  }

  addBooking(
    placeId: string,
    placetitle: string,
    placeImage: string,
    firstName: string,
    lastName: string,
    guestNumber: number,
    dateFrom: Date,
    dateTo: Date,
  ) {
    let generatedId: string;
    const newBooking = new Booking(
      Math.random().toString(),
      placeId,
      this.authService.userId,
      placetitle,
      placeImage,
      firstName,
      lastName,
      guestNumber,
      dateFrom,
      dateTo
    );
    return this.http
      .post('https://ionic-angular-978a3.firebaseio.com/booked.json', {...newBooking, id: null })
      .pipe(
        switchMap(resData => {
          generatedId = resData.name;
          return this.bookings;
        }),
      take(1),
      tap(booked => {
        newBooking.id = generatedId;
        this._bookings.next(booked.concat(newBooking));
      })
      );
    // return this.bookings.pipe(take(1), delay(1000), tap(bookings => {
    //   this._bookings.next(bookings.concat(newBooking));
    // }));
  }

  cancelBookings(bookingId: string) {
    return this.bookings.pipe(take(1), delay(1000), tap(bookings => {
      this._bookings.next(bookings.filter(b => b.id !== bookingId));
    }));
  }
}
