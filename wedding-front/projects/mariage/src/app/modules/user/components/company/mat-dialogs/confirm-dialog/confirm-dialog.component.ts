import { Component, OnInit, Optional, Inject } from '@angular/core';
import { Observable } from 'rxjs';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { map } from 'rxjs/operators';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-confirm-dialog',
  templateUrl: './confirm-dialog.component.html',
  styleUrls: ['./confirm-dialog.component.scss']
})
export class ConfirmDialogComponent implements OnInit {
  public isHandset$: Observable<boolean>;
  public description = 'Exit this page?';
  constructor(public dialogRef: MatDialogRef<ConfirmDialogComponent>,
              @Optional()  @Inject(MAT_DIALOG_DATA) public data: any,
              private readonly breakpointObserver: BreakpointObserver) {
    this.isHandset$ = this.breakpointObserver.observe(Breakpoints.Handset)
    .pipe(map(result => result.matches));
}
  ngOnInit() {
  }
  cancel() {
    this.dialogRef.close(false);
  }
  save() {
    this.dialogRef.close(true);
  }
}
