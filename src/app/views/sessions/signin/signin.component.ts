import { Component, OnInit } from '@angular/core';
import { SharedAnimations } from 'src/app/shared/animations/shared-animations';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { AuthService } from '../../../shared/services/auth.service';
import { Router, RouteConfigLoadStart, ResolveStart, RouteConfigLoadEnd, ResolveEnd } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { ToastrService } from 'ngx-toastr';

@Component({
    selector: 'app-signin',
    templateUrl: './signin.component.html',
    styleUrls: ['./signin.component.scss'],
    animations: [SharedAnimations]
})
export class SigninComponent implements OnInit {
    loading: boolean;
    loadingText: string;
    signinForm: FormGroup;
    constructor(
        private fb: FormBuilder,
        private auth: AuthService,
        private router: Router,private http: HttpClient,private toastr: ToastrService
    ) { }

    ngOnInit() {
        this.router.events.subscribe(event => {
            if (event instanceof RouteConfigLoadStart || event instanceof ResolveStart) {
                this.loadingText = 'Loading Dashboard Module...';

                this.loading = true;
            }
            if (event instanceof RouteConfigLoadEnd || event instanceof ResolveEnd) {
                this.loading = false;
            }
        });

        this.signinForm = this.fb.group({
            email: ['', Validators.required],
            password: ['', Validators.required]
        });
    }

    signin() {
        const usersign = {
            "email":this.signinForm.value.email,
            "password":this.signinForm.value.password
        }
        this.loading = true;
        this.loadingText = 'Sigining in...';
        this.http.post('http://localhost:6060/account/login', usersign,{ responseType: 'text'}).subscribe(res => {
    console.log(res)
    if ((res=="Mot de passe incorrecte") ||(res=="Email invalide") ) {
        this.toastr.error('Verify your credentials!', 'Error!', { timeOut: 3000 });
        this.loading = false;

    }   else {
        this.toastr.success('Login successfully!', 'Success!', { timeOut: 3000 });

        this.router.navigateByUrl('/dashboard/v1');
                this.loading = false;

    }



            });
    }

}
