import { Component, OnInit, Inject } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ConnectionType } from '../../../../auth/models/connectionType.model';
import { User } from '../../../../user/models/user.model';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { UserService } from '../../../../user/services/user.service';
import { AuthService } from 'projects/mariage/src/app/core/auth.service';

@Component({
  selector: 'app-admin-create-user-dialog.component.html',
  templateUrl: './admin-create-user-dialog.component.html.component.html',
  styleUrls: ['./admin-create-user-dialog.component.html.component.scss']
})
export class AdminCreateUserDialogComponent implements OnInit {

  userForm: FormGroup;
  connectionType: ConnectionType;
  selectedUser: User;

  constructor(
    private userFormBuilder: FormBuilder,
    public dialogRef: MatDialogRef<AdminCreateUserDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: User,
    private userService: UserService,
    private authService: AuthService) {
      this.userForm = this.userFormBuilder.group({
        email: ['', [Validators.required, Validators.email]],
        phone: this.userFormBuilder.group({
          country: ['', [Validators.required]],
          phoneNumber: ['', [Validators.required]],
        }),
        connectionType: ['', [Validators.required]],
        role: ['', [Validators.required]],
        password: [null, [Validators.required]]
      });
  }

  ngOnInit() {
    if (this.data) {
      this.userForm.patchValue(this.data);
      this.userForm.get('password').disable();
      this.userForm.get('connectionType').disable();
      this.userForm.get('role').disable();
    }
  }

  onSaveUser(event: Event) {
    event.preventDefault();
    if (!this.data) {
      this.authService.signup(this.userForm.value.email, this.userForm.value.password, this.userForm.value.role);
      return;
    }
    this.userService.patchUser(this.userForm.get('email').value, this.userForm.value).subscribe( res => {
      this.dialogRef.close();
    });
  }

  values() {
    return Object.keys(ConnectionType).filter(
      (type) => isNaN(<any>type) && type !== 'values'
    );
  }

}
