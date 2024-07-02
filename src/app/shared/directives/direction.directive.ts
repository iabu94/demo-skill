import { Directive, HostBinding, inject } from '@angular/core';
import { AppInfoStore } from '@demo/core/store';

@Directive({
  selector: '[appDirection]',
  standalone: true,
})
export class DirectionDirective {
  store = inject(AppInfoStore);

  @HostBinding('dir') get dir() {
    return this.store.isRtl() ? 'rtl' : 'ltr';
  }
}
