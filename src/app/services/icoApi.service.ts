/**
 * Created by ApolloYr on 11/17/2017.
 */

import {Injectable} from '@angular/core';
import 'rxjs/add/operator/catch';
import {SettingsService} from './settings/settings.service';
import {Router} from '@angular/router';
import {HttpClient, HttpHeaders, HttpParams} from "@angular/common/http";
import * as _ from 'lodash';
import {Observable} from "rxjs";
import {Api} from "./api.service";

@Injectable()
export class IcoApi extends Api {

    // FTC Setting
    getFTCSetting(data): any {
        return this.get('/ico/ftc/setting', data);
    }

    getFTCStatistics(data): any {
        return this.get('/ico/ftc/sts', data);
    }
    // buy FTC
    buyFTC(data): any {
        return this.post('/ico/ftc/buy', data);
    }

    // STK Setting
    getSTKSetting(data): any {
        return this.get('/ico/stk/setting', data);
    }

    getSTKStatistics(data): any {
        return this.get('/ico/stk/sts', data);
    }
    // buy STK
    buySTK(data): any {
        return this.post('/ico/stk/buy', data);
    }
}

