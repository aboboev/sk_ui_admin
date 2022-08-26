import {Component, AfterViewInit, OnInit} from '@angular/core';
import {SettingsService} from "../../services/settings/settings.service";
import {BalanceService} from "../../services/balance.service";
import {AdminApi} from "../../services/adminApi.service";
import {CoinApi} from "../../services/coinApi.service";
import {Notifications} from "../../services/notifications.service";
import {Base58Service} from "../../services/base58.service";

declare const swal: any;
declare const $:any;
@Component({
	templateUrl: './withdrawpending.component.html',
	styleUrls: ['./withdrawpending.component.scss']
})
export class WithdrawPendingComponent implements OnInit, AfterViewInit {
	multiCoins = ['LTC', 'DOGE', 'BTG', 'BCH', 'ZEC', 'DGB', 'XMR', 'FRST', 'GRS', 'SYS', 'XSN', 'BTCP'];
	estimateCoins = ['LTC', 'BTG', 'BCH', 'ZEC', 'DGB', 'GRS', 'SYS', 'XSN', 'BTCP'];
	showWalletCoins = ['BTW', 'XIN', 'USDT', 'PIRL', 'BEN', 'TRX', 'WAVES', 'CLB', 'ONT', 'ONG', 'IGG', 'BTT'];
	manualCoins = ['BTC'];

	coins: any = [];
	selCoin = 'TL';
	selCoinInfo: any = {
		is_crypto: 0,
		is_erc20: 0
	};

	loading = false;

	pendings: any = [];

	total: any = {
		count: 0,
		amount: 0,
		fee: 0,
		estimated_fee: 0,
		priority: 0
	};
	hex = '';

	estimated_ids = '';

	showWallet = false;
	wallets = [];
	datatable: any = null;

    showTxidDialog = false;
	txid = '';
	selId = '';

	constructor(
		public adminApi: AdminApi,
		public settings: SettingsService,
		public balance: BalanceService,
		public coinApi: CoinApi,
		public notify: Notifications,
		public base58: Base58Service
	) {

	}

	ngOnInit() {
		this.adminApi.getCoin({
		}).subscribe(res => {
			if (res.success) {
				this.coins = res.data;
				for (let i = 0; i < this.coins.length; i ++) {
					this.coins[i].count = 0;
				}
				this.loadCountByCoin();
			}
		}, err => {

		});

		this.loadTotalBalance();
		this.loadPending();
	}

	loadCountByCoin() {
		this.adminApi.getWithdrawCountByCoin().subscribe(res => {
			for (let i = 0; i < res.data.length; i ++) {
				let coin = this.coins.filter(coin => coin.coin == res.data[i].coin);
				if (coin.length > 0) {
					coin[0].count = res.data[i].count;
				}
			}
		}, err=> {

		});
	}
	loadPending() {
		this.loading = true;
		this.adminApi.getWithdrawPending(this.selCoin, {}).subscribe(res => {
			this.loading = false;
			if (res.success) {
				this.pendings = res.data;
			}
		}, err => {

		});
	}

	loadTotalBalance() {
		if (this.selCoinInfo.is_crypto == 0) return;
		this.coinApi.getTotalBalance(this.selCoin, {}).subscribe(res => {
			if (res.success) {
				this.total.balance = res.balance;
			}
		}, err => {

		});
	}
	onClickCoin(coin) {
		this.selCoin = coin.coin;
		this.selCoinInfo = coin;
		this.showWallet = false;

		this.loadTotalBalance();
		this.loadPending();
	}

	withdrawFinance(id) {
		let _parent = this;
		swal({
			title: 'Are you sure?',
			text: 'This transaction will be confirmed.',
			type: 'warning',
			showCancelButton: true,
			confirmButtonClass: 'btn btn-success',
			cancelButtonClass: 'btn btn-danger',
			confirmButtonText: 'Yes',
			buttonsStyling: false
		}, function () {
			_parent.settings.loading = true;
			_parent.adminApi.withdrawFinancePending(_parent.selCoin, {
				id: id,
			}).subscribe(res => {
				_parent.settings.loading = false;

				if (res.success) {
					_parent.notify.showNotification('Success', 'Successfully Confirmed.', 'success');
					_parent.loadPending();
				} else {
					_parent.notify.showNotification('Warning', res.error, 'warning');
				}
			}, err => {
				_parent.notify.showNotification('Error', 'Please try again.', 'error');
				_parent.settings.loading = false;
			});
		});
	}

	deleteFinanceWithdraw(id) {
		let _parent = this;
		swal({
			title: 'Are you sure?',
			text: 'This transaction will be deleted.',
			type: 'warning',
			showCancelButton: true,
			confirmButtonClass: 'btn btn-success',
			cancelButtonClass: 'btn btn-danger',
			confirmButtonText: 'Yes',
			buttonsStyling: false
		}, function () {
			_parent.settings.loading = true;
			_parent.adminApi.deleteFinancePending(_parent.selCoin, {
				id: id,
			}).subscribe(res => {
				_parent.settings.loading = false;

				if (res.success) {
					_parent.notify.showNotification('Success', 'Successfully Deleted.', 'success');
					_parent.loadPending();
				} else {
					_parent.notify.showNotification('Warning', res.error, 'warning');
				}
			}, err => {
				_parent.notify.showNotification('Error', 'Please try again.', 'error');
				_parent.settings.loading = false;
			});
		});
	}

	estimateWithdrawFee() {
		this.estimated_ids = '';
		for (var i = 0; i < this.pendings.length; i++) {
			if (this.pendings[i].selected == 1) {
				this.estimated_ids += ',' + this.pendings[i].id;
			}
		}
		if (this.estimated_ids == '') {
			this.notify.showNotification('Warning', 'Please select transaction to withdraw.', 'warning');
			return;
		}
		this.estimated_ids = this.estimated_ids.substr(1);

		this.settings.loading = true;
		this.coinApi.estimateFee(this.selCoin, {
			priority: this.total.priority,
			ids: this.estimated_ids
		}).subscribe(res => {
			this.settings.loading = false;
			if (res.success) {
				this.total.estimated_fee = res.fee;
				this.hex = res.hex;
			} else {
				this.notify.showNotification('Warning', res.error, 'warning');
			}
		}, err => {
			this.settings.loading = false;
			this.notify.showNotification('Error', 'Please try again.', 'error');
		});
	}

	withdrawMultiCoin() {
		if (!this.estimateCoins.includes(this.selCoin)) {
			this.estimated_ids = '';
			for (var i = 0; i < this.pendings.length; i++) {
				if (this.pendings[i].selected == 1) {
					this.estimated_ids += ',' + this.pendings[i].id;
				}
			}
			if (this.estimated_ids == '') {
				this.notify.showNotification('Warning', 'Please select transaction to withdraw.', 'warning');
				return;
			}
			this.estimated_ids = this.estimated_ids.substr(1);
			this.hex = '';
			this.total.estimated_fee = 0;
		} else if (this.hex == '') {
			this.notify.showNotification('Warning', 'You have to estimate fee', 'warning');
			return;
		}

		this.settings.loading = true;
		this.coinApi.withdrawCoin(this.selCoin, {
			hex: this.hex,
			fee: this.total.estimated_fee,
			ids: this.estimated_ids
		}).subscribe(res => {
			this.settings.loading = false;
			if (res.success) {
				this.notify.showNotification('Success', 'Withdraw Successfully', 'success');
				this.loadPending();
				this.loadTotalBalance();

				this.hex = '';
				this.estimated_ids = '';
			} else {
				this.notify.showNotification('Warning', res.error, 'warning');
			}
		}, err => {
			this.settings.loading = false;
			this.notify.showNotification('Error', 'Please try again.', 'error');
		});
	}

	calcTotal() {
		this.hex = '';
		this.total.count = 0;
		this.total.amount = 0;
		this.total.fee = 0;

		for (var i = 0; i < this.pendings.length; i++) {
			if (this.pendings[i].selected == 1) {
				this.total.count ++;
				this.total.amount += Number(this.pendings[i].src_amount) - Number(this.pendings[i].fee);
				this.total.fee += Number(this.pendings[i].fee);
			}
		}
	}

	selectAll() {
		for (var i = 0; i < this.pendings.length; i ++) {
			this.pendings[i].selected = 1;
		}
		this.calcTotal();
	}

	onClickRow(pending) {
		if (!this.multiCoins.includes(this.selCoin)) {
			return;
		}
		if (pending.selected && pending.selected == 1) {
			pending.selected = 0;
		} else {
			pending.selected = 1;
		}
		this.calcTotal();
	}

	withdrawOnePending(pending) {
		let hexAddress;
		if (this.selCoin == 'TRX' || this.selCoin == 'IGG' || this.selCoin == 'BTT') {
			hexAddress = this.base58.decode(pending.address);
			if (hexAddress === false) {
				this.notify.showNotification('Warning', 'Wrong address', 'warning');
				return;
			}
		}
		this.settings.loading = true;
		this.coinApi.withdrawCoin(this.selCoin, {
			id: pending.id,
			hexAddress: hexAddress
		}).subscribe(res => {
			this.settings.loading = false;
			if (res.success) {
				this.notify.showNotification('Success', 'Withdraw Successfully', 'success');
				this.loadPending();
				this.loadTotalBalance();
			} else {
				this.notify.showNotification('Warning', res.error, 'warning');
			}
		}, err => {
			this.settings.loading = false;
			this.notify.showNotification('Error', 'Please try again.', 'error');
		});
	}

    withdrawManual(pending) {
		this.selId = pending.id;
		this.showTxidDialog = true;
	}

	submitTxid() {
		if (this.selId == '') {
            this.notify.showNotification('Error', 'Please try again.', 'error');
            return;
		}
		if (this.txid == '') {
            this.notify.showNotification('Warning', 'Please input Txid.', 'warning');
            return;
		}

        this.settings.loading = true;
        this.coinApi.withdrawCoin(this.selCoin, {
            id: this.selId,
            txid: this.txid
        }).subscribe(res => {
            this.settings.loading = false;

            if (res.success) {
                this.showTxidDialog = false;
                this.notify.showNotification('Success', 'Withdraw Successfully', 'success');
                this.loadPending();
            } else {
                this.notify.showNotification('Warning', res.error, 'warning');
            }
        }, err => {
            this.settings.loading = false;
            this.notify.showNotification('Error', 'Please try again.', 'error');
        });
	}

	rejectWithdrawPending(pending) {
		this.settings.loading = true;
		this.coinApi.rejectWithdraw(this.selCoin, {
			id: pending.id
		}).subscribe(res => {
			this.settings.loading = false;
			if (res.success) {
				this.notify.showNotification('Success', 'Rejected Successfully', 'success');
				this.loadPending();
				this.loadTotalBalance();
			} else {
				this.notify.showNotification('Warning', res.error, 'warning');
			}
		}, err=> {
			this.settings.loading = false;
			this.notify.showNotification('Error', 'Please try again.', 'error');
		});
	}
	ngAfterViewInit() {}

	onClickShowWallet() {
		this.showWallet = true;
		if (this.showWalletCoins.includes(this.selCoin)) {
			this.loadAllWallet();
		}
	}
	loadErc20Wallet() {
		if (this.datatable) {
			this.datatable.destroy();
			this.datatable = null;
		}
		this.wallets = [];

		this.settings.loading = true;

		this.adminApi.getErc20Wallet(this.selCoin).subscribe(res => {
			this.settings.loading = false;
			if (res.success) {
				this.wallets = res.data;

				var _parent = this;
				var timer = setInterval(function () {
					if (res.data.length == $('#wallettable tbody tr').length) {
						_parent.datatable = $('#wallettable').DataTable();
						clearInterval(timer);
					}
				}, 100);
			}
		}, err => {
			this.settings.loading = false;
		});
	}


	loadAllWallet() {
		if (this.datatable) {
			this.datatable.destroy();
			this.datatable = null;
		}
		this.wallets = [];

		this.settings.loading = true;

		this.adminApi.getAllWallet(this.selCoin).subscribe(res => {
			this.settings.loading = false;
			if (res.success) {
				this.wallets = res.data;

				var _parent = this;
				var timer = setInterval(function () {
					if (res.data.length == $('#wallettable tbody tr').length) {
						_parent.datatable = $('#wallettable').DataTable();
						clearInterval(timer);
					}
				}, 100);
			}
		}, err => {
			this.settings.loading = false;
		});
	}

	moveToMainWallet(address) {
		this.settings.loading = true;

		this.adminApi.moveWalletToMain(this.selCoin, {
			address: address
		}).subscribe(res => {
			this.settings.loading = false;
			if (res.success) {
				this.notify.showNotification('Success', 'Success', 'success');
				this.loadAllWallet();
			} else {
				this.notify.showNotification('Warning', res.error, 'warning');
			}
		}, err => {
			this.settings.loading = false;
		});
	}
}