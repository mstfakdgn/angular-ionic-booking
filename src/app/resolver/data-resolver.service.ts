import { Injectable } from '@angular/core';
import { ServiceService } from '../services/service.service';
import { ActivatedRouteSnapshot, Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class DataResolverService {

  constructor(private dataService: ServiceService) { }

  resolve(route: ActivatedRouteSnapshot) {
    const id = route.paramMap.get('id');
    return this.dataService.getData(id);
  }
}
