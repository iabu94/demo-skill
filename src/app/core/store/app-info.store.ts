import {
  patchState,
  signalStore,
  withComputed,
  withMethods,
  withState,
} from '@ngrx/signals';
import { computed, inject } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';

interface AppInfoState {
  language: string;
}

const initialState: AppInfoState = {
  language: localStorage.getItem('language') || 'en',
};

export const AppInfoStore = signalStore(
  { providedIn: 'root' },
  withState(initialState),
  withComputed(({ language }) => ({
    isRtl: computed(() => language() === 'ar'),
  })),
  withMethods((store, translate = inject(TranslateService)) => ({
    setLanguage(language: string) {
      translate.use(language);
      localStorage.setItem('language', language);
      patchState(store, { language });
    },
  }))
);
