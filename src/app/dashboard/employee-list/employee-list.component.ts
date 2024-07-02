import { Component, effect, input, output } from '@angular/core';
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
  MatTableDataSource,
} from '@angular/material/table';
import { MatFormField, MatInput, MatLabel } from '@angular/material/input';
import { MatIconButton } from '@angular/material/button';
import { MatIcon } from '@angular/material/icon';
import {
  MatMenu,
  MatMenuContent,
  MatMenuItem,
  MatMenuTrigger,
} from '@angular/material/menu';
import { Employee } from '../../models';
import { TranslateModule } from '@ngx-translate/core';
import { StatusPipe } from '../../pipes';
import { StatusDirective } from '../../directives';

@Component({
  selector: 'app-employee-list',
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
    TranslateModule,
    StatusPipe,
    StatusDirective,
  ],
  templateUrl: './employee-list.component.html',
  styleUrl: './employee-list.component.scss',
})
export class EmployeeListComponent {
  employees = input.required<Employee[]>();
  searchKey = input.required<string>();

  edit = output<number>();
  remove = output<number>();

  dataSource = new MatTableDataSource<Employee>();

  displayedColumns: string[] = [
    'firstName',
    'lastName',
    'phone',
    'status',
    'action',
  ];

  constructor() {
    effect(() => {
      this.dataSource = new MatTableDataSource(this.employees());
      this.dataSource.filter = this.searchKey();
    });
  }
}
