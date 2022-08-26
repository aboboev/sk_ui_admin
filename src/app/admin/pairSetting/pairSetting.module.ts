import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {RouterModule} from "@angular/router";
import {SIDEBAR_TOGGLE_DIRECTIVES} from "../../shared/sidebar.directive";
import {SharedModule} from "../../shared/shared.module";
import {PairSettingComponent} from "./pairSetting.component";
import {PairSettingRoutes} from "./pairSetting.routing";

@NgModule({
    imports: [
        CommonModule,
        RouterModule.forChild(PairSettingRoutes),
        SharedModule
    ],
    declarations: [
        PairSettingComponent
    ]
})
export class PairSettingModule { }
