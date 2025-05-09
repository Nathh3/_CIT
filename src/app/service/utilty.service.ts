import { ElementRef, Injectable } from '@angular/core';
import { Modal } from 'bootstrap';
import { Observable, Subject } from 'rxjs';
import { ToasterModel } from '../models/core/toaster.model';
import { Cliente } from '../models/cliente';

@Injectable({
  providedIn: 'root'
})
export class UtiltyService {
  private toasterSubject = new Subject<ToasterModel>();
  private sessionKey = "ClienteKeySession"

  toaster$ = this.toasterSubject.asObservable();

  constructor() { }
  Login(usr: string, pwd: string): Observable<boolean> {
    return new Observable(subs => {
      let rs = usr == 'admin' && pwd == 'admin';
      this.setSession(this.sessionKey, {
        id: 1, nombre: "Nathalia", email: "nat@gmail.com", telefono: "123455",
        tipoCamionRequerido: "FTL", pesoCarga: 678, transporteComestibles: true, estibas: false
      })
      subs.next(rs);
      subs.complete();
    })
  }

  getCurrentClient(): Cliente | undefined {
    return this.getSession<Cliente>(this.sessionKey);
  }

  logout() {
    this.setSession(this.sessionKey, undefined);
  }

  isLoggedIn(): boolean {
    let usr = this.getSession(this.sessionKey);
    return (usr != undefined);
  }

  getSession<T>(key: string) {
    let obj = sessionStorage.getItem(btoa(key));
    if (obj)
      return JSON.parse(atob(obj)) as T;
    else
      return undefined;
  }

  setSession(key: string, value: any) {
    if (value)
      sessionStorage.setItem(btoa(key), btoa(JSON.stringify(value)));
    else
      sessionStorage.removeItem(key);
  }

  AbrirModal(modal: ElementRef | undefined) {
    if (modal) {
      let bsModal = Modal.getOrCreateInstance(modal.nativeElement);
      bsModal.show();

    }
  }


  showToaster(message: string, delay: number, type: 'success' | 'danger' | 'warning' | 'info' | 'primary') {
    this.toasterSubject.next({ message, delay: (delay * 1000), type });
  }

}
