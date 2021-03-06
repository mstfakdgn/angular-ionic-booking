import { Injectable } from '@angular/core';
import { Place } from './place.model';
import { AuthService } from '../auth/auth.service';
import { BehaviorSubject } from 'rxjs';
import { take, map, tap, switchMap } from 'rxjs/operators';
import { HttpClient } from '@angular/common/http';

interface FetchedData {
  avaliableFrom: string;
  avaliableTo: string;
  description: string;
  imageUrl: string;
  price: number;
  title: string;
  userId: string;
}

@Injectable({
  providedIn: 'root'
})
export class PlacesService {
  private _places = new BehaviorSubject<Place[]>([]);
  constructor(private authService: AuthService, private http: HttpClient) { }

  get places() {
    return this._places.asObservable();
  }
  getPlace(id: string) {
    // return this.places.pipe(take(1), map(places => {
    //   return {...places.find(p => p.id === id) };
    // }));
    return this.http
    .get<FetchedData>(`https://ionic-angular-978a3.firebaseio.com/offered-places2/${id}.json`)
    .pipe(
      map(placeData => {
        // console.log(new Date(placeData.avaliableFrom));
        return new Place(
          id,
          placeData.title,
          placeData.description,
          placeData.imageUrl,
          placeData.price,
          new Date(placeData.avaliableFrom),
          new Date(placeData.avaliableTo),
          placeData.userId
        );
      })
    );
  }

  fetchPlaces() {
    return this.http.get<{[key: string]: FetchedData}>('https://ionic-angular-978a3.firebaseio.com/offered-places2.json')
    .pipe(map(resData => {
      const places = [];
      for (const key in resData ) {
        if (resData.hasOwnProperty(key)) {
          places.push(
            new Place(
              key, resData[key].title,
              resData[key].description,
              resData[key].imageUrl,
              resData[key].price,
              new Date(resData[key].avaliableFrom),
              new Date(resData[key].avaliableFrom),
              resData[key].userId
            )
          );
        }
      }
      return places;
    }),
    tap(places => {
      this._places.next(places);
    })
    );
  }

  addPlace( title: string, desc: string, price: number, dateFrom: Date, dateTo: Date ) {
    let generatedId: string;
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
    return this.http
      .post('https://ionic-angular-978a3.firebaseio.com/offered-places2.json', {...newPlace, id: null })
      .pipe(
        switchMap(resData => {
          // generatedId = resData.name;
          return this.places;
        }),
        take(1),
        tap(places => {
          newPlace.id = generatedId;
          this._places.next(places.concat(newPlace));
        })
      );
    // return this._places.pipe(take(1), tap(places => {
    //   setTimeout(() => {
    //     this._places.next(places.concat(newPlace));
    //   }, 1000);
    // }));
      // console.log(this._places);
  }
  updatePlace(title: string, desc: string, placeId: string) {
    let updatedPlaces: Place[];
    return this.places.pipe(
      take(1), switchMap(places => {
        const updatedPlaceIndex = places.findIndex(pl => pl.id === placeId);
        updatedPlaces = [...places];
        const oldPlace = updatedPlaces[updatedPlaceIndex];
        updatedPlaces[updatedPlaceIndex] = new Place(
          oldPlace.id,
          title,
          desc,
          oldPlace.imageUrl,
          oldPlace.price,
          oldPlace.avaliableFrom,
          oldPlace.avaliableTo,
          oldPlace.userId
        );
        return this.http.put(
          `https://ionic-angular-978a3.firebaseio.com/offered-places2/${placeId}.json`,
          {...updatedPlaces[updatedPlaceIndex], id: null}
        );
      }), tap(() => {
        this._places.next(updatedPlaces);
      }));
  }

  deletePlace(id: string) {
    return this.http
    .delete(`https://ionic-angular-978a3.firebaseio.com/offered-places2/${id}.json`)
    .pipe(switchMap(() => {
      return this.places;
    }),
    take(1),
    tap(places => {
      this._places.next(places.filter(b => b.id !== id));
    }));
  }
}
