import {Component, AfterViewInit, OnInit} from '@angular/core';
import {SettingsService} from "../../../services/settings/settings.service";
import {Api} from "../../../services/api.service";
import {BalanceService} from "../../../services/balance.service";
import {ActivatedRoute, Router} from "@angular/router";
import {Notifications} from "../../../services/notifications.service";
@Component({
    templateUrl: './detail.component.html',
    styleUrls: ['./detail.component.scss']
})
export class AdminTicketDetailComponent implements OnInit, AfterViewInit {
    ticket: any = {};
    details: any = [];

    isReply: boolean = false;

    ticket_id: any = null;

    constructor(public api: Api,
                public settings: SettingsService,
                public balance: BalanceService,
                public router: Router,
                public notify: Notifications,
                public activatedRoute: ActivatedRoute) {


    }

    ngOnInit() {
        this.ticket_id = this.activatedRoute.snapshot.params['id'];

        this.loadTicket();
    }

    loadTicket() {
        this.api.getTicketDetail({
            ticket_id: this.ticket_id
        }).subscribe(res => {
            if (res.success) {
                this.ticket = res.ticket;
                this.details = res.data;
            } else {
                this.router.navigate(['/admin/ticket']);
            }
        }, err => {
            this.router.navigate(['/admin/ticket']);
        });
    }

    ngAfterViewInit() {
    }

    onReply() {
        this.ticket.message = '';
        this.ticket.attach_url = '';
        this.ticket.attach_name = '';

        this.isReply = true;
    }

    sendTicket() {
        this.settings.loading = true;
        this.api.replyTicket(this.ticket).subscribe(res => {
            this.settings.loading = false;
            if (res.success) {
                this.notify.showNotification('Success', 'Your Reply Ticket was posted successfully', 'success');

                this.isReply = false;
                this.loadTicket();
            } else {
                this.notify.showNotification('Warning', res.error, 'warning');
            }
        }, err => {
            this.settings.loading = false;
            this.notify.showNotification('Error', 'Please try again.', 'error');
        });
    }

    fileChangeListener($event) {
        let image: any = new Image();
        let file: File = $event.target.files[0];

        this.settings.loading = true;
        this.api.uploadFile(file).subscribe(res => {
            this.settings.loading = false;
            if (res.success) {
                this.ticket.attach_url = res.url;
                this.ticket.attach_name = file.name;
            }
        }, err => {
            this.settings.loading = false;
        });
    }

    closeTicket() {
        this.settings.loading = true;
        this.api.closeTicket({
            id: this.ticket_id
        }).subscribe(res => {
            this.settings.loading = false;
            if (res.success) {
                this.notify.showNotification('Success', 'Ticket was closed successfully', 'success');

                this.loadTicket();
            } else {
                this.notify.showNotification('Warning', res.error, 'warning');
            }
        }, err => {
            this.settings.loading = false;
            this.notify.showNotification('Error', 'Please try again.', 'error');
        });
    }
}