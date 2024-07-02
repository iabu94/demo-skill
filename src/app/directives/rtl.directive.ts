import { Directive, effect, ElementRef, inject, input } from '@angular/core';
import { AppInfoStore } from '../store';

@Directive({
  selector: '[appRtl]',
  standalone: true,
})
export class RtlDirective {
  private element = inject(ElementRef);

  private readonly userInfoStore = inject(AppInfoStore);

  /**
   * This directive input is used to apply two separate classes for LTR & RTL seperated by `|`.
   * The left element before the `|` is LTR related class and the right element is RTL related one.
   * @example <div appRtl rtlClass="normal-icon|rotated-icon"></div>
   * @constructs `<div class="normal-icon"></div>` will be applied to LTR.
   * @constructs `<div class="rotated-icon"></div>` will be applied to RTL.
   */
  appRtl = input<string>('');

  /**
   * This directive input is used to apply two separate classes for LTR & RTL seperated by `|`.
   * The left element before the `|` is LTR related class and the right element is RTL related one.
   * @example <div appRtl rtlClass="normal-icon|rotated-icon"></div>
   * @constructs `<div class="normal-icon"></div>` will be applied to LTR.
   * @constructs `<div class="rotated-icon"></div>` will be applied to RTL.
   * @param value
   */
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
