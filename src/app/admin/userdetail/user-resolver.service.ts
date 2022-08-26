import {Injectable} from '@angular/core';
import {Router, Resolve, RouterStateSnapshot, ActivatedRouteSnapshot} from '@angular/router';
import {AdminApi} from "../../services/adminApi.service";

@Injectable()
export class UserResolver implements Resolve<any> {

    constructor(private adminApi: AdminApi,
                private router: Router) {
    }

    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Promise<any> {
        let user_id = route.params['user_id'];

        return new Promise((resolve, reject) => {
            this.adminApi.getUserById(user_id).subscribe(res => {
                if (res.success) {
                    resolve(res.user);
                } else {
                    this.router.navigate(['admin/users']);
                    resolve(null);
                }
            }, err => {
                this.router.navigate(['admin/users']);
                resolve(null);
            });
        });
    }
}