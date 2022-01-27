import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class DataService {
  loggedIn: boolean = true

  constructor() { }
}
