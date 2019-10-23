import { Component, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource, MatSort, MatPaginator } from '@angular/material';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';
import { CheckboxChangeEventDetail } from '@ionic/core';
import { ServiceService } from 'src/app/services/service.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-material',
  templateUrl: './material.page.html',
  styleUrls: ['./material.page.scss'],
})
export class MaterialPage implements OnInit {
  model: string;
  form: FormGroup;
  checked = false;
  indeterminate = false;
  informations = [] ;
  seasons = ['Winter', 'Summer', 'Autumn', 'Spring'];
  animals = [
    {
      name: 'Dog',
      value: 1
    },
    {
      name: 'Cat',
      value: 2,
    },
    {
      name: 'Cow',
      value: 3
    },
    {
      name: 'Lion',
      value: 4
  }];
  // displayedColumns: string[] = ['first_name', 'last_name', 'title'];
  // dataSource = new MatTableDataSource<any>([
  //   {
  //     first_name: 'Pike',
  //     last_name: 'Msonda',
  //     title: 'peasant'
  //   },
  //   {
  //     first_name: 'Chapurika',
  //     last_name: 'Msonda',
  //     title: 'Lord'
  //   },
  //   {
  //     first_name: 'Mustafa',
  //     last_name: 'Akdoğan',
  //     title: 'King'
  //   }
  // ]);

  // @ViewChild(MatSort) sort: MatSort;
  // @ViewChild(MatPaginator) paginator: MatPaginator;


  // userForm: FormGroup;

  constructor(private fb: FormBuilder, private saveData: ServiceService, private router: Router) { }

  ngOnInit() {
    // this.dataSource.sort = this.sort;
    // this.dataSource.paginator = this.paginator;

    // this.userForm = this.fb.group({
    //   name: ['', Validators.required],
    //   address: ['', Validators.required]
    // });
    this.form = new FormGroup({
      name : new FormControl(null, {
        updateOn: 'blur',
        validators: [Validators.required]
      }),
      desc : new FormControl(null, {
        updateOn: 'blur',
        validators: [Validators.required]
      }),
      seasons : new FormControl(null, {
        updateOn: 'blur',
        validators: [Validators.required]
      }),
      animals : new FormControl(null, {
        updateOn: 'blur',
        validators: [Validators.required]
      }),
      date : new FormControl(null, {
        updateOn: 'blur',
        validators: [Validators.required]
      }),
      checked : new FormControl(null, {
        updateOn: 'blur',
        validators: [Validators.required]
      }),
      indeterminate : new FormControl(null, {
        updateOn: 'blur',
        validators: [Validators.required]
      }),
    });
  }


  onSubmit() {
    // console.log(
    //   this.form.value.name,
    //   this.form.value.desc,
    //   this.form.value.seasons,
    //   this.form.value.animals,
    //   this.form.value.date,
    //   this.form.value.checked,
    //   this.form.value.indeterminate
    // );
    this.informations.push(
      this.form.value.name,
      this.form.value.desc,
      this.form.value.seasons,
      this.form.value.animals,
      new Date(this.form.value.date),
      this.form.value.checked,
      this.form.value.indeterminate
      );
    this.saveData.setData(42, this.informations);

    this.router.navigateByUrl('/material/42');
  }
}
