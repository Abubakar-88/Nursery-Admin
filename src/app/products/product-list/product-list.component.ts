import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { Product } from 'src/app/common/product';
import { ProductCategory } from 'src/app/common/product-category';
import { AuthService } from 'src/app/services/auth.service';
import { ProductService } from 'src/app/services/product.service';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.css'],
})
export class ProductListComponent implements OnInit {

  error: string = '';
  currentProduct: Product = new Product;
  currentIndex = -1;
  title = '';
  page = 1;
  count = 0;
  pageSize = 8;
  pageSizes = [8, 10, 15, 20];

 products = new Array();
 
//authorization
isSignedin:  boolean = false;
signedinUser: string = '';
  
  
  //public products!: Product[];
  

  
  productCategories: ProductCategory[] = new Array();
  

  
  
  constructor(private productService: ProductService,
    private authService:AuthService, 
    private router: Router,
    
  
    ) { 
    //   this.productCategories.push(this.rootCategory);
    // this.selectedCategory = this.productCategories[0];

    //this.refreshProducts();
    

    }

  ngOnInit(): void {
   this.getProduct();
    //this.refreshProducts();
   // this.retrieveProducts();
   this.isSignedin = this.authService.isUserSignedin();
   this.signedinUser = this.authService.getSignedinUser();

   if(!this.authService.isUserSignedin()) {
     this.router.navigateByUrl('admin-signin');
   }

  }
  getRequestProduct( page: number, pageSize: number): any[]{
    // tslint:disable-next-line:prefer-const
    let products = [];
    
    if (page) {
      products[page] = page - 1;
    }
    if (pageSize) {
      products[pageSize] = pageSize;
    }
    return products;
  }
  

  handlePageChange(event: number): void {
    this.page = event;
    this.getProduct();
  }
  handlePageSizeChange(event: any): void {
    this.pageSize = event.target.value;
    this.page = 1;
    this.getProduct();
  }

  getProduct():void {
    this.productService.getAllProducts(this.products).subscribe (
      (response: Product[])=> {
        this.products = response;
        console.log(this.products);
      },
      (error: HttpErrorResponse) => {
        alert(error.message);
      }
    );
  }

searchProduct(key: string):void{
  console.log(key);
  const results: Product[] = [];
  for(const product of this.products){
    if(product.name.toLocaleLowerCase().indexOf(key.toLowerCase()) !=-1) {
      results.push(product);
    }
  }
  this.products = results;
  if(results.length === 0 || !key){
   
    this.getProduct();
   
  }
  
}


  updateProduct(id: number){
    this.router.navigate(['update-product', id]);
  }


//   }

  deleteProduct(id: number) {
    if(confirm("Are you sure to delete "+id)) {
      this.productService.deleteProduct(id).subscribe( data => {
        console.log(data);
        this.getProduct();
      })
    }
  }

//   public getCategory(){
//     this.categoryService.getCategories2().subscribe(
//       (response: ProductCategory[] )=> {
//         this.categories =response;
//         console.log(this.categories);
//       },
//       (error: HttpErrorResponse) => {
//         alert(error.message);
//       }
//     );
//  }

 getCategoryName(product: Product): any{
  for (let index = 0; index < this.productCategories.length; index++) {
    if (this.productCategories[index].id === product.category_id) {
      return this.productCategories[index].categoryName;
           
    } 

    console.log("category name:"+ this.productCategories[index].categoryName);
  } (error: any) => console.log(error);   
}




}
