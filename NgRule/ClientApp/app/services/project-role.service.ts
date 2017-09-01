﻿import { Injectable, Inject } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { Http, Response, Headers, RequestOptions } from '@angular/http';
import 'rxjs/Rx';
import 'rxjs/add/operator/toPromise';

@Injectable()
export class ProjectRoleService {
    headers: Headers;
    options: RequestOptions;


    constructor(
        private _http: Http,
        @Inject('BASE_URL') private _baseUrl: string) {

        this.headers = new Headers({
            'Content-Type': 'application/json',
            'Accept': 'q=0.8;application/json;q=0.9'
        });

        this.options = new RequestOptions({ headers: this.headers });
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


    getExpression() {

        return new Promise((resolve, reject) => {
            this._http.get(this._baseUrl + 'api/SampleData/ExpressionData')
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


    saveExpression(expression: any) {
        let body = JSON.stringify(expression);
        return this._http
            .post(this._baseUrl + 'api/SampleData/ExpressionData', body, this.options)
            .toPromise();
    }  
}  