import {Component, AfterViewInit, OnInit} from '@angular/core';
import {SettingsService} from "../../services/settings/settings.service";
import {Api} from "../../services/api.service";
import {BalanceService} from "../../services/balance.service";
import {ActivatedRoute, Params, Router} from "@angular/router";
import {UserService} from "../service/user.service";
@Component({
	templateUrl: './userdetail.component.html',
	styleUrls: ['./userdetail.component.scss']
})
export class UserDetailComponent implements OnInit, AfterViewInit {

	constructor(
		public api: Api,
		public settings: SettingsService,
		public balance: BalanceService,
		private activatedRoute: ActivatedRoute,
		public user: UserService,
		public router: Router

	) {
		this.activatedRoute.data
            .subscribe(data => {
            	this.user.selectedUser = data.user;
			});
	}

	ngOnInit() {
		this.user.getUserBalance();

	}

	ngAfterViewInit(){}
}