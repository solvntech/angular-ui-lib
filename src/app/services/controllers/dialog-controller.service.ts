import { Injectable } from '@angular/core';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { DefaultDialogComponent } from '@models/default';
import { BehaviorSubject } from 'rxjs';

@Injectable({
    providedIn: 'root',
})
export class DialogControllerService {
    _openingDialogs: MatDialogRef<any, any>[] = [];
    _Observable_Is_Opening_Dialogs: BehaviorSubject<DefaultDialogComponent.State> =
        new BehaviorSubject<DefaultDialogComponent.State>(DefaultDialogComponent.State.CLOSED);

    constructor(private _MatDialog: MatDialog) {}

    open(classComp: typeof DefaultDialogComponent, data: object = {}, options: any = {}): Promise<any> {
        // default not allow close when click backdrop
        options['disableClose'] = true;

        // widthq
        options['width'] = classComp.DEFAULT_WIDTH;
        options['height'] = classComp.DEFAULT_HEIGHT;
        options['maxHeight'] = '80vh';

        const dialog = this._MatDialog.open(classComp, {
            ...options,
            data: data,
            autoFocus: false,
        });

        // tmp store dialog
        this._addDialog(dialog);

        return new Promise((resolve, reject) => {
            dialog.afterClosed().subscribe((result) => {
                // remove dialog from the tmp stored
                this._removeDialog(dialog);
                resolve(result);
            });
        });
    }

    /**
     * add dialog to storage to check opening status
     * @param dialog
     * @private
     */
    private _addDialog(dialog: MatDialogRef<any, any>) {
        this._openingDialogs.push(dialog);
        this._Observable_Is_Opening_Dialogs.next(
            this._openingDialogs.length > 0 ? DefaultDialogComponent.State.OPENING : DefaultDialogComponent.State.CLOSED
        );
    }

    /**
     * remove dialog to storage to check opening status
     * @param dialog
     * @private
     */
    private _removeDialog(dialog: MatDialogRef<any, any>) {
        this._openingDialogs = this._openingDialogs.filter(item => item !== dialog);
        this._Observable_Is_Opening_Dialogs.next(
            this._openingDialogs.length > 0 ? DefaultDialogComponent.State.OPENING : DefaultDialogComponent.State.CLOSED
        );
    }
}
