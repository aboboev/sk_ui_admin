import {Routes, RouterModule} from '@angular/router';
import {AuthLayoutComponent} from "../../layouts/auth/auth-layout.component";
import {ComingSoonComponent} from "../../shared/components/coming/coming.component";
import {FTCICOComponent} from "./ftc/ftcico.component";

export const ICORoutes: Routes = [
    {
        path: '',
        component: FTCICOComponent
    },
    {
        path: 'ftc',
        component: FTCICOComponent
    }
];
