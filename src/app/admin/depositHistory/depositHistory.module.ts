import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {RouterModule} from "@angular/router";
import {SIDEBAR_TOGGLE_DIRECTIVES} from "../../shared/sidebar.directive";
import {SharedModule} from "../../shared/shared.module";
import {DepositHistoryComponent} from "./depositHistory.component";
import {DepositHistoryRoutes} from "./depositHistory.routing";

@NgModule({
    imports: [
        CommonModule,
        RouterModule.forChild(DepositHistoryRoutes),
        SharedModule
    ],
    declarations: [
        DepositHistoryComponent
    ]
})
export class DepositHistoryModule { }
