import { Component, input, output, signal } from '@angular/core';
import { Ticket } from './ticket.model';

@Component({
  selector: 'app-ticket',
  standalone: true,
  imports: [],
  templateUrl: './ticket.component.html',
  styleUrl: './ticket.component.css'
})
export class TicketComponent {

  data = input.required<Ticket>();
  close = output();

  detailsVisibles = signal(false);

  onToggleDetails(){
    // this.detailsVisibles.set(!this.detailsVisibles());

     this.detailsVisibles.update( (wasUpdate) =>  !wasUpdate);
  }

  onMarkAsCompleted(){
    this.close.emit();
  }
  
}
