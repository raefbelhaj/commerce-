import { Injectable } from "@angular/core";
import type { Observable } from "rxjs";
import { BehaviorSubject } from "rxjs";

@Injectable({
  providedIn: "root",
})
export class LocalStorageService {
  private booleanSubject: BehaviorSubject<boolean>;

  booleanObservable: Observable<boolean>;

  constructor() {
    const storedValue = localStorage.getItem("isLoggedIn");
    const initialValue = storedValue ? JSON.parse(storedValue) : false;

    this.booleanSubject = new BehaviorSubject<boolean>(initialValue);
    this.booleanObservable = this.booleanSubject.asObservable();
  }

  updateLogInStatus(value: boolean): void {
    this.booleanSubject.next(value);
    localStorage.setItem("isLoggedIn", JSON.stringify(value));
  }

  getLogInStatus(): boolean {
    const storedValue = localStorage.getItem("isLoggedIn");
    return storedValue ? JSON.parse(storedValue) : false;
  }
}
