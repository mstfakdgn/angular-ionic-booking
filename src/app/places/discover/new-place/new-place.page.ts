import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { LoadingController } from '@ionic/angular';
import { PlacesService } from '../../places.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-new-place',
  templateUrl: './new-place.page.html',
  styleUrls: ['./new-place.page.scss'],
})
export class NewPlacePage implements OnInit {
  form: FormGroup;
  constructor(
    private loadingCrl: LoadingController,
    private placeService: PlacesService,
    private router: Router,
    ) { }

  ngOnInit() {
    this.form = new FormGroup({
      title : new FormControl(null, {
        updateOn: 'blur',
        validators: [Validators.required]
      }),
      description : new FormControl(null, {
        updateOn: 'blur',
        validators: [Validators.required, Validators.maxLength(180)]
      }),
      price : new FormControl(null, {
        updateOn: 'blur',
        validators: [Validators.required, Validators.min(1)]
      }),
      dateFrom : new FormControl(null, {
        updateOn: 'blur',
        validators: [Validators.required]
      }),
      dateTo : new FormControl(null, {
        updateOn: 'blur',
        validators: [Validators.required]
      }),
    });
  }

  onCreatePlace() {
    if (!this.form.valid) {
      return;
    }
    this.loadingCrl.create({
      message: 'Creating Place',
    }).then(loadingEl => {
      loadingEl.present();
      this.placeService.addPlace(
        this.form.value.title,
        this.form.value.description,
        +this.form.value.price,
        new Date(this.form.value.dateFrom),
        new Date(this.form.value.dateTo),
      ).subscribe(() => {
        this.loadingCrl.dismiss();
        this.form.reset();
        this.router.navigate(['/places/tabs/discover']);
      });
    });
  }

}
