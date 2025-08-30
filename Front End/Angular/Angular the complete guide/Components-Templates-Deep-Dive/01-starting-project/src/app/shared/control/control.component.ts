import { Component, ContentChild, ElementRef, HostBinding, HostListener, ViewEncapsulation, inject, input } from '@angular/core';

@Component({
  selector: 'app-control',
  standalone: true,
  imports: [],
  templateUrl: './control.component.html',
  styleUrl: './control.component.css',
  encapsulation: ViewEncapsulation.None,
  host: {
    class: 'control',
    '(click)': 'onClick()'

  }
})
export class ControlComponent {


  @ContentChild('input') private cotrol?: ElementRef<HTMLInputElement | HTMLTextAreaElement>;

  onClick(){
    console.log('clicked');
    console.log(this.el);
    console.log(this.cotrol);
  }
  // @HostBinding('class') className = 'control';
  // @HostListener() 
  private el = inject(ElementRef)
  label = input.required<string>();
}
