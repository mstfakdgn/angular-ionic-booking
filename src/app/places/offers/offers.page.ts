import { Component, OnInit } from '@angular/core';
import { Place } from '../place.model';
import { OffersService } from '../offers.service';

@Component({
  selector: 'app-offers',
  templateUrl: './offers.page.html',
  styleUrls: ['./offers.page.scss'],
})
export class OffersPage implements OnInit {
  loadedOffers: Place[];
  constructor(private offerService: OffersService) { }

  ngOnInit() {
    this.loadedOffers = this.offerService.offers;
  }

}
