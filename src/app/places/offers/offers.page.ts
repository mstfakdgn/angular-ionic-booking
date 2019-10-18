import { Component, OnInit, OnDestroy, Input } from '@angular/core';
import { OffersService } from '../offers.service';
import { Offer } from '../offer.model';
import { IonItemSliding, LoadingController } from '@ionic/angular';
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
    private loadingCtrl: LoadingController
    ) { }

  ngOnInit() {
    this.offerSub = this.offerService.offers.subscribe(offers => {
      this.loadedOffers = offers;
    });
  }

  ionViewWillEnter() {
    this.loadingCtrl.create({
      message: 'Offers are coming...',
    }).then(loadingEl => {
      loadingEl.present();
      this.offerService.fetchOffers().subscribe(() => {
        loadingEl.dismiss();
      });
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
