import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Product } from '../common/product';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

   
  baseUrl = "http://localhost:8087/api/v01/product";

  constructor(private httpClient: HttpClient) { }

  addProduct(product: Product): Observable<any> {
    return this.httpClient.post(this.baseUrl, product);
  }
   deleteProduct( id: number): Observable<Object>{
    return this.httpClient.delete(`${this.baseUrl}/${id}`);

   }

  getProductByid(id: number): Observable<Product>{
       // need to build URL based on product id
       const productUrl = `${this.baseUrl}/${id}`;

       return this.httpClient.get<Product>(productUrl);
  } 


  getAllProducts(products: any): Observable<any> {
    return this.httpClient.get<Product[]>(`${this.baseUrl}/all`, products);
  }

  getProductsByCategoryId(id: number): Observable<any>{
    return this.httpClient.get(this.baseUrl+"?categoryId="+id);
  }
  updateProduct(id: number, product: Product): Observable<Product> {
    return this.httpClient.put<Product>(`${this.baseUrl}/${id}`, product);
  }

}
