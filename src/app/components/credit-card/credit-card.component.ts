import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { AlertService } from 'ngx-alerts';
import { ApiService } from 'src/app/shared/api.service';
import { UtilsService } from 'src/app/shared/utils.service';

@Component({
  selector: 'app-credit-card',
  templateUrl: './credit-card.component.html',
  styleUrls: ['./credit-card.component.css'],
})
export class CreditCardComponent implements OnInit {
  myCardDetails = {
    expirydate: '',
    cardNo: '',
    cvv: '',
    name: '',
  };
  isCreditCard: boolean;
  idUpdating: boolean = false;
  myInfo = this.utils.getLocalStorageData();

  creditCardForm: FormGroup;

  expirydate: FormControl = new FormControl('', [Validators.required]);
  cvv: FormControl = new FormControl('', [Validators.required]);
  cardNo: FormControl = new FormControl('', [Validators.required]);

  constructor(
    private api: ApiService,
    private utils: UtilsService,
    private toast: AlertService,
    private fb: FormBuilder
  ) {}

  ngOnInit(): void {
    this.bindingForm();
    this.myCard();
  }

  bindingForm() {
    this.creditCardForm = this.fb.group({
      expirydate: this.expirydate,
      cvv: this.cvv,
      cardNo: this.cardNo,
    });
  }

  myCard() {
    this.api.getMyCardAPI().subscribe(
      (res: any) => {
        if (res.success) {
          this.isCreditCard = true;
          const decryptedData = this.utils.decryptedText(res.data);

          this.myCardDetails = {
            expirydate: decryptedData[0].expiryDate,
            cardNo: decryptedData[0].cardNo,
            cvv: decryptedData[0].cvv,
            name: this.myInfo.name,
          };
        } else {
          this.isCreditCard = false;
          this.toast.danger(res.msg);
        }
      },
      (error) => this.utils.catchBlock(error)
    );
  }

  addMyCard() {
    if (!this.idUpdating) {
      const payLoad = {
        userId: this.myInfo.id,
        expiryDate: this.utils.dateFormat(this.creditCardForm.value.expirydate),
        cvv: this.creditCardForm.value.cvv,
        cardNo: this.creditCardForm.value.cardNo,
      };

      this.api.addMyCardAPI(payLoad).subscribe(
        (res: any) => {
          if (res.success) {
            const decryptedData = this.utils.decryptedText(res.data);
            this.myCardDetails = decryptedData;
            this.myCard();
          } else {
            this.toast.danger(res.msg);
          }
        },
        (error) => this.utils.catchBlock(error)
      );
    } else {
      this.updateMyCard();
    }
  }

  updateForm() {
    this.idUpdating = true;
    this.creditCardForm.controls['cardNo'].setValue('');
    this.creditCardForm.controls['expirydate'].setValue(
      this.myCardDetails.expirydate
    );
    this.creditCardForm.controls['cvv'].setValue(this.myCardDetails.cvv);
    this.isCreditCard = false;
  }

  updateMyCard() {
    const payLoad = {
      userId: this.myInfo.id,
      expiryDate: this.utils.dateFormat(this.creditCardForm.value.expirydate),
      cvv: this.creditCardForm.value.cvv,
      cardNo: this.creditCardForm.value.cardNo,
    };

    this.api.updateCreditCardDetailsAPI(payLoad).subscribe(
      (res: any) => {
        if (res.success) {
          this.myCard();
        } else {
          this.toast.danger(res.msg);
        }
      },
      (error) => this.utils.catchBlock(error)
    );
  }
}
