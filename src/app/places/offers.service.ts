import { Injectable } from '@angular/core';
import { Offer } from './offer.model';
import { BehaviorSubject } from 'rxjs';
import { take, map, tap, delay, switchMap, isEmpty } from 'rxjs/operators';
import { AuthService } from '../auth/auth.service';
import { HttpClient } from '@angular/common/http';
import { Place } from './place.model';

interface FetchedData {
  availableFrom: string;
  availableTo: string;
  description: string;
  imageUrl: string;
  price: number;
  title: string;
  userId: string;
}

@Injectable({
  providedIn: 'root'
})
export class OffersService {
  constructor(private authService: AuthService, private http: HttpClient) { }

  private _offers = new BehaviorSubject<Offer[]>([]);

  get offers() {
    return this._offers.asObservable();
  }

  fetchOffers() {
    return this.http.get<{[key: string]: FetchedData}>('https://ionic-angular-978a3.firebaseio.com/offered-places.json')
    .pipe(map(resData => {
      const offers = [];
      for (const key in resData) {
        if (resData.hasOwnProperty(key)) {
          offers.push(
            new Offer(
              key, resData[key].title,
              resData[key].description,
              resData[key].imageUrl,
              resData[key].price,
              new Date(resData[key].availableFrom),
              new Date(resData[key].availableTo),
              resData[key].userId
            )
          );
        }
      }
      return offers;
    }),
    tap(offers => {
      this._offers.next(offers);
    })
    );
  }

  getOffer(id: string) {
    return this.offers.pipe(take(1), map(offer => {
      return {...offer.find(p => p.id === id) };
    }));
  }
  addOffer(title: string, desc: string, price: number, dateFrom: Date, dateTo: Date) {
    let generatedId: string;
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
    return this.http
      .post<{ name: string }>('https://ionic-angular-978a3.firebaseio.com/offered-places.json', {...newOffer, id: null })
      .pipe(
        switchMap(resData => {
          generatedId = resData.name;
          return this.offers;
        }),
        take(1),
        tap(offers => {
          newOffer.id = generatedId;
          this._offers.next(offers.concat(newOffer));
        })
      );
    // return this._offers.pipe(take(1), delay(1000), tap(offers => {
    //   setTimeout(() => {
    //     this._offers.next(offers.concat(newOffer));
    //   }, 1000);
    // }));
  }
  updateOffer(title: string, desc: string, offerId: string) {
    let updatedOffers: Place[];
    return this.offers.pipe(
      take(1), switchMap(offers => {
        const updatedOfferIndex = offers.findIndex(of => of.id === offerId);
        updatedOffers = [...offers];
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
        return this.http.put(
          `https://ionic-angular-978a3.firebaseio.com/offered-places/${offerId}.json`,
          {...updatedOffers[updatedOfferIndex], id: null}
        );
      }), tap(() => {
        this._offers.next(updatedOffers);
      }));
    // return this.offers.pipe(take(1), tap(offers => {
    //   const updatedOfferIndex = offers.findIndex(of => of.id === offerId);
    //   const updatedOffers = [...offers];
    //   const oldOffer = updatedOffers[updatedOfferIndex];
    //   updatedOffers[updatedOfferIndex] = new Offer(
    //     oldOffer.id,
    //     title,
    //     desc,
    //     oldOffer.imageUrl,
    //     oldOffer.price,
    //     oldOffer.avaliableFrom,
    //     oldOffer.avaliableTo,
    //     oldOffer.userId
    //   );
    //   this._offers.next(updatedOffers);
    // }));
  }

}
