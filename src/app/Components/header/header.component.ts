import { Component, OnInit } from '@angular/core';
import { FacebookService, InitParams, LoginResponse, LoginOptions, AuthResponse } from 'ngx-facebook';
import { ApiService } from 'src/app/api.service';
import { TestService } from 'src/app/Services/AuthGuardServices/test.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  user = 'User';
  Auth: any;

  constructor(private fb: FacebookService, private apiServices: ApiService, private testService: TestService) {
    let initParams: InitParams = {
      appId: '318830665647154',
      xfbml: true,
      version: 'v2.8'
    };
 
    fb.init(initParams);
  }
  
  loginWithFacebook(): void {
    const options: LoginOptions = {
      scope: 'public_profile,user_friends,email,pages_show_list',
      return_scopes: true,
      enable_profile_selector: true
    };
    
    this.fb.login(options)
      .then((response: LoginResponse) => {
        const authResponse: AuthResponse = this.fb.getAuthResponse();
        this.fb.api('/me?fields=id, email, name, first_name, last_name, picture, photos')
          .then((response) => {
            this.Auth = response
            this.apiServices.info = response;
            console.log('icicicici', this.Auth);
          })
      })
      .catch((error: any) => console.error(error));
    
      
  }

  logoutFb(): void {
    this.fb.logout().then(() => {
      this.Auth = '';
      this.apiServices.info = null;
      console.log('Logged out!')
    });
  }

  ngOnInit() {
  }

}
