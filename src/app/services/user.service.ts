import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  private name: string = '';
  private email: string = '';
  private job: string = '';
  private image: string = '';
  private phone: number = 0;
  private address: string = '';


  constructor() { }



  setUser(name: string, email: string, job: string, image: string, phone: number, address: string): void {
    this.name = name;
    this.email = email;
    this.job = job;
    this.image = image;
    this.phone = phone;
    this.address = address;
  }

  getName(): string  { return this.name }
  getEmail(): string  { return this.email }
  getJob(): string  { return this.job }
  getImage(): string  { return this.image }
  getPhone(): number  { return this.phone }
  getAddress(): string  { return this.address }

}
