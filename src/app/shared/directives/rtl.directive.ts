import { Directive, effect, ElementRef, inject, input } from '@angular/core';
import { AppInfoStore } from '@demo/core/store';

@Directive({
  selector: '[appRtl]',
  standalone: true,
})
export class RtlDirective {
  private element = inject(ElementRef);

  private readonly userInfoStore = inject(AppInfoStore);

  appRtl = input<string>('');
  rtlClass = input<string>('');

  constructor() {
    effect(() => {
      if (this.appRtl()) {
        this.appendRtlSuffix(this.userInfoStore.isRtl());
      }
      if (this.rtlClass()) {
        this.addRtlLtsClasses(this.userInfoStore.isRtl());
      }
    });
  }

  private appendRtlSuffix(isRtl: boolean) {
    const classes = this.appRtl().split(' ');
    classes.forEach(className => {
      const styleClass = className.trim();
      if (isRtl) {
        this.classList.remove(styleClass);
        this.classList.add(`${styleClass}-rtl`);
      } else {
        this.classList.remove(`${styleClass}-rtl`);
        this.classList.add(styleClass);
      }
    });
  }

  private addRtlLtsClasses(isRtl: boolean) {
    const splitClass = this.rtlClass().split('|');
    if (splitClass.length !== 2) {
      return;
    }
    if (splitClass[0] && !isRtl) {
      this.classList.remove(splitClass[0]);
      this.classList.add(splitClass[0]);
    } else if (splitClass[1] && isRtl) {
      this.classList.remove(splitClass[1]);
      this.classList.add(splitClass[1]);
    }
  }

  get classList() {
    return this.element.nativeElement.classList;
  }
}
