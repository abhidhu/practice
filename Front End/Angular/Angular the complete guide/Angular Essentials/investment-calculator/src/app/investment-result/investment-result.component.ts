import { Component, Input, input } from '@angular/core';
import { InvestmentInput } from '../investment-input.module';
import { CurrencyPipe } from '@angular/common';

@Component( {
  selector: 'app-investment-result',
  standalone: true,
  imports: [CurrencyPipe],
  templateUrl: './investment-result.component.html',
  styleUrl: './investment-result.component.css'
} )
export class InvestmentResultComponent {

  //  results = input();

  @Input() results?: {
    year:number,
    interest:number,
    valueEndOfYear:number,
    annualInvestment:number,
    totalInterest : number,
    totalAmountInvested:number
  }[];
}
