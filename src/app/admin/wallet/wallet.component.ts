import {Component, AfterViewInit, OnInit} from '@angular/core';
import {SettingsService} from "../../services/settings/settings.service";
import {BalanceService} from "../../services/balance.service";
import {AdminApi} from "../../services/adminApi.service";
import {Notifications} from "../../services/notifications.service";
import {CoinApi} from "../../services/coinApi.service";
@Component({
	templateUrl: './wallet.component.html',
	styleUrls: ['./wallet.component.scss']
})
export class AdminWalletComponent implements OnInit, AfterViewInit {
	coins: any = [];
	selCoin = 'TL';
	selCoinInfo: any = {
		is_crypto: 0
	};

	banks: any = [];
	new_bank: any = {};

	sysSettings: any = {};

	showBankAddModal = false;

	addresses: any = [];

	constructor(
		public adminApi: AdminApi,
		public coinApi: CoinApi,
		public settings: SettingsService,
		public balance: BalanceService,
		public notify: Notifications

	) {

	}

	ngOnInit() {
		this.loadCoins();

		this.loadBanks();

		this.adminApi.getSystemSettings({}).subscribe( res => {
			this.sysSettings = res.success ? res.data : {};
		});
	}

	loadCoins() {
		this.adminApi.getCoin({
		}).subscribe(res => {
			if (res.success) {
				this.coins = res.data;
			}
		}, err => {

		});

	}
	onClickCoin(coin) {
		this.selCoin = coin.coin;
		this.selCoinInfo = Object.assign({}, coin);

		if (coin.is_crypto == 0) {
			this.loadBanks();
		} else {
			this.loadAdminAddresses();
		}
	}

	loadBanks() {
		this.adminApi.getBanks({
			currency: this.selCoin
		}).subscribe( res=> {
			if (res.success) {
				this.banks = res.data;
			}
		});
	}

	addBank() {
		this.adminApi.saveBank({
			name: this.new_bank.name,
			iban_code: this.new_bank.iban_code,
			currency: this.selCoin
		}).subscribe( res => {
			if (res.success) {
				this.showBankAddModal = false;
				this.loadBanks();
				this.notify.showNotification('Success', 'New Bank was added successfully.', 'success');
			} else {
				this.notify.showNotification('Warning', res.error, 'warning');
			}
		});
	}

	deleteBank(id) {
		this.adminApi.deleteBank({
			id: id
		}).subscribe( res => {
			if (res.success) {
				this.loadBanks();
				this.notify.showNotification('Success', 'Bank was removed successfully.', 'success');
			} else {
				this.notify.showNotification('Warning', res.error, 'warning');
			}
		});
	}

	saveTLFee() {
		this.adminApi.saveSetting({
			tl_withdraw_fee: this.sysSettings.tl_withdraw_fee,
			tl_deposit_fee: this.sysSettings.tl_deposit_fee
		}).subscribe( res => {
			if (res.success) {
				this.notify.showNotification('Success', 'Updated successfully.', 'success');
			} else {
				this.notify.showNotification('Warning', res.error, 'warning');
			}
		});
	}

	saveUSDFee() {
		this.adminApi.saveSetting({
			usd_withdraw_fee: this.sysSettings.usd_withdraw_fee,
			usd_deposit_fee: this.sysSettings.usd_deposit_fee
		}).subscribe( res => {
			if (res.success) {
				this.notify.showNotification('Success', 'Updated successfully.', 'success');
			} else {
				this.notify.showNotification('Warning', res.error, 'warning');
			}
		});
	}

	saveEUROFee() {
		this.adminApi.saveSetting({
			euro_withdraw_fee: this.sysSettings.euro_withdraw_fee,
			euro_deposit_fee: this.sysSettings.euro_deposit_fee
		}).subscribe( res => {
			if (res.success) {
				this.notify.showNotification('Success', 'Updated successfully.', 'success');
			} else {
				this.notify.showNotification('Warning', res.error, 'warning');
			}
		});
	}

	loadAdminAddresses() {
		let index = this.selCoin.toLowerCase() + '_address';
		this.adminApi.getAdminSettings({
			name: index
		}).subscribe(res => {
			if (res.success) {
				this.addresses = res.data;
			}
		});
	}

	addCoinAddress() {
		this.settings.loading = true;
		this.coinApi.generateAdminAddress(this.selCoin, {
			label: 'admin'
		}).subscribe(res => {
			this.settings.loading = false;
			if (res.success) {
				this.notify.showNotification('Success', '', 'success');
				this.loadAdminAddresses();
			} else {
				this.notify.showNotification('Warning', res.error, 'warning');
			}
		}, err => {
			this.settings.loading = false;
		});
	}

	saveCoinFee() {
		this.adminApi.saveCoinInfo({
			coin: this.selCoin,
			withdraw_fee: this.selCoinInfo.withdraw_fee,
			min_withdraw: this.selCoinInfo.min_withdraw,
			buy_fee: this.selCoinInfo.buy_fee,
			sell_fee: this.selCoinInfo.sell_fee,
			ref_fee: this.selCoinInfo.ref_fee,
			deposit: this.selCoinInfo.deposit,
			withdraw: this.selCoinInfo.withdraw
		}).subscribe( res => {
			if (res.success) {
				this.loadCoins();
				this.notify.showNotification('Success', 'Updated successfully.', 'success');
			} else {
				this.notify.showNotification('Warning', res.error, 'warning');
			}
		});
	}


	ngAfterViewInit(){}
}