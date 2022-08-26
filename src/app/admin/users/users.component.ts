import {Component, AfterViewInit, OnInit} from '@angular/core';
import {SettingsService} from "../../services/settings/settings.service";
import {Api} from "../../services/api.service";
import {BalanceService} from "../../services/balance.service";
@Component({
	templateUrl: './users.component.html',
	styleUrls: ['./users.component.scss']
})
export class UsersComponent implements OnInit, AfterViewInit {
	constructor(
		public api: Api,
		public settings: SettingsService,
		public balance: BalanceService

	) {

	}

	ngOnInit() {
	}
	ngAfterViewInit(){}
}