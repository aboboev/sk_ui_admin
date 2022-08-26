import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {RouterModule} from "@angular/router";
import {SIDEBAR_TOGGLE_DIRECTIVES} from "../../shared/sidebar.directive";
import {SharedModule} from "../../shared/shared.module";
import {AdminTicketComponent} from "./ticket.component";
import {AdminTicketRoutes} from "./ticket.routing";
import {AdminTicketDetailComponent} from "./detail/detail.component";


@NgModule({
    imports: [
        CommonModule,
        RouterModule.forChild(AdminTicketRoutes),
        SharedModule
    ],
    declarations: [
        AdminTicketComponent,
        AdminTicketDetailComponent
    ]
})
export class AdminTicketModule { }
