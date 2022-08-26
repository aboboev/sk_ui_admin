import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {RouterModule} from "@angular/router";
import {SIDEBAR_TOGGLE_DIRECTIVES} from "../../shared/sidebar.directive";
import {SharedModule} from "../../shared/shared.module";
import {VerifyComponent} from "./verify.component";
import {VerifyRoutes} from "./verify.routing";

@NgModule({
    imports: [
        CommonModule,
        RouterModule.forChild(VerifyRoutes),
        SharedModule
    ],
    declarations: [
        VerifyComponent
    ]
})
export class VerifyModule { }
