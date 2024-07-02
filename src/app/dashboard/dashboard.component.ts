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
import { Employee } from '../models';
import { MatIconButton } from '@angular/material/button';
import { MatIcon } from '@angular/material/icon';
import {
  MatMenu,
  MatMenuContent,
  MatMenuItem,
  MatMenuTrigger,
} from '@angular/material/menu';
import { EmployeeListComponent } from './employee-list/employee-list.component';
import { EmployeeStore } from '../store/employee.store';
import {
  MatDrawer,
  MatDrawerContainer,
  MatDrawerContent,
  MatSidenav,
  MatSidenavContainer,
} from '@angular/material/sidenav';
import { MatListItem, MatNavList } from '@angular/material/list';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { EmployeeFormComponent } from './employee-form/employee-form.component';

export interface PeriodicElement {
  name: string;
  position: number;
  weight: number;
  symbol: string;
}

const ELEMENT_DATA: PeriodicElement[] = [
  { position: 1, name: 'Hydrogen', weight: 1.0079, symbol: 'H' },
  { position: 2, name: 'Helium', weight: 4.0026, symbol: 'He' },
  { position: 3, name: 'Lithium', weight: 6.941, symbol: 'Li' },
  { position: 4, name: 'Beryllium', weight: 9.0122, symbol: 'Be' },
  { position: 5, name: 'Boron', weight: 10.811, symbol: 'B' },
  { position: 6, name: 'Carbon', weight: 12.0107, symbol: 'C' },
  { position: 7, name: 'Nitrogen', weight: 14.0067, symbol: 'N' },
  { position: 8, name: 'Oxygen', weight: 15.9994, symbol: 'O' },
  { position: 9, name: 'Fluorine', weight: 18.9984, symbol: 'F' },
  { position: 10, name: 'Neon', weight: 20.1797, symbol: 'Ne' },
];

@Component({
  selector: 'app-dashboard',
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
  ],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.scss',
  providers: [EmployeeStore],
})
export class DashboardComponent implements OnInit {
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
    this.drawer()?.close();
  }

  close() {
    this.drawer()?.close();
    this.selectedEmployee.set(undefined);
  }
}
