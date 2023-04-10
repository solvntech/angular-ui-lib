import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MainLayoutComponent } from './main-layout/main-layout.component';
import {MatSidenavModule} from "@angular/material/sidenav";

@NgModule({
    declarations: [MainLayoutComponent],
    imports: [CommonModule, MatSidenavModule],
    exports: [MainLayoutComponent],
})
export class LayoutsModule {}
