import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {RouterModule} from "@angular/router";
import {DetailRoutes} from "./userdetail.routing";
import {SIDEBAR_TOGGLE_DIRECTIVES} from "../../shared/sidebar.directive";
import {UserDetailComponent} from "./userdetail.component";
import {SharedModule} from "../../shared/shared.module";
import {DetailCoinComponent} from "./detailcoin/detailcoin.component";
import {DetailInfoComponent} from "./detailinfo/detailinfo.component";
import {UserResolver} from "./user-resolver.service";
import {UserService} from "../service/user.service";
import {DetailRefComponent} from "./detailref/detailref.component";


@NgModule({
    imports: [
        CommonModule,
        RouterModule.forChild(DetailRoutes),
        SharedModule
    ],
    declarations: [
        UserDetailComponent,
        DetailInfoComponent,
        DetailCoinComponent,
        DetailRefComponent,
    ],
    providers: [
        UserResolver,
        UserService
    ]
})
export class UserDetailModule { }
