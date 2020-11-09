import { Injectable } from '@angular/core';
import { PaymentDetail } from './payment-detail.model';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class PaymentDetailService {
  formData: PaymentDetail;
  readonly rootURL = 'http://localhost:3778/api';
  list: PaymentDetail[];

  constructor(private http: HttpClient) { }

  postPaymentDetail() {
    return this.http.post(this.rootURL + '/PaymentDetail', this.formData);
  }

  putPaymentDetail() {
    return this.http.put(this.rootURL + '/PaymentDetail/' + this.formData.PMId, this.formData);
  }

  deletePaymentDetail(id) {
    return this.http.delete(this.rootURL + '/PaymentDetail/' + id);
  }

  searchPaymentDetails(cardOwnerName) {    
    return this.http.options(this.rootURL + '/PaymentDetail/'+ cardOwnerName)
  }

  refreshListSearch(cardOwnerName) {    
    return this.http.options(this.rootURL + '/PaymentDetail/'+ cardOwnerName)
    .toPromise()
    .then(res => this.list = res as PaymentDetail[]);
  }

  refreshList(){
    this.http.get(this.rootURL + '/PaymentDetail')
    .toPromise()
    .then(res => this.list = res as PaymentDetail[])
  }  
}