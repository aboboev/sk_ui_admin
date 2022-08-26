import {Component, AfterViewInit, OnInit, OnDestroy} from '@angular/core';
import {SettingsService} from "../../../services/settings/settings.service";
import {BalanceService} from "../../../services/balance.service";
import {Notifications} from "../../../services/notifications.service";
import {PusherService} from "../../../services/pusher.service";
import {SystemService} from "../../../services/system.service";
import {UserService} from "../../service/user.service";
import {AdminApi} from "../../../services/adminApi.service";

declare const swal: any;
declare const $: any;
@Component({
    templateUrl: './detailinfo.component.html',
    styleUrls: ['./detailinfo.component.scss']
})
export class DetailInfoComponent implements OnInit, AfterViewInit, OnDestroy {
    profile: any = [];

    constructor(public api: AdminApi,
                public settings: SettingsService,
                public balance: BalanceService,
                public notify: Notifications,
                public pusher: PusherService,
                public system: SystemService,
                public user: UserService
    ) {


    }

    ngOnInit() {
        this.api.getUserProfile({
            user_id: this.user.selectedUser.id
        }).subscribe( res => {
            if (res.success) {
                this.profile = res.data;

                this.profile.email = this.user.selectedUser.email;
                this.profile.close = this.user.selectedUser.close;
            }
        });
    }

    ngOnDestroy() {
    }

    ngAfterViewInit() {
    }


    fileChangeListener($event) {
        let image: any = new Image();
        let file: File = $event.target.files[0];

        if (!file) {
            return;
        }

        let filename = file.name;
        let extension = filename.substring(filename.lastIndexOf('.') + 1).toLowerCase();

        if (extension == 'gif' || extension == 'png' || extension == 'bmp' || extension == 'jpeg' || extension == 'jpg') {

            this.settings.loading = true;
            this.api.uploadFile(file).subscribe(res => {
                this.settings.loading = false;
                if (res.success) {
                    this.profile.idcard_url = res.url;
                    this.profile.attach_name = file.name;
                }
            }, err => {
                this.settings.loading = false;
            });
        } else {
            this.notify.showNotification('Warning', 'Please select image file', 'warning');
        }
    }

    onChooseFile() {
        $('#inputFile').click();
    }

    saveProfile() {
        if (!this.profile.firstname || this.profile.firstname == '') {
            this.notify.showNotification('Warning', 'Please enter first name.', 'warning');
            return;
        }
        if (!this.profile.surname || this.profile.surname == '') {
            this.notify.showNotification('Warning', 'Please enter surname.', 'warning');
            return;
        }
        if (!this.profile.phone_number || this.profile.phone_number == '') {
            this.notify.showNotification('Warning', 'Please enter phone number.', 'warning');
            return;
        }

        this.settings.loading = true;
        this.api.updateUserProfile({
            id: this.profile.id,
            user_id: this.profile.user_id,
            email: this.profile.email,
            firstname: this.profile.firstname,
            surname: this.profile.surname,
            phone_number: this.profile.phone_number,
            address: this.profile.address,
            attach_name: this.profile.attach_name,
            verify_type: this.profile.verify_type,
            idcard_url: this.profile.idcard_url,
            idcard_number: this.profile.idcard_number,
            verify_status: this.profile.verify_status,
            changed_email: this.profile.email != this.user.selectedUser.email,
            allowed_g2f: this.profile.allowed_g2f,
            iban_code: this.profile.iban_code
        }).subscribe(res => {
            this.settings.loading = false;
            if (res.success) {
                this.notify.showNotification('Success', 'Profile was updated successfully.', 'success');
            } else {
                this.notify.showNotification('Warning', res.error, 'warning');
            }
        }, err => {
            this.settings.loading = false;
        });
    }

    closeAccount() {
        this.settings.loading = true;
        this.api.closeAccount({
            user_id: this.user.selectedUser.id
        }).subscribe(res => {
            this.settings.loading = false;
            if (res.success) {
                this.profile.close = 1;
                this.notify.showNotification('Success', 'Account was closed successfully.', 'success');
            } else {
                this.notify.showNotification('Warning', res.error, 'warning');
            }
        }, err => {
            this.settings.loading = false;
        });

    }

    openAccount() {
        this.settings.loading = true;
        this.api.openAccount({
            user_id: this.user.selectedUser.id
        }).subscribe(res => {
            this.settings.loading = false;
            if (res.success) {
                this.profile.close = 0;
                this.notify.showNotification('Success', 'Account was opened successfully.', 'success');
            } else {
                this.notify.showNotification('Warning', res.error, 'warning');
            }
        }, err => {
            this.settings.loading = false;
        });
    }
}