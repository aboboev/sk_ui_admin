import {Routes, RouterModule} from '@angular/router';
import {AuthLayoutComponent} from "../../layouts/auth/auth-layout.component";
import {ComingSoonComponent} from "../../shared/components/coming/coming.component";
import {VerifyComponent} from "./verify.component";

export const VerifyRoutes: Routes = [
    {
        path: '',
        component: VerifyComponent
    }
];
