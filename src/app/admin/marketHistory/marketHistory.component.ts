import {Component, AfterViewInit, OnInit, OnDestroy} from '@angular/core';
import {SettingsService} from "../../services/settings/settings.service";
import {AdminApi} from "../../services/adminApi.service";
import {BalanceService} from "../../services/balance.service";
import {Notifications} from "../../services/notifications.service";
import {MarketApi} from "../../services/marketApi.service";
import {PusherService} from "../../services/pusher.service";
import {Subject} from "rxjs";
import {takeUntil} from "rxjs/operators";

declare const $: any;

@Component({
	templateUrl: './marketHistory.component.html',
	styleUrls: ['./marketHistory.component.scss']
})
export class MarketHistoryComponent implements OnInit, AfterViewInit, OnDestroy {
	all_pairs: any = {};
	pairs: any = [];

	activeMarketCoin = 'TL';
	selMarketCoin = 'TL';
	selCoin = 'BTC';
	selPair: any = {
		places: 6
	};

	orders: any = [];

	datatable: any = null;

	private ngUnsubscribe = new Subject();

	constructor (
		public adminApi: AdminApi,
		public marketApi: MarketApi,
		public settings: SettingsService,
		public balance: BalanceService,
		public notify: Notifications,
		public pusher: PusherService
	) {

	}

	ngOnInit() {
		this.loadMarketHistory();

		this.marketApi.getCoinPairInfo({}).subscribe(res => {
			if (res.success) {
				this.all_pairs.TL = res.data.filter(pair => pair.market_coin === 'TL');
				this.all_pairs.BTC = res.data.filter(pair => pair.market_coin === 'BTC');
				this.all_pairs.ETH = res.data.filter(pair => pair.market_coin === 'ETH');
				this.all_pairs.XRP = res.data.filter(pair => pair.market_coin === 'XRP');
				this.all_pairs.USD = res.data.filter(pair => pair.market_coin === 'USD');
				this.all_pairs.EURO = res.data.filter(pair => pair.market_coin === 'EURO');
				this.all_pairs.USDT = res.data.filter(pair => pair.market_coin === 'USDT');
				this.all_pairs.MISC = res.data.filter(pair => pair.market_coin != 'TL' && pair.market_coin != 'BTC' && pair.market_coin != 'ETH' && pair.market_coin != 'XRP' && pair.market_coin != 'USD' && pair.market_coin != 'EURO'&& pair.market_coin != 'USDT');

				this.pairs = this.all_pairs[this.activeMarketCoin];
				this.selPair = res.data.filter(pair => pair.coin === this.selCoin)[0];
			}
		});

		this.pusher.getOrderEvent()
            .pipe(takeUntil(this.ngUnsubscribe))
            .subscribe(data => {
				this.onOrderEvent(data);
			});
	}

	onOrderEvent(data) {
		if (data.last_price && data.last_price != '' && data.last_price > 0) {
			let pair = this.all_pairs[data.marketCoin].filter(pair => pair.coin == data.coin)[0];
			pair.last_price = data.last_price;
			pair.change = pair.first_price > 0 ? (pair.last_price - pair.first_price) * 100 / pair.first_price : 0;
			if (pair.last_price > pair.high) {
				pair.high = pair.last_price;
			}
			if (pair.last_price < pair.low) {
				pair.low = pair.last_price;
			}
			pair.volume = Number(pair.volume) + (Number(data.volume) > 0 ? Number(data.volume) : 0);

		}
	}

	loadMarketHistory() {
		if (this.datatable) {
			this.datatable.destroy();
			this.datatable = null;
		}

		this.adminApi.getMarketHistory(this.selCoin, this.selMarketCoin, {
			limit: true
		}).subscribe( res => {
			if (res.success) {
				this.orders = res.data;

				if (res.data.length > 0) {
					var _parent = this;
					var timer = setInterval(function () {
						if (res.data.length == $('#historytable tbody tr').length) {
							_parent.datatable = $('#historytable').DataTable();
							clearInterval(timer);
						}
					}, 100);
				}
			}
		});
	}

	onClickPair(pair) {
		this.selCoin = pair.coin;
		this.selMarketCoin = pair.market_coin;

		this.selPair = pair;
		this.loadMarketHistory();
	}

	onSelectMarketCoin(marketCoin) {
		this.activeMarketCoin = marketCoin;

		this.pairs = this.all_pairs[marketCoin];
	}

	onDelete(id) {
		this.settings.loading = true;
		this.adminApi.deleteMarketHistory({
			id: id
		}).subscribe( res => {
			this.settings.loading = false;
			if (res.success) {
				this.notify.showNotification('Success', 'Order was deleted succesfully.', 'success');
				this.loadMarketHistory();
			} else {
				this.notify.showNotification('Warning', res.error, 'warning');
			}
		}, err => {
			this.settings.loading = false;
			this.notify.showNotification('Error', 'Please try again later.', 'error');
		});
	}

	ngAfterViewInit(){}

	ngOnDestroy() {
		this.ngUnsubscribe.next();
		this.ngUnsubscribe.complete();
	}
}