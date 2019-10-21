import { Component, OnInit, OnDestroy } from '@angular/core';
import { Place } from '../../place.model';
import { ActivatedRoute, Router } from '@angular/router';
import { NavController, LoadingController } from '@ionic/angular';
import { Subscription } from 'rxjs';
import { OffersService } from '../../offers.service';

@Component({
  selector: 'app-offer-bookings',
  templateUrl: './offer-bookings.page.html',
  styleUrls: ['./offer-bookings.page.scss'],
})
export class OfferBookingsPage implements OnInit, OnDestroy {
  place: Place;
  private placeSub: Subscription;
  isLoading = false;

  constructor(
    private route: ActivatedRoute,
    private navCtrl: NavController,
    private offerService: OffersService,
    private loadingCtrl: LoadingController,
    private router: Router
    ) { }

  ngOnInit() {
    this.route.paramMap.subscribe(paramMap => {
      if (!paramMap.has('placeId')) {
        this.navCtrl.navigateBack('/places/tabs/offers');
        return;
      }
      this.isLoading = true;
      this.offerService.getOffer(paramMap.get('placeId')).subscribe(place => {
        this.place = place;
        this.isLoading = false;
      });
    });
  }

  ngOnDestroy() {
    if (this.placeSub) {
      this.placeSub.unsubscribe() ;
    }
  }

  onDeleteOffer(offerId: string) {
    this.loadingCtrl.create({
      message: 'Offer is being Deleted!!!',
    }).then(loadingEl => {
      loadingEl.present();
      this.offerService.deleteOffer(offerId).subscribe(() => {
        loadingEl.dismiss();
        this.router.navigate(['/places/tabs/offers']);
      });
    });
  }

}
