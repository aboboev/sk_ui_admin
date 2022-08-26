import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {RouterModule} from "@angular/router";
import {SIDEBAR_TOGGLE_DIRECTIVES} from "../../shared/sidebar.directive";
import {SharedModule} from "../../shared/shared.module";
import {AdminWalletRoutes} from "./wallet.routing";
import {AdminWalletComponent} from "./wallet.component";


@NgModule({
    imports: [
        CommonModule,
        RouterModule.forChild(AdminWalletRoutes),
        SharedModule
    ],
    declarations: [
        AdminWalletComponent,
    ]
})
export class AdminWalletModule { }
