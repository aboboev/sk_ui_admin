import {Routes, RouterModule} from '@angular/router';
import {AuthLayoutComponent} from "../../layouts/auth/auth-layout.component";
import {ComingSoonComponent} from "../../shared/components/coming/coming.component";
import {AdminWalletComponent} from "./wallet.component";

export const AdminWalletRoutes: Routes = [
    {
        path: '',
        component: AdminWalletComponent
    }
];
