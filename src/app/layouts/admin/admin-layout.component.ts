import {Component, OnInit, OnDestroy, ViewChild, HostListener, AfterViewInit} from '@angular/core';
import {Router, NavigationEnd} from '@angular/router';
import {Subscription} from 'rxjs/Subscription';
import {LocationStrategy, PlatformLocation, Location} from '@angular/common';
import 'rxjs/add/operator/filter';

declare const $: any;

@Component({
    selector: 'app-layout',
    templateUrl: './admin-layout.component.html',
    styleUrls: ['./admin-layout.component.scss']
})

export class AdminLayoutComponent implements OnInit, AfterViewInit {

    constructor(private router: Router, location: Location) {
    }

    ngOnInit() {
    }

    ngAfterViewInit() {
    }
}
