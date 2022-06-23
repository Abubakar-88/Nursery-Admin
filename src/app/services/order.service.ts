import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Order } from '../common/order';

@Injectable({
  providedIn: 'root'
})
export class OrderService {

  baseUrl = "http://localhost:8087/api/orders";

  constructor(private httpClient: HttpClient) { }


  getAllOrderList(): Observable<Order[]> {
    return this.httpClient.get<Order[]>(`${this.baseUrl}`);
  }


}
