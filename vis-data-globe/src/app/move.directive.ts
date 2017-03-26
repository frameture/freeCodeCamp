import { Directive, DoCheck, ElementRef, Input } from '@angular/core';

@Directive({
  selector: '[appMove]'
})
export class MoveDirective implements DoCheck {

  @Input() position: any;

  constructor(private element: ElementRef) { }

  appMove(): void {
    this.moveElement();
  }

  ngDoCheck(): void {
    this.moveElement();
  }

  private moveElement(): void {
    this.element.nativeElement.style.left = this.position.x;
    this.element.nativeElement.style.top = this.position.y;
  }

}
