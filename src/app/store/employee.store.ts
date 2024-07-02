import { patchState, signalStore, withMethods, withState } from '@ngrx/signals';
import { Employee } from '../models';
import { inject } from '@angular/core';
import { EmployeeService } from '../services';
import { lastValueFrom } from 'rxjs';

interface EmployeeState {
  employees: Employee[];
}

const initialState: EmployeeState = {
  employees: [],
};

export const EmployeeStore = signalStore(
  withState(initialState),
  withMethods((store, service = inject(EmployeeService)) => ({
    async getAll() {
      const employees = await lastValueFrom(service.getEmployees());
      patchState(store, { employees });
    },
    delete(id: number) {
      patchState(store, state => ({
        employees: state.employees.filter(e => e.id !== id),
      }));
    },
    update(employee: Employee) {
      patchState(store, state => ({
        employees: state.employees.map(e =>
          e.id === employee.id ? employee : e
        ),
      }));
    },
    add(employee: Employee) {
      employee.id = store.employees().length + 1;
      employee.status = 1;
      patchState(store, state => ({
        employees: [...state.employees, employee],
      }));
    },
  }))
);
