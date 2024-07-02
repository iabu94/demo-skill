import { Component, effect, inject, input, output } from '@angular/core';
import { MatButton, MatIconButton } from '@angular/material/button';
import { MatIcon } from '@angular/material/icon';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { MatError, MatFormField, MatLabel } from '@angular/material/form-field';
import { MatInput } from '@angular/material/input';
import { Employee } from '../../models';

@Component({
  selector: 'app-employee-form',
  standalone: true,
  imports: [
    MatIconButton,
    MatIcon,
    ReactiveFormsModule,
    MatLabel,
    MatFormField,
    MatInput,
    MatError,
    MatButton,
  ],
  templateUrl: './employee-form.component.html',
  styleUrl: './employee-form.component.scss',
})
export class EmployeeFormComponent {
  employee = input<Employee>();

  close = output();
  save = output<Employee>();

  private fb = inject(FormBuilder);

  employeeForm: FormGroup;

  constructor() {
    this.employeeForm = this.fb.group({
      id: [''],
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      phone: ['', Validators.required],
      status: [1],
    });

    effect(() => {
      if (this.employee()) {
        this.employeeForm.patchValue(this.employee() as Employee);
      } else {
        this.employeeForm.reset();
      }
    });
  }

  addOrEdit() {
    if (this.employeeForm.valid) {
      this.save.emit(this.employeeForm.value);
    }
  }
}
