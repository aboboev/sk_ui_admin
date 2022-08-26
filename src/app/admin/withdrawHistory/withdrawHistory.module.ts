import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {RouterModule} from "@angular/router";
import {SIDEBAR_TOGGLE_DIRECTIVES} from "../../shared/sidebar.directive";
import {SharedModule} from "../../shared/shared.module";
import {WithdrawHistoryComponent} from "./withdrawHistory.component";
import {WithdrawHistoryRoutes} from "./withdrawHistory.routing";

@NgModule({
    imports: [
        CommonModule,
        RouterModule.forChild(WithdrawHistoryRoutes),
        SharedModule
    ],
    declarations: [
        WithdrawHistoryComponent
    ]
})
export class WithdrawHistoryModule { }
