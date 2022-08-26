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
	templateUrl: './competition.component.html',
	styleUrls: ['./competition.component.scss']
})
export class CompetitionComponent implements OnInit, AfterViewInit, OnDestroy {
	all_pairs: any = {};
	pairs: any = [];

	activeMarketCoin = 'TL';
	selMarketCoin = 'TL';
	selCoin = 'BTC';
	selPair: any = {
		places: 6
	};

	orders: any = [];

	startdate: any;
	enddate: any;

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
		let year = new Date().getFullYear();
		let month = (new Date().getMonth()+1 < 10 ? '0' : '') + (new Date().getMonth()+1);
        let date = (new Date().getDate() < 10 ? '0' : '') + (new Date().getDate());
		this.startdate = year + '-' + month + '-' + date;
        this.enddate = year + '-' + month + '-' + date;

		this.loadCompetition();

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
	}

	loadCompetition() {
		if (this.datatable) {
			this.datatable.destroy();
			this.datatable = null;
		}

		this.adminApi.getCompetition(this.selCoin, this.selMarketCoin, {
			startdate: this.startdate,
			enddate: this.enddate
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
        this.loadCompetition();
    }
	ngAfterViewInit(){}

	ngOnDestroy() {
	}


    onSelectMarketCoin(marketCoin) {
        this.activeMarketCoin = marketCoin;

        this.pairs = this.all_pairs[marketCoin];
    }
}