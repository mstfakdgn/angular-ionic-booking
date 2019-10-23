import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './auth/auth.guard';
import { DatePipe } from '@angular/common';
import { DataResolverService } from './resolver/data-resolver.service';

const routes: Routes = [
  { path: '', redirectTo: 'places', pathMatch: 'full' },
  { path: 'home', loadChildren: () => import('./home/home.module').then( m => m.HomePageModule)},
  { path: 'auth', loadChildren: './auth/auth.module#AuthPageModule' },
  { path: 'places', loadChildren: './places/places.module#PlacesPageModule', canLoad: [AuthGuard] },
  { path: 'bookings', loadChildren: './bookings/bookings.module#BookingsPageModule', canLoad: [AuthGuard] },
  { path: 'material', loadChildren: './material/material/material.module#MaterialPageModule', canLoad: [AuthGuard]},
  {
    path: 'material/:id',
    resolve: {
      information: DataResolverService
    },
    loadChildren: './sent/sent/sent.module#SentPageModule',
  },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule],
  providers: [DatePipe]
})
export class AppRoutingModule { }
