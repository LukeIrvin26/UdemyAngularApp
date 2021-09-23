import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Permission } from '../../../interfaces/permission';
import { PermissionService } from '../../../services/permission.service';

@Component({
  selector: 'app-role-create',
  templateUrl: './role-create.component.html',
  styleUrls: ['./role-create.component.css'],
})
export class RoleCreateComponent implements OnInit {
  form: FormGroup = this.formBuilder.group({
    name: '',
  });

  permissions: Permission[] = [];

  constructor(
    private formBuilder: FormBuilder,
    private permissionService: PermissionService
  ) {}

  ngOnInit(): void {
    this.permissionService
      .all()
      .subscribe((permissions) => (this.permissions = permissions));
  }
}
