

import { Component, OnInit } from '@angular/core';
import {  ActivatedRoute, Router } from '@angular/router';
import { Product } from 'src/app/common/product';
import { ProductService } from 'src/app/services/product.service';

@Component({
  selector: 'app-update-product',
  templateUrl: './update-product.component.html',
  styleUrls: ['./update-product.component.css']
})
export class UpdateProductComponent implements OnInit {
 

  products = new Array();
   id: number=0;
 
  
  product: Product = new Product();
  snapshotroute: any;
  constructor(private productService: ProductService,  private route:ActivatedRoute,private router:Router) { }

  //productForm!: FormGroup ;
  //productForm!: FormGroup ;
  //editForm!: NgForm;


  ngOnInit(): void {
   // this.getProduct();
    // this.route.paramMap.subscribe(() => {
    //   this.onSubmit();
    // })
     this.id  = Number(this.route.snapshot.paramMap.get('id'));
    console.log('Routed to SingleProduct  to display product with id: ', this.id)
   // this.id = this.route.snapshot.params['id'];
   let product = this.productService.getProductByid(+this.id);
   console.log('Product information is: ', product);


    this.productService.getProductByid(this.id).subscribe(
      data => {
      this.product = data;

    }, error => console.log(error));
    //this.onUpdateProduct;
  }


  onSubmit(){
   //const theProductId: number = Number(this.route.snapshot.paramMap.get('id'));
      


    this.productService.updateProduct(this.id, this.product).subscribe( data =>{
      this.goToProductList();
    }
    , error => console.log(error));
  }


  goToProductList(){
    this.router.navigate(['/product-list']);
  }


  // getProduct():void {
  //   this.productService.getProductByid().subscribe (
  //     (response: Product[])=> {
  //       this.products = response;
  //       console.log(this.products);
  //     },
  //     (error: HttpErrorResponse) => {
  //       alert(error.message);
  //     }
  //   );
  // }



  // getProduct():void {
  //   this.productService.getAllProducts().subscribe (
  //     (response: Product[])=> {
  //       this.product = response;
  //       console.log(this.product);
  //     },
  //     (error: HttpErrorResponse) => {
  //       alert(error.message);
  //     }
  //   );
  // }




  // public onUpdateProduct(product: Product): void {
  //   this.productService.updateProduct(product).subscribe(
  //     (response: Product) => {
  //       console.log(response);
  //       this.getProduct();
  //     },
  //     (error: HttpErrorResponse) => {
  //       alert(error.message);
  //     }
  //   );
  // }
 




}
