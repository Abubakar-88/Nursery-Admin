import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Customer } from 'src/app/common/customer';
import { Order } from 'src/app/common/order';
import { AuthService } from 'src/app/services/auth.service';
import { CustomerService } from 'src/app/services/customer.service';
import { OrderService } from 'src/app/services/order.service';

@Component({
  selector: 'app-admin-dashboard',
  templateUrl: './admin-dashboard.component.html',
  styleUrls: ['./admin-dashboard.component.css']
})
export class AdminDashboardComponent implements OnInit {
 
 
  currentCustomer: Customer = new Customer;
  currentIndex = -1;
  title = '';
  page = 1;
  count = 0;
  pageSize = 3;
  pageSizes = [3, 10, 15, 20];
 
  //authorization
  isSignedin:  boolean = false;
	signedinUser: string = '';
 
 
  // selected = 'today';
   totalCustomers: number = 0;
   totalActiveOrders: number = 0;
   totalEarning: number = 0;
   totalOrders!: Order[];
   customers: Customer[] = [];
   id!: number;
 
   constructor(
     private customerService: CustomerService,
     private orderService: OrderService,
      private authService: AuthService,
     private router: Router
   ) {
  }

   ngOnInit() {
    this.customerService.getAllCustomers().subscribe((res: { length: string; }) => {
      this.totalCustomers = Number.parseInt(res.length);
    });
    this.orderService.getAllOrderList().subscribe((res: Order[]) => {
    // this.totalOrders = res;
     // this.calculateTotalActiveOrders(res);
     this.totalEarning = this.calculateTotalEarning(res);
    //this.calculateSummary(res, new Date(), new Date());
 });

this.getCustomer();

this.isSignedin = this.authService.isUserSignedin();
		this.signedinUser = this.authService.getSignedinUser();

		if(!this.authService.isUserSignedin()) {
			this.router.navigateByUrl('admin-signin');
		}
   }
 
   getRequestCustomer( page: number, pageSize: number): any{
    // tslint:disable-next-line:prefer-const
    let custoemrs = [];
    
    if (page) {
      custoemrs[page] = page - 1;
    }
    if (pageSize) {
      custoemrs[pageSize] = pageSize;
    }
    return custoemrs;
  }
  
  handlePageChange(event: number): void {
    this.page = event;
    this.getCustomer();
  }
  handlePageSizeChange(event: any): void {
    this.pageSize = event.target.value;
    this.page = 1;
    this.getCustomer();
  }
  calculateTotalEarning(orders: Order[]): number {
    let temp = 0;
    orders.forEach(element => {
      if (element.status !== "Rejected") {
        temp = temp + element.totalPrice;
      }
    });
    return temp;
  }
  // calculateSummary(order: Order[], from: Date, to: Date) {
  //   //this.transactions = [];
  //  // const summaryOrders = this.orderDateFilter.transform(order, from, to);
  //   // this.transactions.push({ item: 'Total Orders', cost: summaryOrders.length });
  //   // this.transactions.push({ item: 'Sells', cost: this.calculateTotalEarning(summaryOrders) });
  //   // this.transactions.push({ item: 'Panding Orders', cost: this.orderFilter.transform(summaryOrders, "Pending", "All").length });
  //   // this.transactions.push({ item: 'Delivered Orders', cost: this.orderFilter.transform(summaryOrders, "Delivered", "All").length });
  //   // this.transactions.push({ item: 'Rejected Orders', cost: this.orderFilter.transform(summaryOrders, "Rejected", "All").length });
  // }

 

  // onSummaryDateChange() {
  //   this.calculateSummary(this.totalOrders, this.selectedSummaryDate.from, this.selectedSummaryDate.to);
  // }
  getCustomer() {
    this.customerService.getAllCustomers().subscribe(res =>{
      console.log('Customers=' + JSON.stringify(res))
      this.customers =res;
    })
  }


  deleteCustomer(id: number) {
    if(confirm("Are you sure to delete "+id)) {
      this.customerService.deleteCustomer(id).subscribe( data => {
        console.log(data);
        this.getCustomer();
      })
    }
  }







}








export interface Transaction {
  item: string;
  cost: number;
}

