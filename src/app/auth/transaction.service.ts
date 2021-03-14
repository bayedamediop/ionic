import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Transaction } from 'src/moddules/Transactions';

@Injectable({
  providedIn: 'root'
})
export class TransactionService {
  private url = 'http://127.0.0.1:8000/api/admin/transactions';
  private urlf = 'http://127.0.0.1:8000/api/admin/frais'
  
 // private transaction: Transaction;
   constructor( private http: HttpClient) { }
   getAllUsers(){
     return this.http.get(this.url)
   }
   addTransaction(transaction: Transaction): any {
     return this.http.post(`${this.url}`,transaction);
   }
   getTransactionBycODE(code: number) {
    return this.http.get(`${this.url}/${code}`);
  }
  calculefrais(montant: any){
    return this.http.get(`${this.urlf}`,montant);

  }
 }