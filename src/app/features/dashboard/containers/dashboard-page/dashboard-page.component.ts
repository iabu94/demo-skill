import { Component, inject, OnInit, signal, viewChild } from '@angular/core';
import {
  MatCell,
  MatCellDef,
  MatColumnDef,
  MatHeaderCell,
  MatHeaderCellDef,
  MatHeaderRow,
  MatHeaderRowDef,
  MatNoDataRow,
  MatRow,
  MatRowDef,
  MatTable,
} from '@angular/material/table';
import { MatFormField, MatInput, MatLabel } from '@angular/material/input';
import { Employee } from '../../models';
import { MatIconButton } from '@angular/material/button';
import { MatIcon } from '@angular/material/icon';
import {
  MatMenu,
  MatMenuContent,
  MatMenuItem,
  MatMenuTrigger,
} from '@angular/material/menu';
import { EmployeeFormComponent, EmployeeListComponent } from '../../components';
import { EmployeeStore } from '../../store';
import {
  MatDrawer,
  MatDrawerContainer,
  MatDrawerContent,
  MatSidenav,
  MatSidenavContainer,
} from '@angular/material/sidenav';
import { MatListItem, MatNavList } from '@angular/material/list';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { DirectionDirective } from '@demo/shared/directives/direction.directive';
import { TranslateModule } from '@ngx-translate/core';

@Component({
  selector: 'app-dashboard-page',
  standalone: true,
  imports: [
    MatInput,
    MatLabel,
    MatFormField,
    MatTable,
    MatCell,
    MatHeaderCell,
    MatColumnDef,
    MatCellDef,
    MatHeaderCellDef,
    MatRow,
    MatHeaderRow,
    MatRowDef,
    MatHeaderRowDef,
    MatNoDataRow,
    MatIconButton,
    MatIcon,
    MatMenu,
    MatMenuItem,
    MatMenuTrigger,
    MatMenuContent,
    EmployeeListComponent,
    MatDrawer,
    MatDrawerContent,
    MatDrawerContainer,
    MatListItem,
    MatNavList,
    MatSidenav,
    RouterLink,
    RouterLinkActive,
    MatSidenavContainer,
    EmployeeFormComponent,
    DirectionDirective,
    TranslateModule,
  ],
  templateUrl: './dashboard-page.component.html',
  styleUrl: './dashboard-page.component.scss',
  providers: [EmployeeStore],
})
export class DashboardPageComponent implements OnInit {
  readonly store = inject(EmployeeStore);

  employees = signal<Employee[]>([]);
  searchKey = signal<string>('');
  selectedEmployee = signal<Employee | undefined>(undefined);

  drawer = viewChild(MatDrawer);

  constructor() {
    this.drawer()?.closedStart.subscribe(() => {
      console.log('closed');
      this.selectedEmployee.set(undefined);
    });
  }

  applyFilter(event: Event) {
    this.searchKey.set(
      (event.target as HTMLInputElement).value.trim().toLowerCase()
    );
  }

  async ngOnInit() {
    await this.store.getAll();
  }

  remove(id: number) {
    this.store.delete(id);
  }

  edit(id: number) {
    this.selectedEmployee.set(this.store.employees().find(e => e.id === id));
    this.drawer()?.open();
  }

  save(employee: Employee) {
    if (employee.id) {
      this.store.update(employee);
    } else {
      this.store.add(employee);
    }
    this.close();
  }

  close() {
    this.drawer()?.close();
    this.selectedEmployee.set(undefined);
  }
}
