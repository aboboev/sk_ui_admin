import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {RouterModule} from "@angular/router";
import {SIDEBAR_TOGGLE_DIRECTIVES} from "../../shared/sidebar.directive";
import {SharedModule} from "../../shared/shared.module";
import {ICOSettingComponent} from "./icoSetting.component";
import {ICOSettingRoutes} from "./icoSetting.routing";

@NgModule({
    imports: [
        CommonModule,
        RouterModule.forChild(ICOSettingRoutes),
        SharedModule
    ],
    declarations: [
        ICOSettingComponent
    ]
})
export class ICOSettingModule { }
