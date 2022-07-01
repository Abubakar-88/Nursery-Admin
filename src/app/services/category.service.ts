import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { ProductCategory} from '../common/product-category'

@Injectable({
  providedIn: 'root'
})
export class CategoryService {

  

  private categoryUrl = environment.apiBaseUrl;

  //private cUrl = 'http://localhost:8087/api/product-category2';




  

  constructor(private httpClient: HttpClient) { }

  getCategoryByCategoryId(id: number): Observable<any> {
    return this.httpClient.get(this.categoryUrl + "/" + id);
  }

  // getCategoryByParentId(id: number): Observable<any> {
  //   return this.httpClient.get(this.categoryUrl + "?parentCategoryId=" + id);
  // }
  // getProductCategories(): Observable<ProductCategory[]> {

  //   return this.httpClient.get<GetResponseProductCategory>(this.categoryUrl).pipe(
  //     map(response => response._embedded.productCategory)
  //   );
  // }
  addCategory(category: ProductCategory): Observable<any> {
    return this.httpClient.post(this.categoryUrl, category);

  }
  removeCategory(Id: number): Observable<any> {
    return this.httpClient.delete(this.categoryUrl + "/" + Id);
  }
  getCategories(): Observable<ProductCategory[]> {
    return this.httpClient.get<ProductCategory[]>(`${this.categoryUrl}`);
  }

  // getCategories2(): Observable<ProductCategory[]> {
  //   return this.httpClient.get<ProductCategory[]>(`${this.cUrl}`);
  // }


//  getCategories(): Observable<ProductCategory[]>{
//    return this.httpClient.get<GetResponseProductCategory>(this.categoryUrl).pipe(
//      map(response => response._embedded.productCategory)
//    );
//  }

  // getProductCategories(): Observable<ProductCategory[]> {

  //   return this.httpClient.get<GetResponseProductCategory>(this.categoryUrl).pipe(
  //     map(response => response._embedded.productCategory)
  //   );
  // }




}
interface GetResponseProductCategory {
  _embedded: {
    productCategory: ProductCategory[];
  }
}