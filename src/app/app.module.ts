import { CommonModule } from '@angular/common';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatRadioModule } from '@angular/material/radio';
import { MatSelectModule } from '@angular/material/select';
import { MatSliderModule } from '@angular/material/slider';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatMenuModule } from '@angular/material/menu';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatBadgeModule } from '@angular/material/badge';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatListModule } from '@angular/material/list';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatCardModule } from '@angular/material/card';
import { MatStepperModule } from '@angular/material/stepper';
import { MatTabsModule } from '@angular/material/tabs';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatButtonToggleModule } from '@angular/material/button-toggle';
import { MatChipsModule } from '@angular/material/chips';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatDialogModule } from '@angular/material/dialog';
import { MatSortModule } from '@angular/material/sort';
import { MatPaginatorModule } from '@angular/material/paginator';    
import { MatSnackBarModule } from '@angular/material/snack-bar';





import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AdminComponent } from './components/admin/admin.component';
import { AdminDashboardComponent } from './components/admin-dashboard/admin-dashboard.component';
import { AdminSigninComponent } from './components/admin-signin/admin-signin.component';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { HttpInterceptorService } from './httpIntereeptor.service';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import {  RouterModule } from '@angular/router';
import { SideNavComponent } from './components/side-nav/side-nav.component';
import{ MatIconModule} from '@angular/material/icon';
import { AddProductComponent } from './products/add-product/add-product.component';
import { ProductListComponent } from './products/product-list/product-list.component';
import { OrderListComponent } from './components/order-list/order-list.component';
import { CategoryComponent } from './category/category/category.component';
import { UpdateProductComponent } from './components/update-product/update-product.component';
import { NgxPaginationModule } from 'ngx-pagination';

@NgModule({
  declarations: [
    
    AppComponent,
    AdminComponent,
    AdminDashboardComponent,
    AdminSigninComponent,
    SideNavComponent,
    AddProductComponent,
    ProductListComponent,
    OrderListComponent,
    CategoryComponent,
    UpdateProductComponent,
  ],
  imports: [
    NgxPaginationModule,
    MatIconModule,
    CommonModule,
    BrowserModule,
    MatDialogModule ,
    CommonModule,
    BrowserAnimationsModule,
    MatCheckboxModule,
    MatCheckboxModule,
    MatButtonModule,
    MatInputModule,
    MatAutocompleteModule,
    MatDatepickerModule,
    MatFormFieldModule,
    MatRadioModule,
    MatSelectModule,
    MatSliderModule,
    MatSlideToggleModule,
    MatMenuModule,
    MatSidenavModule,
    MatBadgeModule,
    MatToolbarModule,
    MatListModule,
    MatGridListModule,
    MatCardModule,
    MatStepperModule,
    MatTabsModule,
    MatExpansionModule,
    MatButtonToggleModule,
    MatChipsModule,
    MatProgressSpinnerModule,
    MatProgressBarModule,
    MatDialogModule,
    MatToolbarModule,
    MatSnackBarModule,
    MatSortModule,
    MatPaginatorModule,
    MatSliderModule,
    BrowserModule,
    AppRoutingModule,
    NgbModule,
    BrowserAnimationsModule,
    FormsModule,
    ReactiveFormsModule,
    AppRoutingModule,
    RouterModule,
    HttpClientModule,
  ],
  exports: [
    MatIconModule,
    MatButtonModule,
    MatToolbarModule,
    MatSidenavModule,
    MatBadgeModule,
    MatListModule,
    MatGridListModule,
    MatInputModule,
    MatFormFieldModule,
    MatSelectModule,
    MatRadioModule,
    MatDatepickerModule,
    MatChipsModule,
    MatToolbarModule,
    MatPaginatorModule,
    MatSliderModule,
    RouterModule
],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  providers: [MatDatepickerModule, {
    provide: HTTP_INTERCEPTORS ,
    useClass: HttpInterceptorService,
    multi: true
  }],
  bootstrap: [AppComponent]
})
export class AppModule { }
