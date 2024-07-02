import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'status',
  standalone: true,
})
export class StatusPipe implements PipeTransform {
  transform(status: number): string {
    return status === 1 ? 'active' : 'inactive';
  }
}
