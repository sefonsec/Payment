import { Component, OnInit } from '@angular/core';
import { PaymentDetailService } from 'src/app/shared/payment-detail.service';
import { NgForm } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-payment-detail',
  templateUrl: './payment-detail.component.html',
  styles: []
})
export class PaymentDetailComponent implements OnInit {

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

  onSubmit(form: NgForm) {
    if (this.service.formData.PMId == 0)
      this.insertRecord(form)
    else
      this.updateRecord(form)
  }

  insertRecord(form:NgForm){
    this.service.postPaymentDetail().subscribe(
      res => {
        this.resetForm(form);
        this.toastr.success('Pagamento realizado com sucesso', 'Registro de detalhes do pagamento');
        this.service.refreshList();
      },
      err => {
        console.log(err);
      }
    )    
  }

  updateRecord(form:NgForm){
    this.service.putPaymentDetail().subscribe(
      res => {
        this.resetForm(form);
        this.toastr.info('Pagamento realizado com sucesso', 'Registro de detalhes do pagamento');
        this.service.refreshList();
      },
      err => {
        console.log(err);
      }
    )    
  }
}
