import { Injectable } from '@angular/core';
import { Offer } from './offer.model';

@Injectable({
  providedIn: 'root'
})
export class OffersService {
  private _offers: Offer[] = [
    // tslint:disable-next-line: max-line-length
    new Offer('p3', 'Alabama', 'In the heart of Teksas', 'https://www.intersinema.com/haber/resimler/201907/25664_8034.jpg', 145.00),
    // tslint:disable-next-line: max-line-length
    new Offer('p1', 'Manhattan Mansion', 'In the heart of new york', 'https://previews.123rf.com/images/prometeus/prometeus1710/prometeus171000688/88190647-close-up-portrait-of-a-zombie-man-covered-with-snow-halloween-horror-film-.jpg', 150.00),
    // tslint:disable-next-line: max-line-length
    new Offer('p2', 'Washington Dc', 'In the heart of washington', 'https://i0.wp.com/www.aramamotoru.com/wp-content/uploads/2017/10/blog-yazilarinda-gorseller-nasil-secilmeli.jpg?fit=1150%2C500&ssl=1', 140.00),
  ];

  get offers() {
    return [...this._offers];
  }

  getOffer(id: string) {
    return {...this._offers.find(p => p.id === id) };
  }

  constructor() { }
}
