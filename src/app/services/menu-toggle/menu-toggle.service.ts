import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class MenuToggleService {
  private menuVisible = new BehaviorSubject<boolean>(false);
  menuVisible$ = this.menuVisible.asObservable();

  toggleMenu(): void {
    this.menuVisible.next(!this.menuVisible.value);
  }

  closeMenu(): void {
    this.menuVisible.next(false);
  }
}