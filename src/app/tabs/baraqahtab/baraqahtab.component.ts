import { Component, OnInit, ViewChild, ɵConsole } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { switchMap } from 'rxjs/operators';

import { StripeService, StripeCardNumberComponent, StripeCardComponent, StripeCardGroupDirective } from 'ngx-stripe';
import {
  StripeCardElementOptions,
  StripeElementsOptions,
  PaymentIntent,
} from '@stripe/stripe-js';
import { environment } from 'src/environments/environment';
import { ApiService } from 'src/app/shared/api.service';

// import { environment as env } from '../../environments/environment';
@Component({
  selector: 'app-baraqahtab',
  templateUrl: './baraqahtab.component.html',
  styleUrls: ['./baraqahtab.component.scss']
})
export class BaraqahtabComponent implements OnInit {
  selectedItem:any;
  content = [
    {
      name: "Personalised e-Card",
      image: "./assets/images/personalised-e-card.png",
      price: "Free",
      bgcolor: "#ab6cad",
      count: 1,
      total:1
    },
    {
      name: "Postcard",
      image: "./assets/images/postcard.png",
      price: "£1.99",
      bgcolor: "#e6557f",
      count: 1,
      total:1

    },
   ];
  @ViewChild(StripeCardComponent) card!: StripeCardComponent;
  @ViewChild(StripeCardNumberComponent) cardNumber!: StripeCardNumberComponent;

  cardOptions: StripeCardElementOptions = {
    style: {
      base: {
        iconColor: '#666EE8',
        color: '#31325F',
        fontWeight: '300',
        fontFamily: '"Helvetica Neue", Helvetica, sans-serif',
        fontSize: '18px',
        '::placeholder': {
          color: '#CFD7E0',
        },
      },
    },
  };

  elementsOptions: StripeElementsOptions = {
    locale: 'es',
  };

  stripeTest!: FormGroup;
  setupIntent: any;
  constructor(
    private http: HttpClient,
    private fb: FormBuilder,
    private stripeService: StripeService,
    private apiService: ApiService
  ) {}

  ngOnInit(): void {
    this.stripeTest = this.fb.group({
      name: ['', [Validators.required]],
      email: ['', [Validators.required]],
      amount: [10.50, [Validators.required]],
    });
  }

  createSetupIntent() {
    this.apiService.createPaymentIntent(this.stripeTest.get('amount')!.value)
    .subscribe(res=>{
      this.setupIntent = res.data
    },err =>{
         
    })
  } 
  onDelete(index:any){
    this.content.splice(index,1);    
  }
  onAdd(index:any){
    this.content.map((data ,i) =>{
     if(i==index){
       if(data.count < 5){
         data.count=data.count+1;
         if(data.price.indexOf('£') > -1){           
           data.total= data.count * +(data.price.slice(1));
        }
       }
       return;      
     }      
    })  
  }
  createToken(): void {
    const name = this.stripeTest.get('name')!.value;
    this.stripeService
      .createToken(this.cardNumber.element, { name })
      .subscribe((result) => {
        if (result.token) {
          // Use the token
          // console.log(result.token.id);
        } else if (result.error) {
          // Error creating the token
          // console.log(result.error.message);
        }
      });
  }

  pay(): void {
    if (this.stripeTest.valid) {
      const payment_method = {
        card: this.cardNumber.element,
        billing_details: {
          name: this.stripeTest.get('name')!.value,
          email: this.stripeTest.get('email')!.value,
        },
      }
      console.log("payment_method", payment_method)
      this.apiService.createPaymentIntent(this.stripeTest.get('amount')!.value)
        .pipe(
          switchMap((pi) =>
            this.stripeService.confirmCardPayment(pi.data.client_secret!, {
              payment_method: payment_method
            })
          )
        )
        .subscribe((result) => {
          if (result.error) {
            // Show error to your customer (e.g., insufficient funds)
            // console.log(result.error.message);
          } else {
            // The payment has been processed!
            if (result.paymentIntent!.status === 'succeeded') {
              // Show a success message to your customer
            }
          }
        });
    } else {
      // console.log(this.stripeTest);
    }
  }


}
