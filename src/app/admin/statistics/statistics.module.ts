import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {RouterModule} from "@angular/router";
import {SharedModule} from "../../shared/shared.module";
import {StatisticsComponent} from "./statistics.component";
import {StatisticsRoutes} from "./statistics.routing";

@NgModule({
    imports: [
        CommonModule,
        RouterModule.forChild(StatisticsRoutes),
        SharedModule
    ],
    declarations: [
        StatisticsComponent
    ]
})
export class StatisticsModule { }
