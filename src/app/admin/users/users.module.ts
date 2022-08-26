import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {RouterModule} from "@angular/router";
import {UsersRoutes} from "./users.routing";
import {SIDEBAR_TOGGLE_DIRECTIVES} from "../../shared/sidebar.directive";
import {UsersComponent} from "./users.component";
import {SharedModule} from "../../shared/shared.module";
import {UsersCoinComponent} from "./userscoin/userscoin.component";
import {UsersInfoComponent} from "./usersinfo/usersinfo.component";


@NgModule({
    imports: [
        CommonModule,
        RouterModule.forChild(UsersRoutes),
        SharedModule
    ],
    declarations: [
        UsersComponent,
        UsersInfoComponent,
        UsersCoinComponent
    ]
})
export class UsersModule { }
