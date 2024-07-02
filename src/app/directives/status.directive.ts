import { Directive, HostBinding, input } from '@angular/core';

@Directive({
  selector: '[appStatus]',
  standalone: true,
})
export class StatusDirective {
  appStatus = input.required<number>();

  @HostBinding('class') get status() {
    return this.appStatus() === 1 ? 'active' : 'inactive';
  }
}
