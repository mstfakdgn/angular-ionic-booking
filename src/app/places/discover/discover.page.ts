import { Component, OnInit, OnDestroy } from '@angular/core';
import { PlacesService } from '../places.service';
import { Place } from '../place.model';
import { SegmentChangeEventDetail } from '@ionic/core';
import { Subscription } from 'rxjs';
// import { MenuController } from '@ionic/angular';

@Component({
  selector: 'app-discover',
  templateUrl: './discover.page.html',
  styleUrls: ['./discover.page.scss'],
})
export class DiscoverPage implements OnInit, OnDestroy {
  loadedPlaces: Place[];
  listedLoadedPlaces: Place[];
  private placesSub: Subscription;
  private placesSub1: Subscription;

  constructor(
    private placesService: PlacesService,
    // private menuController: MenuController
  ) { }

  ngOnInit() {
    this.placesSub = this.placesService.places.subscribe(places => {
      this.listedLoadedPlaces = places.slice(1);
    });
    this.placesSub1 = this.placesService.places.subscribe(places => {
      this.loadedPlaces = places;
    });
  }
  onFilterUpdate(event: CustomEvent<SegmentChangeEventDetail>) {
    console.log(event.detail);
  }
  // Opens the menu programatically
  // onOpenMenu() {
  //   this.menuController.toggle();
  // }
  ngOnDestroy() {
    if (this.placesSub) {
      this.placesSub.unsubscribe();
    }
    if (this.placesSub1) {
      this.placesSub1.unsubscribe();
    }
  }
}
