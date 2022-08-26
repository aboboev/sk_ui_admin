import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {RouterModule} from "@angular/router";
import {SIDEBAR_TOGGLE_DIRECTIVES} from "../../shared/sidebar.directive";
import {SharedModule} from "../../shared/shared.module";
import {ICOHistoryComponent} from "./icoHistory.component";
import {ICOHistoryRoutes} from "./icoHistory.routing";

@NgModule({
    imports: [
        CommonModule,
        RouterModule.forChild(ICOHistoryRoutes),
        SharedModule
    ],
    declarations: [
        ICOHistoryComponent
    ]
})
export class ICOHistoryModule { }
