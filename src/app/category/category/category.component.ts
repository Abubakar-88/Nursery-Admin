import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { CategoryService } from 'src/app/services/category.service'
import { HttpErrorResponse } from '@angular/common/http';
import { ProductCategory } from 'src/app/common/product-category';
import { MatSnackBar } from '@angular/material/snack-bar';
import { AuthService } from 'src/app/services/auth.service';
import { Router } from '@angular/router';
@Component({
  selector: 'app-category',
  templateUrl: './category.component.html',
  styleUrls: ['./category.component.css']
})
export class CategoryComponent implements OnInit {

  
//authorization
isSignedin:  boolean = false;
signedinUser: string = '';

  productCategories = new Array();
  categoryForm!: FormGroup 

  constructor(private fb: FormBuilder,
   private snackBar: MatSnackBar,
    private categoryService: CategoryService,
    private authService: AuthService,
    private router: Router,
  ) { }

  ngOnInit() {
    this.categoryForm = this.fb.group({
      Id:[],
      categoryName: [],
      active: [true]
    });
    this.categoryService.getCategories().subscribe(res => {
      this.productCategories = res;
    });

    this.getCategory();
    this.isSignedin = this.authService.isUserSignedin();
    this.signedinUser = this.authService.getSignedinUser();
 
    if(!this.authService.isUserSignedin()) {
      this.router.navigateByUrl('admin-signin');
    }
 

  }

//   listProductCategories() {
//     this.categoryService.getCategoryByCategoryId(-1).subscribe(
//     data => {
//        console.log('Product Categories=' + JSON.stringify(data));
//      this.productCategories = data;
//      }

//     );
//  }




  openSnackBar(message: string  ) {
    this.snackBar.open('Message archived', 'Undo', {
      duration: 3000
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

  // public getEmployees(): void {
  //   this.employeeService.getEmployees().subscribe(
  //     (response: Employee[]) => {
  //       this.employees = response;
  //       console.log(this.employees);
  //     },
  //     (error: HttpErrorResponse) => {
  //       alert(error.message);
  //     }
  //   );
  // }
public getCategory(){
   this.categoryService.getCategories().subscribe(
     (response: ProductCategory[] )=> {
       this.productCategories =response;
       console.log(this.productCategories);
     },
     (error: HttpErrorResponse) => {
       alert(error.message);
     }
   );
}


  // getCategory() {
  // // this.updateCategoryPath(category);
  //   this.categoryService.getCategories().subscribe(res => {
  //     console.log('Product Categories=' + JSON.stringify(res));
  //     this.productCategories = res;
  //   });
  // }


  removeCategory(category: ProductCategory) {
    this.productCategories.splice(this.productCategories.indexOf(category), 1);
    this.categoryService.removeCategory(category.id).subscribe(res => {
    });
    this.openSnackBar(category.categoryName + " is remove successfully.");
  }
  addCategory() {
   // this.categoryForm.controls['category'].patchValue(this.categoryPath[this.categoryPath.length - 1].Id);
    this.categoryService.addCategory(this.categoryForm.value).subscribe(res => {
      this.openSnackBar(this.categoryForm.value.categoryName +  " is added successfully.");
    
     //this.getCategory(this.productCategories[this.productCategories.length -1]);
      this.categoryForm.reset();
    });
    
  }


}


