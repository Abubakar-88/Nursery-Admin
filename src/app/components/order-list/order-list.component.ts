import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { MatGridTileHeaderCssMatStyler } from '@angular/material/grid-list';
import { Router } from '@angular/router';
import { Customer } from 'src/app/common/customer';
import { Order } from 'src/app/common/order';
import { AuthService } from 'src/app/services/auth.service';
import { CustomerService } from 'src/app/services/customer.service';
import { OrderService } from 'src/app/services/order.service';

@Component({
  selector: 'app-order-list',
  templateUrl: './order-list.component.html',
  styleUrls: ['./order-list.component.css']
})
export class OrderListComponent implements OnInit {

  currentOrder: Order = new Order;
  currentIndex = -1;
  title = '';
  page = 1;
  count = 0;
  pageSize = 3;
  pageSizes = [3, 10, 15, 20];
  customers = new Array();

  orders = new Array();
  isSignedin:  boolean = false;
	signedinUser: string = '';
  customer!: number;
  billingAddress:number=0;
  shippingAddress: number=0;

  constructor(private orderService: OrderService, private router: Router, private customerService: CustomerService, private authService: AuthService) { }

  ngOnInit(): void {
    this.getAllOrderList();

    this.isSignedin = this.authService.isUserSignedin();
		this.signedinUser = this.authService.getSignedinUser();

		if(!this.authService.isUserSignedin()) {
			this.router.navigateByUrl('admin-signin');
		}


  }

  getRequestCustomer( page: number, pageSize: number): any[]{
    // tslint:disable-next-line:prefer-const
    let orders = [];
    
    if (page) {
      orders[page] = page - 1;
    }
    if (pageSize) {
      orders[pageSize] = pageSize;
    }
    return orders;
  }
  
  handlePageChange(event: number): void {
    this.page = event;
    this.getAllOrderList();
  }
  handlePageSizeChange(event: any): void {
    this.pageSize = event.target.value;
    this.page = 1;
    this.getAllOrderList();
  }







  changeCustomer(value: any) {
    console.log(value);
  }
  getAllOrderList():void{
    this.orderService.getAllOrderList().subscribe(
      (response: Order[]) => {
        this.orders = response;
        console.log(this.orders);
      },
      (error: HttpErrorResponse) => {
               alert(error.message);
             }
    );
  }

  searchOrder(key: string):void{
    console.log(key);
    const results: Order[] = [];
    for(const order of this.orders){
      if(order.orderTrackingNumber.toLocaleLowerCase().indexOf(key.toLowerCase()) !=-1) {
        results.push(order);
      }
    }
    this.orders = results;
    if(results.length === 0 || !key){
     
      this.getAllOrderList();
     
    }
    
  } 

  getCustomerName(order:Order) {
        for(let index =0; index < this.customers.length; index++){
          if(this.customers[index].id === order.customer){
            return this.customers[index].firstName;
          }
          console.log("customer id: "+ this.customers[index].firstName);
        }
  }


  // getCategoryName(product: Product): any{
  //   for (let index = 0; index < this.categories.length; index++) {
  //     if (this.categories[index].id === product.category_id) {
  //       return this.categories[index].categoryName;
        
  //     }      
  
  //     console.log("category name:"+ this.categories[index].categoryName);
  //   }
  // }
  
// getCustomer(customer: Customer){
//    this.customerService.getAllCustomers().subscribe(res =>{
//      console.log('Customers=' + JSON.stringify(res))
//      this.customers =res;
//    })
// }




  // getCategory(category: ProductCategory) {
  //   this.updateCategoryPath(category);
  //    this.categoryService.getCategories().subscribe(res => {
  //      console.log('Product Categories=' + JSON.stringify(res));
  //      this.productCategories = res;
  //    });
  //  }


//  getProduct():void {
//    this.productService.getAllProducts().subscribe (
//      (response: Product[])=> {
//        this.products = response;
//        console.log(this.products);
//      },
//      (error: HttpErrorResponse) => {
//        alert(error.message);
//      }
//    );
// }


}
