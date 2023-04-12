import { Component, OnInit } from '@angular/core';
import { SharedAnimations } from 'src/app/shared/animations/shared-animations';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { User } from '../../chat/chat.service';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';


@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss'],
  animations: [SharedAnimations]
})
export class SignupComponent implements OnInit {
  signupForm: FormGroup;

  constructor(private fb: FormBuilder,private http: HttpClient, private toastr: ToastrService,private router: Router
    )  { }
 


  ngOnInit() {
    this.signupForm = this.fb.group({
      username: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
      repassword: ['', Validators.required]
    });
  }
  // Create a function to handle form submission
  onSubmit() {
    if ( this.signupForm.valid){
      const obj = {
        "username":this.signupForm.value.username,
        "email":this.signupForm.value.email,
        "password":this.signupForm.value.password,
        "passwordConfirm":this.signupForm.value.repassword
        
        }
        console.log(obj);
        this.registerUser(obj)
    }
    else {
      this.toastr.error('Email Incorrect and Password needs to be more than 6 characters!', 'Error!', { timeOut: 3000 });

    }
  
  }

  
// Register user
registerUser(user: any) {

   this.http.post('http://localhost:6060/account/registrationv2', user,{ responseType: 'text'}).subscribe(res => {
    console.log(res)
    if (res=="account registered"){
      this.toastr.success('Account Registred!', 'Success!', { timeOut: 3000 });
      this.signupForm.reset()

      this.router.navigate(['/sessions/signin']);

    }
    else {
      this.toastr.error('Verify your Email or Password!', 'Error!', { timeOut: 3000 });

    }
})
}

}
