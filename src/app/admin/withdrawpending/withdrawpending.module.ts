import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {RouterModule} from "@angular/router";
import {WithdrawPendingRoutes} from "./withdrawpending.routing";
import {SIDEBAR_TOGGLE_DIRECTIVES} from "../../shared/sidebar.directive";
import {SharedModule} from "../../shared/shared.module";
import {WithdrawPendingComponent} from "./withdrawpending.component";


@NgModule({
    imports: [
        CommonModule,
        RouterModule.forChild(WithdrawPendingRoutes),
        SharedModule
    ],
    declarations: [
        WithdrawPendingComponent
    ]
})
export class WithdrawPendingModule { }
