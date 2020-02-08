import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { PayPalService } from 'src/app/shared/services/paypal/paypal.service';
import { MatSnackBar } from '@angular/material';
import { SnackbarComponent } from '../../../common/snackbar/snackbar.component';

@Component({
  selector: 'pay-pal',
  templateUrl: './pay-pal.component.html',
  styleUrls: ['./pay-pal.component.scss']
})
export class PayPalComponent implements OnInit {

  paymentId: any = '';
  PayerID: any = '';
  success: boolean = false;
  loading: boolean = true;

  neededParams: Array<string> = ['paymentId=', 'PayerID='];

  constructor(
    private payPalService: PayPalService,
    private router: Router,
    private snackbar: MatSnackBar
    ) {

  }


  ngOnInit() {
    this.success = false;
    this.neededParams.forEach(p => {
      const paramIndex = window.location.href.indexOf(p);

      if (paramIndex > 0) {
        let param = window.location.href.substring(paramIndex);
        param = param.split('&')[0];
        param = param.substr(param.indexOf('=') + 1);
        if (p === 'paymentId=') {
          this.paymentId = param;
        } else {
          this.PayerID = param;
        }
      }
    });
    this.send();
  }


  send(): void {
    if (this.paymentId != '' && this.PayerID != '') {
      this.payPalService.completePayment(this.paymentId, this.PayerID).subscribe((res) => {
        console.log(res);
        if(res.status === "fail"){
          this.snackbar.openFromComponent(SnackbarComponent, {
            data: "PayPal transaction failed!", 
            panelClass: ['snackbar-error'],
          });
          this.router.navigate(["/"]);
        }
        this.loading = false;
        this.success = true;
      },
        error => {
          console.log(error.message);
          this.snackbar.openFromComponent(SnackbarComponent, {
            data: "PayPal transaction failed!", 
            panelClass: ['snackbar-error'],
          });
          this.router.navigate(["/"]);
        });
    }
  }
}
