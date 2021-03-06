import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormGroup } from '@angular/forms';
import { Permission } from '../../../interfaces/permission';
import { PermissionService } from '../../../services/permission.service';
import { RoleService } from '../../../services/role.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-role-create',
  templateUrl: './role-create.component.html',
  styleUrls: ['./role-create.component.css'],
})
export class RoleCreateComponent implements OnInit {
  form: FormGroup = this.formBuilder.group({
    name: '',
    permissions: this.formBuilder.array([]),
  });

  permissions: Permission[] = [];

  constructor(
    private formBuilder: FormBuilder,
    private permissionService: PermissionService,
    private roleService: RoleService,
    private router: Router
  ) {}

  get permissionArray(): FormArray {
    return this.form.get('permissions') as FormArray;
  }

  ngOnInit(): void {
    this.permissionService.all().subscribe((permissions) => {
      this.permissions = permissions;
      this.permissions.forEach((p) => {
        this.permissionArray.push(
          this.formBuilder.group({
            value: false,
            id: p.id,
          })
        );
      });
    });
  }

  submit(): void {
    const formData = this.form.getRawValue();
    const data = {
      name: formData.name,
      permissions: formData.permissions
        .filter((p: any) => p.value === true)
        .map((p: any) => p.id),
    };

    this.roleService
      .create(data)
      .subscribe(() => this.router.navigate(['/roles']));
  }
}
