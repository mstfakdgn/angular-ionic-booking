import { Injectable } from '@angular/core';
import { Place } from './place.model';
import { AuthService } from '../auth/auth.service';
import { BehaviorSubject } from 'rxjs';
import { take, map, tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class PlacesService {
  private _places = new BehaviorSubject<Place[]>([
    // tslint:disable-next-line: max-line-length
    new Place('p1', 'Manhattan Mansion', 'In the heart of new york', 'https://previews.123rf.com/images/prometeus/prometeus1710/prometeus171000688/88190647-close-up-portrait-of-a-zombie-man-covered-with-snow-halloween-horror-film-.jpg', 150.00, new Date('2019-01-01'), new Date('2019-12-31'), 'abc'),
    // tslint:disable-next-line: max-line-length
    new Place('p2', 'Washington Dc', 'In the heart of washington', 'https://i0.wp.com/www.aramamotoru.com/wp-content/uploads/2017/10/blog-yazilarinda-gorseller-nasil-secilmeli.jpg?fit=1150%2C500&ssl=1', 140.00, new Date('2019-01-01'), new Date('2019-12-31'), 'abc'),
    // tslint:disable-next-line: max-line-length
    new Place('p3', 'Alabama', 'In the heart of Teksas', 'https://www.intersinema.com/haber/resimler/201907/25664_8034.jpg', 145.00, new Date('2019-01-01'), new Date('2019-12-31'), 'abc'),
    // tslint:disable-next-line: max-line-length
    new Place('p4', 'Another User', 'Another User', 'https://www.intersinema.com/haber/resimler/201907/25664_8034.jpg', 145.00, new Date('2019-01-01'), new Date('2019-12-31'), 'hjk'),
    // tslint:disable-next-line: max-line-length
    new Place('p5', 'Another User', 'Another User', 'https://www.intersinema.com/haber/resimler/201907/25664_8034.jpg', 145.00, new Date('2019-01-01'), new Date('2019-12-31'), 'işl'),
  ]);
  constructor(private authService: AuthService) { }

  get places() {
    return this._places.asObservable();
  }
  getPlace(id: string) {
    return this.places.pipe(take(1), map(places => {
      return {...places.find(p => p.id === id) };
    }));
  }

  addPlace( title: string, desc: string, price: number, dateFrom: Date, dateTo: Date ) {
    const newPlace = new Place(
      Math.random().toString(),
      title,
      desc,
      'https://image.shutterstock.com/image-photo/amazing-fantastic-background-extraterrestrial-aliens-260nw-718238302.jpg',
      price,
      dateFrom,
      dateTo,
      this.authService.userId
      );
    return this._places.pipe(take(1), tap(places => {
      setTimeout(() => {
        this._places.next(places.concat(newPlace));
      }, 1000);
    }));
      // console.log(this._places);
  }
}
