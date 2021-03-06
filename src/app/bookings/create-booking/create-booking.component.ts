import { Component, OnInit, Input, ViewChild } from '@angular/core';
import { Place } from 'src/app/places/place.model';
import { ModalController } from '@ionic/angular';
import { FormsModule, NgForm } from '@angular/forms';
import { BookingService } from '../booking.service';

@Component({
  selector: 'app-create-booking',
  templateUrl: './create-booking.component.html',
  styleUrls: ['./create-booking.component.scss'],
})
export class CreateBookingComponent implements OnInit {
  @Input() selectedPlace: Place;
  @Input() selectedMode: 'select' | 'random';
  @ViewChild('f', {static: false}) form: NgForm;
  startDate: string;
  endDate: string;
  errorMessage: string;
  constructor(private modalCtrl: ModalController) { }

  ngOnInit() {
    const availableFrom = new Date(this.selectedPlace.avaliableFrom);
    const availableTo = new Date(this.selectedPlace.avaliableTo);
    if (this.selectedMode === 'random') {
      this.startDate = new Date(availableFrom.getTime() + Math.random()
      * (availableTo.getTime() - 7 * 24 * 60 * 60 * 1000 -
      availableFrom.getTime())).toISOString();
      this.endDate = new Date (new Date(this.startDate).getTime() + Math.random()
      * (new Date(this.startDate).getTime() + 6 * 24 * 60 * 60 * 1000 -
      new Date(this.startDate).getTime())).toISOString();
    }
  }
  // second part is roles can be anything we want
  onBookPlace() {
    if (!this.form.valid || !this.datesValid()) {
      return this.errorMessage =  'gidiş gelişden önce olamaz dangalak düzelt!';
    }
    this.modalCtrl.dismiss({bookingData: {
      firstName: this.form.value['first-name'],
      lastName: this.form.value['last-name'],
      guestNumber: +this.form.value['guest-number'],
      startDate: new Date(this.form.value['date-from']),
      endDate: new Date(this.form.value['date-to'])
    }}, 'confirm');
  }
  onCancel() {
    this.modalCtrl.dismiss(null, 'cancel');
  }
  onSubmit(form: NgForm) {
    console.log(form);
  }
  datesValid() {
      const startDate = this.form.value['date-from'];
      const endDate = this.form.value['date-to'];

      return endDate > startDate ;
  }
}
