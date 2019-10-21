import { Component, OnInit, OnDestroy } from '@angular/core';
import { BookingService } from './booking.service';
import { Booking } from './booking.model';
import { IonItemSliding, LoadingController } from '@ionic/angular';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-bookings',
  templateUrl: './bookings.page.html',
  styleUrls: ['./bookings.page.scss'],
})
export class BookingsPage implements OnInit, OnDestroy {
 loadedBookings: Booking[];
 private bookingSub: Subscription;

  constructor(
    private bookingService: BookingService,
    private loadingCtrl: LoadingController
    ) { }

  ngOnInit() {
    this.bookingSub = this.bookingService.bookings.subscribe(bookings => {
      this.loadedBookings = bookings;
    });
  }

  ionViewWillEnter() {
    this.loadingCtrl.create({
      message: 'Getting Booked Places...',
    }).then(loadingEl => {
      loadingEl.present();
      this.bookingService.fetchBookings().subscribe(() => {
        loadingEl.dismiss();
      });
    });
  }

  onCancelBooking(bookingId: string, sliding: IonItemSliding) {
    sliding.close();
    this.loadingCtrl.create({
      message: 'Booking is canceling!!!',
    }).then(loadingEl => {
      loadingEl.present();
      this.bookingService.cancelBookings(bookingId).subscribe(() => {
        loadingEl.dismiss();
      });
    });
  }

  ngOnDestroy() {
    if (this.bookingSub) {
      this.bookingSub.unsubscribe();
    }
  }

}
