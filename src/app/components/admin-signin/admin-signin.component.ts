import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import { Request } from 'src/app/request.model';
@Component({
  selector: 'app-admin-signin',
  templateUrl: './admin-signin.component.html',
  styleUrls: ['./admin-signin.component.css']
})
export class AdminSigninComponent implements OnInit {


  username: string = '';
	password : string = '';

	isSignedin = false;

	error: string = '';

	constructor(private router: Router, private authService: AuthService) {}

	ngOnInit() {
		this.isSignedin = this.authService.isUserSignedin();

		if(this.isSignedin) {
			this.router.navigateByUrl('admin-dashboard');
      
		}
	}

	doSignin() {
		if(this.username !== '' && this.username !== null && this.password !== '' && this.password !== null) {
			const request: Request = {
        username: this.username,
        password: this.password,
        email: '',
        full_name: '',
        contact: '',
        address: ''
      };

			this.authService.signin(request).subscribe((_result: any)=> {
				//this.router.navigate(['/home']);
				this.router.navigateByUrl('admin-dashboard');
            window.location.reload();
			}, () => {
				this.error = 'Invalid User Name or Password ';
			});
		} else {
			this.error = 'Invalid User Name or Password';
		}
	}
}
