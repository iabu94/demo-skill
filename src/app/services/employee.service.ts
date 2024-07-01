import { inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Employee } from '../models';

@Injectable({
  providedIn: 'root',
})
export class EmployeeService {
  private readonly path = 'data.json';

  private http = inject(HttpClient);

  getEmployees() {
    return this.http.get<Employee[]>(this.path);
  }
}
