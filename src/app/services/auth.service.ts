import { Injectable } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Request } from '../request.model';
import { Observable } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

	
	private baseUrl = 'http://localhost:8083/api/auth/';
	private baseCustUrl = 'http://localhost:8083/api/auth/customer';

	constructor(private route: ActivatedRoute, private router: Router, private http: HttpClient) { }

	signin(request: Request): Observable<any> {
		return this.http.post<any>(this.baseUrl + 'signin', request, {headers: new HttpHeaders({ 'Content-Type': 'application/json' })}).pipe(map((resp) => {
			sessionStorage.setItem('user', request.username);
			sessionStorage.setItem('token', 'HTTP_TOKEN ' + resp.token);
			return resp;
		}));
	}

	signup(request: Request): Observable<any> {
		return this.http.post<any>(this.baseUrl + 'signup', request, {headers: new HttpHeaders({ 'Content-Type': 'application/json' }), responseType: 'text' as 'json'}).pipe(map((resp) => {                                                         
			return resp;
		}));
	}

	signout() {
		sessionStorage.removeItem('user');
		sessionStorage.removeItem('token');

		this.router.navigateByUrl('signin');
	}

	isUserSignedin() {
		return sessionStorage.getItem('token') !== null;
	}

	getSignedinUser() {
		return sessionStorage.getItem('user') as string;
	}

	getToken() {
		let token = sessionStorage.getItem('token') as string;
		return token;
	}


	
}
