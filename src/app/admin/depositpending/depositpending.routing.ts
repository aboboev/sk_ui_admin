import {Routes, RouterModule} from '@angular/router';
import {AuthLayoutComponent} from "../../layouts/auth/auth-layout.component";
import {ComingSoonComponent} from "../../shared/components/coming/coming.component";
import {DepositPendingComponent} from "./depositpending.component";
import {DepositPendingTLComponent } from "./userstl/pendingtl.component";
import {DepositPendingUSDComponent} from "./usersusd/pendingusd.component";
import {DepositPendingEUROComponent} from "./userseuro/pendingeuro.component";

export const DepositPendingRoutes: Routes = [
    {
        path: '',
        component: DepositPendingComponent,
        children: [
            {
                path: '',
                redirectTo: 'tl'
            },
            {
                path: 'tl',
                component: DepositPendingTLComponent ,
            },
            {
                path: 'usd',
                component: DepositPendingUSDComponent,
            },
            {
                path: 'euro',
                component: DepositPendingEUROComponent,
            },
        ]
    }
];
