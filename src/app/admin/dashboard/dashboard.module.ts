import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {RouterModule} from "@angular/router";
import {SIDEBAR_TOGGLE_DIRECTIVES} from "../../shared/sidebar.directive";
import {SharedModule} from "../../shared/shared.module";
import {AdminDashboardComponent} from "./dashboard.component";
import {AdminDashboardRoutes} from "./dashboard.routing";

@NgModule({
    imports: [
        CommonModule,
        RouterModule.forChild(AdminDashboardRoutes),
        SharedModule
    ],
    declarations: [
        AdminDashboardComponent
    ]
})
export class AdminDashboardModule { }
