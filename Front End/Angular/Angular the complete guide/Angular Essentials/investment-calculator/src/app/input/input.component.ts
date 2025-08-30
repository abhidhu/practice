import { Component, EventEmitter, Output, input, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import type { InvestmentInput } from '../investment-input.module';

@Component( {
  selector: 'app-input',
  standalone: true,
  imports: [ FormsModule ],
  templateUrl: './input.component.html',
  styleUrl: './input.component.css'
} )
export class InputComponent {


  @Output() calculate = new EventEmitter<InvestmentInput>();

  enteredInitialInvestment = signal( '0' );
  enteredAnnualInvestment = signal( '0' );
  enteredExpectedReturn = signal( '5' );
  enteredDuration = signal( '10' );


  onSubmit() {
    this.calculate.emit( {
      initialInvestment: +this.enteredInitialInvestment(), duration: +this.enteredDuration(), expectedReturn: +this.enteredDuration(), annualInvestment: +this.enteredAnnualInvestment()
    } );
    this.enteredInitialInvestment.set( '0' )
    this.enteredAnnualInvestment.set( '0' )
    this.enteredExpectedReturn.set( '0' )
    this.enteredDuration.set( '0' )
  }
}
