import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { AuthService } from '../../services/auth.service';
import { Auth } from '../../classes/auth';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css'],
})
export class ProfileComponent implements OnInit {
  infoForm: FormGroup = this.formBuilder.group({
    first_name: '',
    last_name: '',
    email: '',
  });

  passwordForm: FormGroup = this.formBuilder.group({
    password: '',
    password_confirm: '',
  });

  constructor(
    private formBuilder: FormBuilder,
    private authService: AuthService
  ) {}

  ngOnInit(): void {
    Auth.userEmitter.subscribe((user) => {
      this.infoForm.patchValue(user);
    });
  }

  infoSubmit(): void {
    this.authService
      .updateInfo(this.infoForm.getRawValue())
      .subscribe((user) => Auth.userEmitter.emit(user));
  }

  passwordSubmit(): void {
    this.authService
      .updatePassword(this.passwordForm.getRawValue())
      .subscribe((res) => console.log(res));
  }
}
