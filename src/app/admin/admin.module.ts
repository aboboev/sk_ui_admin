import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import {AdminLayoutComponent} from "../layouts/admin/admin-layout.component";
import {RouterModule} from "@angular/router";
import {AdminRoutes} from "./admin.routing";
import {SharedModule} from "../shared/shared.module";
import {AdminNavigationComponent} from "../shared/admin/header-navigation/navigation.component";
import {AdminSidebarComponent} from "../shared/admin/sidebar/sidebar.component";

@NgModule({
    imports: [
        CommonModule,
        RouterModule.forChild(AdminRoutes),
        SharedModule
    ],
    declarations: [
        AdminLayoutComponent,
        AdminNavigationComponent,
        AdminSidebarComponent
    ]
})
export class AdminModule { }
