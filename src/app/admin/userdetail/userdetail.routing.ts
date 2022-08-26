import {Routes, RouterModule} from '@angular/router';
import {AuthLayoutComponent} from "../../layouts/auth/auth-layout.component";
import {ComingSoonComponent} from "../../shared/components/coming/coming.component";
import {UserDetailComponent} from "./userdetail.component";
import {DetailCoinComponent} from "./detailcoin/detailcoin.component";
import {DetailInfoComponent} from "./detailinfo/detailinfo.component";
import {UserResolver} from "./user-resolver.service";
import {DetailRefComponent} from "./detailref/detailref.component";

export const DetailRoutes: Routes = [
    {
        path: '',
        component: UserDetailComponent,
        children: [
            {
                path: '',
                redirectTo: 'profile'
            },
            {
                path: 'profile',
                component: DetailInfoComponent
            },
            {
                path: 'coin',
                component: DetailCoinComponent,
            },
            {
                path: 'ref',
                component: DetailRefComponent,
            },
        ],
        resolve: {
            user: UserResolver
        }
    }
];
