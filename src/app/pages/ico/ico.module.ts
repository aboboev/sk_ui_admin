import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {RouterModule} from "@angular/router";
import {ICORoutes} from "./ico.routing";
import {SIDEBAR_TOGGLE_DIRECTIVES} from "../../shared/sidebar.directive";
import {SharedModule} from "../../shared/shared.module";
import {FTCICOComponent} from "./ftc/ftcico.component";


@NgModule({
    imports: [
        CommonModule,
        RouterModule.forChild(ICORoutes),
        SharedModule
    ],
    declarations: [
        FTCICOComponent,
    ]
})
export class ICOModule { }
