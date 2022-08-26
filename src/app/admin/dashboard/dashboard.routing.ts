import {Routes, RouterModule} from '@angular/router';
import {AuthLayoutComponent} from "../../layouts/auth/auth-layout.component";
import {ComingSoonComponent} from "../../shared/components/coming/coming.component";
import {AdminDashboardComponent} from "./dashboard.component";

export const AdminDashboardRoutes: Routes = [
    {
        path: '',
        component: AdminDashboardComponent
    }
];
