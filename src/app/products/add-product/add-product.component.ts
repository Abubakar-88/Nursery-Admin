import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { ProductCategory } from 'src/app/common/product-category';
import { AuthService } from 'src/app/services/auth.service';
import { CategoryService } from 'src/app/services/category.service';
import { ProductService } from 'src/app/services/product.service';

@Component({
  selector: 'app-add-product',
  templateUrl: './add-product.component.html',
  styleUrls: ['./add-product.component.css']
})
export class AddProductComponent implements OnInit {

  //authorization
  isSignedin: boolean = false;
  signedinUser: string = '';


  productForm!: FormGroup;
  // categoryPath: ProductCategory[] = [
  //   {
  //     Id: -1,
  //     categoryName: 'Root',

  //   }
  // ];

  productCategories!: ProductCategory[];
  constructor(
    private categoryService: CategoryService,
    private fb: FormBuilder,
    private productService: ProductService,
    private router: Router,
    private authService: AuthService,
  ) { }



  ngOnInit(): void {
    this.categoryService.getCategories().subscribe(res => {
      this.productCategories = res;
    });
    this.productForm = this.fb.group({
      name: [],
      sku: [],
      description: [],
      unitPrice: [],
      dateCreated: [new Date().toUTCString()],
      active: [true],
      imageUrl: [],
      unitsInStock: [],
      category_id: []
    });

    this.isSignedin = this.authService.isUserSignedin();
    this.signedinUser = this.authService.getSignedinUser();

    if (!this.authService.isUserSignedin()) {
      this.router.navigateByUrl('admin-signin');
    }

  }



  changeCategory(value: any) {
    console.log(value);
    this.productForm.controls['category_id'].setValue(value);
  }



  getCategory(category: ProductCategory) {
    this.updateCategoryPath(category);
    this.categoryService.getCategories().subscribe(res => {
      console.log('Product Categories=' + JSON.stringify(res));
      this.productCategories = res;
    });
  }

  updateCategoryPath(category: ProductCategory) {
    const tempIndex = this.productCategories.indexOf(category);
    if (tempIndex == -1) {
      this.productCategories.push(category);
    } else {
      this.productCategories = this.productCategories.slice(0, tempIndex + 1);
    }
  }


  onProductFormSubmit() {
    const value = JSON.parse(JSON.stringify(this.productForm.value))
    value['category'] = { id: value.category_id }
    delete value.category_id
    this.productService.addProduct(value).subscribe(res => {
      this.router.navigate(['/product-list']);
    });
  }


}
