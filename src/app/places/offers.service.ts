import { Injectable } from '@angular/core';
import { Offer } from './offer.model';
import { BehaviorSubject } from 'rxjs';
import { take, map, tap, delay } from 'rxjs/operators';
import { AuthService } from '../auth/auth.service';

@Injectable({
  providedIn: 'root'
})
export class OffersService {
  constructor(private authService: AuthService) { }

  private _offers = new BehaviorSubject<Offer[]>([
      // tslint:disable-next-line: max-line-length
      new Offer('p3', 'Alabama', 'In the heart of Teksas', 'https://www.intersinema.com/haber/resimler/201907/25664_8034.jpg', 145.00, new Date('2019-01-01'), new Date('2019-12-31'), 'abc'),
      // tslint:disable-next-line: max-line-length
      new Offer('p1', 'Manhattan Mansion', 'In the heart of new york', 'https://previews.123rf.com/images/prometeus/prometeus1710/prometeus171000688/88190647-close-up-portrait-of-a-zombie-man-covered-with-snow-halloween-horror-film-.jpg', 150.00, new Date('2019-01-01'), new Date('2019-12-31'), 'abc'),
      // tslint:disable-next-line: max-line-length
      new Offer('p2', 'Washington Dc', 'In the heart of washington', 'https://i0.wp.com/www.aramamotoru.com/wp-content/uploads/2017/10/blog-yazilarinda-gorseller-nasil-secilmeli.jpg?fit=1150%2C500&ssl=1', 140.00, new Date('2019-01-01'), new Date('2019-12-31'), 'abc'),
    ]); 

  get offers() {
    return this._offers.asObservable();
  }

  getOffer(id: string) {
    return this.offers.pipe(take(1), map(offer => {
      return {...offer.find(p => p.id === id) };
    }));
  }
  addOffer(title: string, desc: string, price: number, dateFrom: Date, dateTo: Date) {
    const newOffer = new Offer(
      Math.random().toString(),
      title,
      desc,
      'https://image.shutterstock.com/image-photo/amazing-fantastic-background-extraterrestrial-aliens-260nw-718238302.jpg',
      price,
      dateFrom,
      dateTo,
      this.authService.userId
      );
    return this._offers.pipe(take(1), delay(1000), tap(offers => {
      setTimeout(() => {
        this._offers.next(offers.concat(newOffer));
      }, 1000);
    }));
  }
  updateOffer(title: string, desc: string, offerId: string) {
    return this.offers.pipe(take(1), delay(1000), tap(offers => {
      const updatedOfferIndex = offers.findIndex(of => of.id === offerId);
      const updatedOffers = [...offers];
      const oldOffer = updatedOffers[updatedOfferIndex];
      updatedOffers[updatedOfferIndex] = new Offer(
        oldOffer.id,
        title,
        desc,
        oldOffer.imageUrl,
        oldOffer.price,
        oldOffer.avaliableFrom,
        oldOffer.avaliableTo,
        oldOffer.userId
      );
      this._offers.next(updatedOffers);
    }));
  }

}
