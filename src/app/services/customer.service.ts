import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Customer } from '../common/customer';

@Injectable({
  providedIn: 'root'
})
export class CustomerService {
 
  api = "http://localhost:8087/api";

  constructor(private httpClient: HttpClient) { }

  updateCustomer(customer: Customer):Observable<any>{
    return this.httpClient.put(this.api+"/customers/" +customer.id,  customer);
  }
  getAllCustomers(): Observable<any>{
   return this.httpClient.get<Customer>(`${this.api}/customers`);
  }
  getCustomerById(id: number): Observable<any>{
    return this.httpClient.get(this.api+"/customers/"+id);
  }

  addCustomer(customer: Customer):  Observable<any>{
    return this.httpClient.post(this.api+"/customers", customer);
  }
  deleteCustomer(id: number): Observable<any> {
    return this.httpClient.delete(this.api+"/customers/"+id);
  }
}
