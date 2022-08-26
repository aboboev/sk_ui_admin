/**
 * Created by ApolloYr on 11/17/2017.
 */

import {Injectable} from '@angular/core';
import {AdminApi} from "../../services/adminApi.service";

@Injectable()
export class UserService {
    selectedUser: any = {};
    constructor(
        public api: AdminApi
    ) {
    }

    getUserBalance() {
        this.api.getUserBalance({
            user_id: this.selectedUser.id
        }).subscribe( res => {
            if (res.success) {
                this.selectedUser.balance = res.balance;
            }
        });
    }

    getBalance(coin) {
        if (this.selectedUser.balance && this.selectedUser.balance[coin] && this.selectedUser.balance[coin] != '') {
            return this.selectedUser.balance[coin];
        } else {
            return 0;
        }
    }
}

