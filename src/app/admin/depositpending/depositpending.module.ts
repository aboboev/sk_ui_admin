import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {RouterModule} from "@angular/router";
import {SIDEBAR_TOGGLE_DIRECTIVES} from "../../shared/sidebar.directive";
import {SharedModule} from "../../shared/shared.module";
import {DepositPendingRoutes} from "./depositpending.routing";
import {DepositPendingComponent} from "./depositpending.component";
import {DepositPendingTLComponent} from "./userstl/pendingtl.component";
import {DepositPendingUSDComponent} from "./usersusd/pendingusd.component";
import {DepositPendingEUROComponent} from "./userseuro/pendingeuro.component";


@NgModule({
    imports: [
        CommonModule,
        RouterModule.forChild(DepositPendingRoutes),
        SharedModule
    ],
    declarations: [
        DepositPendingComponent,
        DepositPendingTLComponent,
        DepositPendingUSDComponent,
        DepositPendingEUROComponent
    ]
})
export class DepositPendingModule { }
