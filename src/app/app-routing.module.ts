import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { AuthGuard } from './auth.guard';

import { HomeComponent } from './home/home.component';
import { ProfileComponent } from './profile/profile.component';
import { WalletComponent } from './wallet/wallet.component';
import { PageNotFoundComponent } from './pagenotfound/pagenotfound.component';

const routes: Routes = [
  {
      path: '',
      component: HomeComponent,
      // canActivate: [AuthGuard]
  },
  {
      path: 'index.html',
      component: HomeComponent,
      // canActivate: [AuthGuard]
  },
  {
      path: 'home',
      component: HomeComponent,
      // canActivate: [AuthGuard]
  },
  {
      path: 'profile',
      component: ProfileComponent,
      // canActivate: [AuthGuard]
  },
  {
      path: 'wallet',
      component: WalletComponent,
      // canActivate: [AuthGuard]
  },
  {
      path: '**',
      component: PageNotFoundComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
