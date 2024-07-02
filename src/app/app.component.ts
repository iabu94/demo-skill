import { Component, inject } from '@angular/core';
import { RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';
import { MatIcon } from '@angular/material/icon';
import { MatIconButton } from '@angular/material/button';
import { MatToolbar } from '@angular/material/toolbar';
import { AsyncPipe } from '@angular/common';
import { MatListItem, MatNavList } from '@angular/material/list';
import {
  MatDrawer,
  MatDrawerContainer,
  MatDrawerContent,
  MatSidenav,
  MatSidenavContainer,
  MatSidenavContent,
} from '@angular/material/sidenav';
import { MatBadge } from '@angular/material/badge';
import {
  MatOption,
  MatSelect,
  MatSelectChange,
} from '@angular/material/select';
import { FormsModule } from '@angular/forms';
import { TranslateModule, TranslateService } from '@ngx-translate/core';
import { AppInfoStore } from '@demo/core/store';
import { DirectionDirective, RtlDirective } from '@demo/shared/directives';

const LANGUAGES = [
  { value: 'en', label: 'English' },
  { value: 'ar', label: 'Arabic' },
];

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    RouterOutlet,
    MatIcon,
    MatIconButton,
    MatToolbar,
    AsyncPipe,
    MatListItem,
    MatSidenav,
    MatSidenavContainer,
    MatSidenavContent,
    MatNavList,
    MatBadge,
    RouterLink,
    RouterLinkActive,
    MatDrawer,
    MatDrawerContainer,
    MatDrawerContent,
    MatSelect,
    MatOption,
    FormsModule,
    TranslateModule,
    DirectionDirective,
    RtlDirective,
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent {
  languages = LANGUAGES;

  private translate = inject(TranslateService);
  readonly store = inject(AppInfoStore);

  constructor() {
    this.translate.use(this.store.language());
  }

  changeLanguage(change: MatSelectChange) {
    this.store.setLanguage(change.value);
  }
}
