import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CategoryComponent } from './category/category/category.component';
import { AdminDashboardComponent } from './components/admin-dashboard/admin-dashboard.component';
import { AdminSigninComponent } from './components/admin-signin/admin-signin.component';
import { AdminComponent } from './components/admin/admin.component';
import { OrderListComponent } from './components/order-list/order-list.component';
import { UpdateProductComponent } from './components/update-product/update-product.component';
import { AddProductComponent } from './products/add-product/add-product.component';
import { ProductListComponent } from './products/product-list/product-list.component';

const routes: Routes = [
  { path: '', redirectTo: '/admin-dashboard', pathMatch: 'full' },
  {path: '', redirectTo:'/product-list', pathMatch: 'full'},
  {path: 'admin-dashboard', component: AdminDashboardComponent},
  { path: 'admin',  component: AdminComponent},
  { path: 'admin-signin', component:AdminSigninComponent },
  { path: 'add-product', component: AddProductComponent },
  { path: 'product-list', component: ProductListComponent },
  {path: 'order-list', component: OrderListComponent},
  {path: 'category', component: CategoryComponent},
  {path: 'update-product/:id', component: UpdateProductComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
