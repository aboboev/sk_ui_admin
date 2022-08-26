import {Routes, RouterModule} from '@angular/router';
import {AuthLayoutComponent} from "../../layouts/auth/auth-layout.component";
import {ComingSoonComponent} from "../../shared/components/coming/coming.component";
import {AdminTicketComponent} from "./ticket.component";
import {AdminTicketDetailComponent} from "./detail/detail.component";

export const AdminTicketRoutes: Routes = [
    {
        path: '',
        component: AdminTicketComponent
    },
    {
        path: 'detail/:id',
        component: AdminTicketDetailComponent
    }
];
