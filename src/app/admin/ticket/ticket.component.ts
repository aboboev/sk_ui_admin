import {Component, AfterViewInit, OnInit} from '@angular/core';
import {SettingsService} from "../../services/settings/settings.service";
import {Api} from "../../services/api.service";
import {BalanceService} from "../../services/balance.service";
import {Router} from "@angular/router";

declare var $: any;

@Component({
	templateUrl: './ticket.component.html',
	styleUrls: ['./ticket.component.scss']
})
export class AdminTicketComponent implements OnInit, AfterViewInit {
	openTickets: any = [];
	closeTickets: any = [];

	closedatatable: any = null;
	opendatatable: any = null;
	constructor(
		public api: Api,
		public settings: SettingsService,
		public balance: BalanceService,
		public router: Router

	) {

	}

	ngOnInit() {
		this.api.getAllTicket({
			open: true
		}).subscribe( res => {
			if (res.success) {
				this.openTickets = res.data;

				var _parent = this;
				if (res.data.length > 0) {
					var timer = setInterval(function () {
						if (res.data.length == $('#opentable tbody tr').length) {

							_parent.opendatatable = $('#opentable').DataTable();
							clearInterval(timer);
						}
					}, 100);
				}

				this.api.getAllTicket({
					close: true
				}).subscribe( res => {
					if (res.success) {
						this.closeTickets = res.data;

						if (res.data.length > 0) {
							var timer1 = setInterval(function () {
								if (res.data.length == $('#closetable tbody tr').length) {

									_parent.closedatatable = $('#closetable').DataTable();
									clearInterval(timer1);
								}
							}, 100);
						}
					}
				});
			}
		});
	}

	ngAfterViewInit(){}

	showTicket(ticket) {
		this.router.navigate(['panel/ticket/detail/' + ticket.id]);
	}
}