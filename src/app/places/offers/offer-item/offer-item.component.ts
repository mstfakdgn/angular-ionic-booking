import { Component, OnInit, Input } from '@angular/core';
import { OffersService } from '../../offers.service';
import { Offer } from '../../offer.model';

@Component({
  selector: 'app-offer-item',
  templateUrl: './offer-item.component.html',
  styleUrls: ['./offer-item.component.scss'],
})
export class OfferItemComponent implements OnInit {
  @Input() loadedOffer: Offer;
  constructor(private offerService: OffersService) { }

  ngOnInit() {}

  getDummyDate() {
    return new Date();
  }

}
