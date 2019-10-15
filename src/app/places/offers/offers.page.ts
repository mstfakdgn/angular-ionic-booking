import { Component, OnInit } from '@angular/core';
import { OffersService } from '../offers.service';
import { Offer } from '../offer.model';
import { IonItemSliding } from '@ionic/angular';
import { Router } from '@angular/router';

@Component({
  selector: 'app-offers',
  templateUrl: './offers.page.html',
  styleUrls: ['./offers.page.scss'],
})
export class OffersPage implements OnInit {
  loadedOffers: Offer[];
  constructor(
    private offerService: OffersService,
    private route: Router,
    ) { }

  ngOnInit() {
    this.loadedOffers = this.offerService.offers;
  }

  onEdit(offerId: string, slidingItem: IonItemSliding) {
    slidingItem.close();
    console.log('closed');
    this.route.navigate(['/', 'places', 'tabs', 'offers', 'edit', offerId]);
  }

}
