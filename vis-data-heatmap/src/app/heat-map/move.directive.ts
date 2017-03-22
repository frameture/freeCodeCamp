import { Directive, DoCheck, ElementRef, Input } from '@angular/core';

@Directive({
  selector: '[appMove]'
})
export class MoveDirective implements DoCheck {
  @Input() position;

  constructor(private el: ElementRef) { }

  ngDoCheck(): void {
    this.el.nativeElement.style.top = this.position.top + 'px';
    this.el.nativeElement.style.left = this.position.left + 'px';
  }

}
