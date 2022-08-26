import {Routes, RouterModule} from '@angular/router';
import {UsersComponent} from "./users.component";
import {UsersCoinComponent} from "./userscoin/userscoin.component";
import {UsersInfoComponent} from "./usersinfo/usersinfo.component";

export const UsersRoutes: Routes = [
    {
        path: '',
        component: UsersComponent,
        children: [
            {
                path: '',
                redirectTo: 'info'
            },
            {
                path: 'info',
                component: UsersInfoComponent
            },
            {
                path: 'coin',
                component: UsersCoinComponent,
            },
        ]
    }
];
