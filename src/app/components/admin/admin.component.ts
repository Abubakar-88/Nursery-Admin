import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css']
})
export class AdminComponent implements OnInit {


  isSignedin:  boolean = false;

	signedinUser: string = '';

	greeting: any[] = [];

	constructor(private route: ActivatedRoute,
     private router: Router,
     private http: HttpClient,
      private authService: AuthService) {}

	ngOnInit() {
		this.isSignedin = this.authService.isUserSignedin();
		this.signedinUser = this.authService.getSignedinUser();

		if(!this.authService.isUserSignedin()) {
			this.router.navigateByUrl('admin-signin');
		}


  }


	doSignout() {
		this.authService.signout();
    window.location.reload();
	}

}
