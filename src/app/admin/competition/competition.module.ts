import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {RouterModule} from "@angular/router";
import {SIDEBAR_TOGGLE_DIRECTIVES} from "../../shared/sidebar.directive";
import {SharedModule} from "../../shared/shared.module";
import {CompetitionComponent} from "./competition.component";
import {CompetitionRoutes} from "./competition.routing";

@NgModule({
    imports: [
        CommonModule,
        RouterModule.forChild(CompetitionRoutes),
        SharedModule
    ],
    declarations: [
        CompetitionComponent
    ]
})
export class CompetitionModule { }
