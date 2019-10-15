import { Component, OnInit, Input } from '@angular/core';
import { Place } from 'src/app/places/place.model';
import { ModalController } from '@ionic/angular';

@Component({
  selector: 'app-create-booking',
  templateUrl: './create-booking.component.html',
  styleUrls: ['./create-booking.component.scss'],
})
export class CreateBookingComponent implements OnInit {
  @Input() selectedPlace: Place;
  constructor(private modalCtrl: ModalController) { }

  ngOnInit() {}
  // second part is roles can be anything we want
  onBookPlace() {
    this.modalCtrl.dismiss({message: 'Booked'}, 'confirm');
  }
  onCancel() {
    this.modalCtrl.dismiss(null, 'cancel');
  }

}
