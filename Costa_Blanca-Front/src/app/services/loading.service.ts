import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class LoadingService {
  private loading: boolean = false;

  constructor() { }

  startLoad() {
    this.loading = true;
  }

  stopLoad() {
    this.loading = false;
  }

  isLoading(): boolean {
    return this.loading;
  }
}