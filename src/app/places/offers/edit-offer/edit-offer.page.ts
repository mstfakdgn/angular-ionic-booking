import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { OffersService } from '../../offers.service';
import { NavController, LoadingController } from '@ionic/angular';
import { Offer } from '../../offer.model';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Subscription, of } from 'rxjs';

@Component({
  selector: 'app-edit-offer',
  templateUrl: './edit-offer.page.html',
  styleUrls: ['./edit-offer.page.scss'],
})
export class EditOfferPage implements OnInit, OnDestroy {
  offer: Offer;
  form: FormGroup;
  offerSub: Subscription;

  constructor(
    private route: ActivatedRoute,
    private offerService: OffersService,
    private navCtrl: NavController,
    private router: Router,
    private loadingCtrl: LoadingController,
    ) { }

  ngOnInit() {
    this.route.paramMap.subscribe(paramMap => {
      if (!paramMap.has('placeId')) {
        this.navCtrl.navigateBack('/places/tabs/offers');
        return;
      }
      this.offerSub = this.offerService.getOffer(paramMap.get('placeId')).subscribe(offer => {
        this.offer = offer;
      });
      this.form = new FormGroup({
        title: new FormControl(this.offer.title, {
          updateOn: 'blur',
          validators: [Validators.required]
        }),
        description: new FormControl(this.offer.description, {
          updateOn: 'blur',
          validators: [Validators.required, Validators.maxLength(180)]
        }),
      });
    });

  }

  onEditOffer() {
    if (!this.form.valid) {
      return;
    }
    this.loadingCtrl.create({
      message: 'Updating place...'
    }).then(loadingEl => {
      loadingEl.present();
      this.offerService.updateOffer(this.form.value.title, this.form.value.description, this.offer.id).subscribe(() => {
        loadingEl.dismiss();
        this.form.reset();
        this.router.navigate(['/places/tabs/offers']);
    });

    });
  }

  ngOnDestroy() {
    if (this.offerSub) {
      this.offerSub.unsubscribe();
    }
  }
}
