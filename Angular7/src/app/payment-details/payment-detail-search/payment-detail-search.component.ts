import { Component, OnInit } from '@angular/core';
import { PaymentDetailService } from 'src/app/shared/payment-detail.service';
import { NgForm } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-payment-detail-search',
  templateUrl: './payment-detail-search.component.html',
  styles: []
})
export class PaymentDetailSearchComponent implements OnInit {

  constructor(private service: PaymentDetailService,
    private toastr: ToastrService) { }

  ngOnInit() {
    this.resetForm(); 
  }

  resetForm(form?: NgForm) {
    if (form != null) 
      form.resetForm();
      
    this.service.formData = {
      PMId: 0,
      CardOwnerName: '',
      CardNumber: '',
      ExpirationDate: '',
      CVV: '',
      SearchOwnerName: ''
    }
  }

  onSubmit() {
    this.search()
  }  

  search(){
    //this.toastr.success(this.service.formData.SearchOwnerName, 'Pesquisa realizada');  
    var search = this.service.formData.SearchOwnerName;
    
    if (search != "") { 
      //this.toastr.success("Campo preenchido", 'Pesquisa realizada');
      
      this.service.searchPaymentDetails(search).subscribe(
        res => {    
          this.service.refreshListSearch(search);                                            
        },
        err => {
          console.log(err);
        }
      )       
    }
    else {  
      //this.toastr.success("Campo vazio", 'Pesquisa realizada');
      this.service.refreshList();
    }
  }
}