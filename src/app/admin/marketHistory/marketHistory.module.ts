import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {RouterModule} from "@angular/router";
import {SIDEBAR_TOGGLE_DIRECTIVES} from "../../shared/sidebar.directive";
import {SharedModule} from "../../shared/shared.module";
import {MarketHistoryComponent} from "./marketHistory.component";
import {MarketHistoryRoutes} from "./marketHistory.routing";

@NgModule({
    imports: [
        CommonModule,
        RouterModule.forChild(MarketHistoryRoutes),
        SharedModule
    ],
    declarations: [
        MarketHistoryComponent
    ]
})
export class MarketHistoryModule { }
