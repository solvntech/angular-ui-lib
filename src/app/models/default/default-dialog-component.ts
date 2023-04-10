import { DefaultComponent } from '@models/default';
import { Injectable } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';

@Injectable()
export class DefaultDialogComponent extends DefaultComponent {
    static DEFAULT_WIDTH: any = '90vw';
    static DEFAULT_HEIGHT: any = 'auto';

    constructor(public dialogRef: MatDialogRef<any>, ...args: unknown[]) {
        super();
        this.dialogRef.backdropClick().subscribe(() => {
            this.onClose();
        });
    }

    /**
     * close dialog
     */
    onClose() {
        this.dialogRef.close(false);
    }

    /**
     * close and emit data to parent
     * @private
     * @param arg
     */
    onOk(arg: any = true) {
        this.dialogRef.close(arg);
    }
}

export namespace DefaultDialogComponent {
    export enum State {
        OPENING,
        CLOSED,
    }
}
