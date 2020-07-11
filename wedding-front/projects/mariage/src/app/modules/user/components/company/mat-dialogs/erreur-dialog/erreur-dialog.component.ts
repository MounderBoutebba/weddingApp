import { Component, OnInit, Optional, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-erreur-dialog',
  templateUrl: './erreur-dialog.component.html',
  styleUrls: ['./erreur-dialog.component.scss']
})
export class ErreurDialogComponent implements OnInit {
  public isHandset$: Observable<boolean>;
  public description: string;
  constructor(public dialogRef: MatDialogRef<ErreurDialogComponent>,
              @Optional()  @Inject(MAT_DIALOG_DATA) public data: any,
              private readonly translateService: TranslateService,
              private readonly breakpointObserver: BreakpointObserver) {
                this.isHandset$ = this.breakpointObserver.observe(Breakpoints.Handset)
                .pipe(map(result => result.matches));
              }

  ngOnInit(): void {
    if (this.data.field) {
      this.description = `${this.translateService.instant(this.data.fieldDisplayName)} ${this.translateService.instant('is required')}`;
    } else {
      this.description = this.translateService.instant(this.data.fieldDisplayName);
    }
  }
  cancel() {
    this.dialogRef.close(false);
  }
}
