import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Transaction } from 'src/moddules/Transactions';

@Injectable({
  providedIn: 'root'
})
export class TransactionService {
  private url = 'http://127.0.0.1:8000/api/admin/transactions';
  
 // private transaction: Transaction;
   constructor( private http: HttpClient) { }
   getAllUsers(){
     return this.http.get(this.url)
   }
   addTransaction(transaction: Transaction): any {
     return this.http.post(`${this.url}`,transaction);
   }
 }