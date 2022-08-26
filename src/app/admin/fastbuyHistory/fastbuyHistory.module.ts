import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {RouterModule} from "@angular/router";
import {SIDEBAR_TOGGLE_DIRECTIVES} from "../../shared/sidebar.directive";
import {SharedModule} from "../../shared/shared.module";
import {FastbuyHistoryComponent} from "./fastbuyHistory.component";
import {FastbuyHistoryRoutes} from "./fastbuyHistory.routing";

@NgModule({
    imports: [
        CommonModule,
        RouterModule.forChild(FastbuyHistoryRoutes),
        SharedModule
    ],
    declarations: [
        FastbuyHistoryComponent
    ]
})
export class FastbuyHistoryModule { }
