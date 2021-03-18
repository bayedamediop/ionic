import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Transaction } from 'src/moddules/Transactions';

@Injectable({
  providedIn: 'root'
})
export class TransactionService {
  private url = 'http://127.0.0.1:8000/api/admin/transactions';
  private urlf = 'http://127.0.0.1:8000/api/admin/frais'
  private urlUser = 'http://127.0.0.1:8000/api/admin/user' //url de mes transaction
  private  urlTouts = 'http://127.0.0.1:8000/api/admin/compte' // url de toutes transactions

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
  frais(montant: any){
    return this.http.post(`${this.urlf}`,montant);

  }
  retrait(code: number,client: any){
  return this.http.put(`${this.url}/${code}`,client);
  }
  mesTransactions(id: any) {
    return this.http.get(`${this.urlUser}/${id}`)
  }
  touteTransactions(id: any) {
    return this.http.get(`${this.urlTouts}/${id}`)
  }
 }
