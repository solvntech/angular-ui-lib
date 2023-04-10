import {EventEmitter, Injectable, OnDestroy, Output} from '@angular/core';
import { Subscription } from 'rxjs';

@Injectable()
export class DefaultComponent implements OnDestroy {
    /**
     * emit event trigger when all _promises called
     * @type {EventEmitter<any>}
     */
    @Output() onPromise: EventEmitter<any> = new EventEmitter<any>();
    _promises: Promise<any>[] = [];

    _subscriptionList?: Subscription;
    _isLoading = false;

    constructor() {
        // when init, unsubscribe all
        this.unsubscribeAll();
    }

    /**
     * add subscriptions to component storage
     * @param subscriptions
     */
    addSubscribes(...subscriptions: any) {
        subscriptions.forEach((el: any) => {
            this._subscriptionList?.add(el);
        });
    }

    /**
     * unsubscribe all subscription which add into the component
     * it is important to prevent subscription still exist when component is destroyed
     */
    unsubscribeAll() {
        if (this._subscriptionList) {
            this._subscriptionList.unsubscribe();
        }
        this._subscriptionList = new Subscription();
    }

    /**
     * IMPORTANT
     * when destroyed, unsubscribe all
     */
    ngOnDestroy(): void {
        this.unsubscribeAll();
    }

    /**
     * add promises into an array
     * @param promises
     */
    addPromises(...promises: Promise<any>[]): void {
        promises.forEach((el) => {
            this._promises.push(el);
        });

        this.onPromise.emit(
            Promise.all(this._promises).then(() => {
                this._promises = [];
            }),
        );
    }

    /**
     * get list of current stored promises
     * @returns {Promise<any>[]}
     */
    get promises() {
        return this._promises;
    }
}
