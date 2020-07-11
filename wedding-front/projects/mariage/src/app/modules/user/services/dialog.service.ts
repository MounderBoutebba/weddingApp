import { Injectable } from '@angular/core';
import { MatDialogConfig, MatDialog } from '@angular/material/dialog';
import { AddCheckboxOptionDialogComponent } from '../components/company/mat-dialogs/add-checkbox-option-dialog/add-checkbox-option-dialog.component';
import { AddRadioOptionDialogComponent } from '../components/company/mat-dialogs/add-radio-option-dialog/add-radio-option-dialog.component';
import { AddToggleOptionDialogComponent } from '../components/company/mat-dialogs/add-toggle-option-dialog/add-toggle-option-dialog.component';
import { ConfirmDialogComponent } from '../components/company/mat-dialogs/confirm-dialog/confirm-dialog.component';
import { ErreurDialogComponent } from '../components/company/mat-dialogs/erreur-dialog/erreur-dialog.component';
import { PaymentInfoDialogComponent } from '../components/company/mat-dialogs/payment-info-dialog/payment-info-dialog.component';

@Injectable({
    providedIn: 'root'
})
export class DialogService {

    constructor(public dialog: MatDialog) { }
    createDialog(component: any, config: {autoFocus: boolean, disableClose: boolean, width?: string, height?: string}, data?: any) {
        const dialogConfig = new MatDialogConfig();
        dialogConfig.autoFocus = config.autoFocus;
        dialogConfig.disableClose = config.disableClose;
        if (config.width) { dialogConfig.width = config.width; }
        if (config.height) { dialogConfig.height = config.height; }
        dialogConfig.data = data;
        return this.dialog.open(component, dialogConfig);
    }
    openAddCheckBoxOptionDialog(description: string) {
        // tslint:disable-next-line:max-line-length
        const dialogRef = this.createDialog(AddCheckboxOptionDialogComponent, {autoFocus: false, disableClose: true, width: '600px'}, {description});
        return dialogRef.afterClosed().toPromise();
    }
    openAddRadioOptionDialog(type: string, description: string) {
        // tslint:disable-next-line:max-line-length
        const dialogRef = this.createDialog(AddRadioOptionDialogComponent, {autoFocus: false, disableClose: true, width: '600px'}, {type, description});
        return dialogRef.afterClosed().toPromise();
    }
    openAddToggleOptionDialog(type: string, description: string) {
        const width = description === 'Voitures' || description === 'Bus' ? '800px' : '600px';
        // tslint:disable-next-line:max-line-length
        const dialogRef = this.createDialog(AddToggleOptionDialogComponent, {autoFocus: false, disableClose: true, width}, {type, description});
        return dialogRef.afterClosed().toPromise();
    }
     openConfirmDialog() {
        const dialogRef = this.createDialog(ConfirmDialogComponent, {autoFocus: false, disableClose: true, width: '600px'});
        return dialogRef.afterClosed();
    }
     // tslint:disable-next-line:max-line-length
     openPaymentInfoDialog(location: {address: string, lng: number, lat: number}, user: {firstname: string, lastname: string, email: string, phone: string}, companyName: string) {
        // tslint:disable-next-line:max-line-length
        const dialogRef = this.createDialog(PaymentInfoDialogComponent, {autoFocus: false, disableClose: true, width: '1200px'}, {location, user, companyName});
        return dialogRef.afterClosed();
    }
     openErrorDialog(fieldDisplayName: string, field?: boolean) {
        // tslint:disable-next-line:max-line-length
        const dialogRef = this.createDialog(ErreurDialogComponent, {autoFocus: false, disableClose: true, width: '600px'}, {fieldDisplayName, field});
        return dialogRef.afterClosed();
    }
}
