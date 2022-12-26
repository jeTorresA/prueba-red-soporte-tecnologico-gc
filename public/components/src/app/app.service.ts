import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import { DataType } from './app.interface';
import { ComputadorI } from './interfaces/computador';

@Injectable({
  providedIn: 'root'
})
export class AppService {

  #apiPath = 'http://localhost:8000/api/equipos/';
  httpOptions = {
    headers : {
      'Content-Type' : 'application/json',
    }
  }

  constructor(
    private http: HttpClient
  ) { }
/*
  get(contoller: string, action: string, parameters = '') {
    return this.http.get(`${this.#apiPath}${contoller}/${action}${parameters}`);
  }

  post(contoller: string, action: string, parameters: Record<string, any> = {}) {
    return this.http.post(`${this.#apiPath}${contoller}/${action}`, parameters);
  }

*/
  getAll() : Observable<DataType<ComputadorI>> {
    return this.http.get<DataType<ComputadorI>>(`${this.#apiPath}`);
  }

  getOne(computador : ComputadorI) : Observable<DataType<ComputadorI>> {
    return this.http.get<DataType<ComputadorI>>(`${this.#apiPath}${computador.gce_id}`);
  }

  addOne(computador : ComputadorI) : Observable<DataType<ComputadorI>> {
    return this.http.post<DataType<ComputadorI>>(`${this.#apiPath}`, computador, this.httpOptions);
  }

  updateOne(computador : ComputadorI) : Observable<DataType<ComputadorI>> {
    return this.http.patch<DataType<ComputadorI>>(`${this.#apiPath}${computador.gce_id}`, computador, this.httpOptions);
  }

  deleteOne(computador : ComputadorI) : Observable<DataType<ComputadorI>> {
    return this.http.delete<DataType<ComputadorI>>(`${this.#apiPath}${computador.gce_id}`);
  }


}

