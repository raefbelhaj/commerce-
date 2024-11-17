import type { Routes } from '@angular/router';
import { SignInComponent } from './modules/core/sign-in/sign-in.component';
import { NotFoundComponent } from './modules/core/not-found/not-found.component';
import { SignUpComponent } from './modules/core/sign-up/sign-up.component';
import { HomeComponent } from './modules/home/home.component';
import { AdminDashboardComponent } from './modules/admin-dashboard/admin-dashboard.component';
import { ShopComponent } from './modules/shop/shop.component';
import { ProductDetailsComponent } from './modules/product-details/product-details.component';
import { UserSpaceComponent } from './modules/core/user-space/user-space.component';

export const routes: Routes = [
    { path: '', redirectTo: '/home', pathMatch: 'full' },
    { path: 'home', component: HomeComponent },
    { path: 'login', component: SignInComponent },
    { path: 'register', component: SignUpComponent },
    { path: 'shop', component: ShopComponent },
    { path: 'product-details/:id', component: ProductDetailsComponent },
    { path: 'dashboard', component: AdminDashboardComponent },
    { path: 'user-space', component: UserSpaceComponent },

    { path: '**', component: NotFoundComponent }

];
