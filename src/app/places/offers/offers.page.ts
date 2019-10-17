import { Component, OnInit, OnDestroy } from '@angular/core';
import { OffersService } from '../offers.service';
import { Offer } from '../offer.model';
import { IonItemSliding } from '@ionic/angular';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-offers',
  templateUrl: './offers.page.html',
  styleUrls: ['./offers.page.scss'],
})
export class OffersPage implements OnInit, OnDestroy {
  loadedOffers: Offer[];
  offerSub: Subscription;
  constructor(
    private offerService: OffersService,
    private route: Router,
    ) { }

  ngOnInit() {
    this.offerSub = this.offerService.offers.subscribe(offers => {
      this.loadedOffers = offers;
    });
  }

  onEdit(offerId: string, slidingItem: IonItemSliding) {
    slidingItem.close();
    console.log('closed');
    this.route.navigate(['/', 'places', 'tabs', 'offers', 'edit', offerId]);
  }
  ngOnDestroy() {
    if (this.offerSub) {
      this.offerSub.unsubscribe();
    }
  }

}
