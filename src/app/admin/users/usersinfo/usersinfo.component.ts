import {Component, AfterViewInit, OnInit, OnDestroy, ViewChild} from '@angular/core';
import {SettingsService} from "../../../services/settings/settings.service";
import {BalanceService} from "../../../services/balance.service";
import {Notifications} from "../../../services/notifications.service";
import {PusherService} from "../../../services/pusher.service";
import {SystemService} from "../../../services/system.service";
import {Router} from "@angular/router";
import {AdminApi} from "../../../services/adminApi.service";
import {DatatableComponent} from "@swimlane/ngx-datatable";

declare const swal: any;
declare const $: any;
@Component({
    templateUrl: './usersinfo.component.html',
    styleUrls: ['./usersinfo.component.scss']
})
export class UsersInfoComponent implements OnInit, AfterViewInit, OnDestroy {
    users: any = [];
    temp: any = [];

    total: any = {
        user_count: 0,
        confirmed_count: 0,
        unconfirmed_count: 0
    };

    datatable: any = null;

    @ViewChild(DatatableComponent) table: DatatableComponent;
    constructor(public adminApi: AdminApi,
                public settings: SettingsService,
                public balance: BalanceService,
                public notify: Notifications,
                public pusher: PusherService,
                public system: SystemService,
                public router: Router
    ) {


    }

    ngOnInit() {
        this.loadUser();

        // $(document).ready(function() {
        //     $('#users').DataTable( {
        //         "processing": true,
        //         "serverSide": true,
        //         "ajax": "http://127.0.0.1/market/public/api/admin/users"
        //     } );
        // } );
    }

    loadUser() {
        if (this.datatable) {
            this.datatable.destroy();
        }
        this.adminApi.getUsers({}).subscribe( res => {
            if (res.success) {

                this.temp = res.data;
                this.users = res.data;

                this.total.user_count = res.data.length;
                for (var i = 0; i < res.data.length; i ++) {
                    if (res.data[i].verify_status == 3) {
                        this.total.confirmed_count ++;
                    } else {
                        this.total.unconfirmed_count ++;
                    }
                }

                // if (res.data.length > 0) {
                //     let _parent = this;
                //     var timer = setInterval(function () {
                //         if (res.data.length == $('#users tbody tr').length) {
                //             _parent.datatable = $('#users').DataTable({
                //                 dom: 'Bfrtip',
                //                 buttons: [
                //                     'csv', 'excel'
                //                 ]
                //             });
                //             clearInterval(timer);
                //         }
                //     }, 100);
                // } else {
                //     this.datatable = null;
                // }
            }
        });
    }

    ngOnDestroy() {
    }

    ngAfterViewInit() {

    }

    onDetail(user_id) {
        this.router.navigate(['/panel/users/detail/' + user_id + '/profile']);
    }

    onDelete(user_id) {
        let _parent = this;
        swal({
            title: 'Are you sure?',
            text: 'Account will be deleted permanently.',
            type: 'warning',
            showCancelButton: true,
            confirmButtonClass: 'btn btn-success',
            cancelButtonClass: 'btn btn-danger',
            confirmButtonText: 'Yes',
            buttonsStyling: false
        }, function () {
            _parent.settings.loading = true;
            _parent.adminApi.deleteUser({
                id: user_id,
            }).subscribe(res => {
                _parent.settings.loading = false;

                if (res.success) {
                    _parent.loadUser();
                    _parent.notify.showNotification('Success', 'Account was deleted successfully.', 'success');
                } else {
                    _parent.notify.showNotification('Warning', res.error, 'warning');
                }
            }, err => {
                _parent.settings.loading = false;
            });
        });
    }

    onConfirm(user_id) {
        this.settings.loading = true;
        this.adminApi.confirmUser({
            id: user_id,
        }).subscribe(res => {
            this.settings.loading = false;

            if (res.success) {
                this.loadUser();
                this.notify.showNotification('Success', 'Account was confirmed successfully.', 'success');
            } else {
                this.notify.showNotification('Warning', res.error, 'warning');
            }
        }, err => {
            this.settings.loading = false;
        });
    }

    updateFilter(event) {
        const val = event.target.value.toLowerCase();

        const temp = this.temp.filter(user => user.name.toLowerCase().indexOf(val) > -1 || user.email.toLowerCase().indexOf(val) > -1 || !val);

        this.users = temp;
        // Whenever the filter changes, always go back to the first page
        this.table.offset = 0;
    }
}