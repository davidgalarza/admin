import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../auth.service';
import {Router} from "@angular/router";
declare var $:any;

@Component({
    moduleId:module.id,
    selector: 'login-cmp',
    templateUrl: './login.component.html'
})

export class LoginComponent implements OnInit{
    test : Date = new Date();
    email: string;
    password: string;
    constructor(public authService: AuthService, private router: Router) {
      this.authService.user.subscribe(auth => {
            if (auth) {
                this.router.navigateByUrl('/home');
            }
      });
    }
    checkFullPageBackgroundImage(){
        var $page = $('.full-page');
        var image_src = $page.data('image');

        if(image_src !== undefined){
            var image_container = '<div class="full-page-background" style="background-image: url(' + image_src + ') "/>'
            $page.append(image_container);
        }
    };
    ngOnInit(){
        this.checkFullPageBackgroundImage();

        setTimeout(function(){
            // after 1000 ms we add the class animated to the login/register card
            $('.card').removeClass('card-hidden');
        }, 700)
    }
    login() {
        this.authService.login(this.email, this.password);
        this.router.navigateByUrl('/');
    }
}
