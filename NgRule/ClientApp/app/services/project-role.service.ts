import { Injectable, Inject } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { Http } from '@angular/http';
import 'rxjs/Rx';

@Injectable()
export class ProjectRoleService {
    constructor(
        private _http: Http,
        @Inject('BASE_URL') private _baseUrl: string) {
    }

    getMenuDetails() {

        return new Promise((resolve, reject) => {
            this._http.get(this._baseUrl + 'api/SampleData/MenuData')
                .map(res => res.json())
                .catch((error: any) => {
                    console.error(error);
                    reject(error);
                    return Observable.throw(error.json().error || 'Server error');
                })
                .subscribe((data) => {
                    resolve(data);
                });
        });
    }
}  