import {Component, AfterViewInit, OnInit} from '@angular/core';
import {SettingsService} from "../../../services/settings/settings.service";

//Metadata
export interface RouteInfo {
    path: string;
    title: string;
    type: string;
    icon_class: string;
    collapse?: string;
    children?: ChildrenItems[];
    role: string;
}

export interface ChildrenItems {
    path: string;
    title: string;
    ab: string;
    type?: string;
}

//Menu Items
export const ROUTES: RouteInfo[] = [
    {
        path: '/panel/dashboard',
        title: 'Dashboard',
        type: 'link',
        icon_class: 'mdi-view-dashboard',
        role: 'admin'
    }, {
        path: '/panel/users',
        title: 'Users',
        type: 'link',
        icon_class: 'mdi-account',
        role: 'admin'
    }, {
        path: '/panel/userverify',
        title: 'User Verify',
        type: 'link',
        icon_class: 'mdi-account-off',
        role: 'admin'
    }, {
        path: '/panel/marketorder',
        title: 'Market Orders',
        type: 'link',
        icon_class: 'mdi-view-week',
        role: 'admin'
    }, {
        path: '/panel/markethistory',
        title: 'Market History',
        type: 'link',
        icon_class: 'mdi-view-list',
        role: 'admin'
    }, {
        path: '/panel/depositpending',
        title: 'Deposit Pending',
        type: 'link',
        icon_class: 'mdi-view-grid',
        role: 'admin'
    }, {
        path: '/panel/competition',
        title: 'Competition',
        type: 'link',
        icon_class: 'mdi-view-week',
        role: 'admin'
    }, {
        path: '/panel/deposithistory',
        title: 'Deposit History',
        type: 'link',
        icon_class: 'mdi-view-headline',
        role: 'admin'
    }, {
        path: '/panel/withdrawpending',
        title: 'Withdraw Pending',
        type: 'link',
        icon_class: 'mdi-view-list',
        role: 'superadmin'
    }, {
        path: '/panel/withdrawhistory',
        title: 'Withdraw History',
        type: 'link',
        icon_class: 'mdi-view-sequential',
        role: 'admin'
    }, {
        path: '/panel/icohistory',
        title: 'ICO History',
        type: 'link',
        icon_class: 'mdi-view-quilt',
        role: 'admin'
    }, {
        path: '/panel/wallet',
        title: 'Wallet Setting',
        type: 'link',
        icon_class: 'mdi-wallet',
        role: 'admin'
    }, {
        path: '/panel/pairsetting',
        title: 'CoinPairs',
        type: 'link',
        icon_class: 'mdi-settings',
        role: 'superadmin'
    // }, {
    //     path: '/panel/icosetting',
    //     title: 'ICO Setting',
    //     type: 'link',
    //     icon_class: 'mdi-wallet'
    // }, {
    //     path: '/panel/ticket',
    //     title: 'Ticket',
    //     type: 'link',
    //     icon_class: 'mdi-contacts',
    //     role: 'admin'
    // }, {
    //     path: '/panel/pages',
    //     title: 'Pages',
    //     type: 'link',
    //     icon_class: 'mdi-help'
    },
];

@Component({
    selector: 'ap-admin-sidebar',
    templateUrl: './sidebar.component.html',
    styleUrls: ['./sidebar.component.scss']
})

export class AdminSidebarComponent implements OnInit,AfterViewInit {
    public menuItems: any[];

    constructor(public settings: SettingsService) {

    }

    ngOnInit() {
        if (this.settings.getUserSetting('role') == 'admin') {
            this.menuItems = ROUTES.filter(menuItem => menuItem.role === 'admin');
        } else if (this.settings.getUserSetting('role') == 'superadmin') {
            this.menuItems = ROUTES.filter(menuItem => menuItem);
        }

    }
    ngAfterViewInit() {
    }
}
