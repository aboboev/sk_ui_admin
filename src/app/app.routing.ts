import { Routes } from '@angular/router';
import {SignupComponent} from "./signup/signup.component";
import {AuthGuard} from "./services/authguard.service";
import {ResetPasswordComponent} from "./reset_password/reset_password.component";
import {ResetPasswordResolver} from "./reset_password/reset_password-resolver.service";
import {HomeComponent} from "./home/home.component";
import {BuycoinComponent} from "./footer/buycoin/buycoin.component";
import {OverviewComponent} from "./footer/overview/overview.component";
import {SellcoinComponent} from "./footer/sellcoin/sellcoin.component";
import {ContactUsComponent} from "./footer/contact/contact.component";
import {TermComponent} from "./footer/term/term.component";
import {UcretlerComponent} from "./footer/ucretler/ucretler.component";

export const AppRoutes: Routes = [
    {
        path: '', component: HomeComponent
    },
    {
        path: 'panel',
        loadChildren: './admin/admin.module#AdminModule',
        resolve: {
            AuthGuard
        }
    },
    { path: '404', loadChildren: './404/not-found.module#NotFoundModule' },
    { path: '**', redirectTo: '404' }
];
