import { Injectable } from '@angular/core';

import { HttpClient, HttpHeaders } from '@angular/common/http';
import { LoginData } from '../logindata.model';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { CookieService } from 'angular2-cookie/services/cookies.service';

@Injectable()
export class LoginService {
    
    constructor(private http : HttpClient, private cookieService: CookieService) { }

    private options = {
        headers : new HttpHeaders ({
            'Content-Type' : 'application/json'
        })
    };

    private rootUrl = "http://localhost:1337/api/login";
    private tokenCookie: string;

    private cookieSetter(cookie: string) {
        const cookieData = cookie.split('=');
        const name = cookieData[0];
        const value = cookieData[1].split(';')[0];
        this.cookieService.put(name, value);
    }

    login(userName:string, password:string) : Observable<LoginData> {
        return this.http.post<LoginData>( this.rootUrl, {
            headers: this.options.headers,
            body : {
                username : userName,
                password : password
            }
        }).pipe(tap(data => {
            this.cookieSetter(data.cookie[0]);
            this.tokenCookie = data.cookie[0];
            return data;
        }));
    }

    get token() {
        return this.tokenCookie;
    }

}
