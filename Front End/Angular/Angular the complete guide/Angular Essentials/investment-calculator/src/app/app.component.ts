import { Component, signal } from '@angular/core';
import { HeaderComponent } from "./header/header.component";
import { InputComponent } from "./input/input.component";
import { InvestmentInput } from './investment-input.module';
import { InvestmentResultComponent } from "./investment-result/investment-result.component";

@Component( {
  selector: 'app-root',
  standalone: true,
  templateUrl: './app.component.html',
  imports: [ HeaderComponent, InputComponent, InvestmentResultComponent ],
} )
export class AppComponent {


  resultsData = signal<{
    year: number,
    interest: number,
    valueEndOfYear: number,
    annualInvestment: number,
    totalInterest: number,
    totalAmountInvested: number
  }[] | undefined>( undefined );


  onCalculateInvestmentResults( data: InvestmentInput ) {

    const {
      initialInvestment, duration, expectedReturn, annualInvestment
    } = data;

    const annualData = [];
    let investmentValue = initialInvestment;

    for ( let i = 0; i < duration; i++ ) {
      const year = i + 1;
      const interestEarnedInYear = investmentValue * ( expectedReturn / 100 );
      investmentValue += interestEarnedInYear + annualInvestment;
      const totalInterest =
        investmentValue - annualInvestment * year - initialInvestment;
      annualData.push( {
        year: year,
        interest: interestEarnedInYear,
        valueEndOfYear: investmentValue,
        annualInvestment: annualInvestment,
        totalInterest: totalInterest,
        totalAmountInvested: initialInvestment + annualInvestment * year,
      } );
    }
    this.resultsData.set( annualData );
  }
}
