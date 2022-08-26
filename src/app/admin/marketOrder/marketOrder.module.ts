import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {RouterModule} from "@angular/router";
import {SIDEBAR_TOGGLE_DIRECTIVES} from "../../shared/sidebar.directive";
import {SharedModule} from "../../shared/shared.module";
import {MarketOrderComponent} from "./marketOrder.component";
import {MarketOrderRoutes} from "./marketOrder.routing";

@NgModule({
    imports: [
        CommonModule,
        RouterModule.forChild(MarketOrderRoutes),
        SharedModule
    ],
    declarations: [
        MarketOrderComponent
    ]
})
export class MarketOrderModule { }
