import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css', '../public.component.css'],
})
export class LoginComponent implements OnInit {
  form: FormGroup = this.formBuilder.group({
    email: '',
    password: '',
  });

  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private authService: AuthService
  ) {}

  ngOnInit(): void {}

  submit(): void {
    this.authService.login(this.form.getRawValue()).subscribe(() => {
      this.router.navigate(['/']);
    });
  }
}
