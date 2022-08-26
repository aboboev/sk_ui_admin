import {Component, AfterViewInit, OnInit} from '@angular/core';
import {SettingsService} from "../../services/settings/settings.service";
import {Api} from "../../services/api.service";
import {BalanceService} from "../../services/balance.service";
import {Notifications} from "../../services/notifications.service";
import {AdminApi} from "../../services/adminApi.service";
import {IcoApi} from "../../services/icoApi.service";

declare var $:any;

@Component({
	templateUrl: './icoSetting.component.html',
	styleUrls: ['./icoSetting.component.scss']
})
export class ICOSettingComponent implements OnInit, AfterViewInit {
	selCoin = 'STK';
	icoSettings: any = {};
	coins: any = [
		{coin: 'STK', fullname: 'Sistemkoin'}
	];

	constructor (
		public adminApi: AdminApi,
		public icoApi: IcoApi,
		public settings: SettingsService,
		public balance: BalanceService,
		public notify: Notifications
	) {

	}

	ngOnInit() {
		this.loadICOSetting();
	}

	loadICOSetting() {
		if (this.selCoin == 'FTC') {
			this.icoApi.getFTCSetting({}).subscribe(res => {
				if (res.success) {
					this.icoSettings = res.data;
				}
			});
		} else if (this.selCoin == 'STK') {
            this.icoApi.getSTKSetting({}).subscribe(res => {
                if (res.success) {
                    this.icoSettings = res.data;
                }
            });
        }
	}

	onClickCoin(coin) {
		this.selCoin = coin.coin;
		this.loadICOSetting();
	}

	ngAfterViewInit(){}
}