import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class HttpService {

  constructor(public http: HttpClient) { }

  // USUARIOS_________________________________________________________
  loadUsuarios(): Observable<any> {
    return this.http.get('http://localhost:8080/usuarios')
  }

  obtenerUsuario(id: string): Observable<any> {
    return this.http.get(`http://localhost:8080/usuario?idUsuario=${id}`);
  }
  

  crearUsuario(
    Nombre: string,
    Usuario: string,
    Clave: string
  )
  {
    const body= {
      Nombre: Nombre,
      Usuario: Usuario,
      Clave: Clave
    }
    return this.http.post('http://localhost:8080/usuario', body);
  }

  eliminarUsuario(
    IdUsuario: string
  ): Observable <any>
  {
    console.log(`A ver ${IdUsuario}`);
    return this.http.delete(`http://localhost:8080/usuario?idUsuario=${IdUsuario}`, {
      headers: { 'Content-Type': 'application/json' }
    });
  }

  actualizarUsuario(
    idUsuario: number,
    Nombre: string,
    Usuario: string,
    Clave: string
  ): Observable<any> {

    const body = {
      Nombre: Nombre,
      Usuario: Usuario,
      Clave: Clave,
    }
    return this.http.put(`http://localhost:8080/usuario/${idUsuario}`, body, {
      headers: { 'Content-Type': 'application/json' },
    });
  }  

  // TRABAJOS___________________________________________________________________
  loadTrabajos(): Observable<any> {
    return this.http.get('http://localhost:8080/trabajos')
  }

  obtenerTrabajo(id: string): Observable<any> {
    return this.http.get(`http://localhost:8080/trabajo?idTrabajo=${id}`);
  }

  crearTrabajo(
    Nombre: string
  )
  {
    const body= {
      Nombre: Nombre
    }
    return this.http.post('http://localhost:8080/trabajo', body);
  }

  eliminarTrabajo(
    IdTrabajo: string
  ): Observable <any>
  {
    console.log(`A ver ${IdTrabajo}`);
    return this.http.delete(`http://localhost:8080/trabajo?idTrabajo=${IdTrabajo}`, {
      headers: { 'Content-Type': 'application/json' }
    });
  }

  actualizarTrabajo(
    idTrabajo: number,
    Nombre: string
  ): Observable<any> {

    const body = {
      Nombre: Nombre
    }
    return this.http.put(`http://localhost:8080/trabajo/${idTrabajo}`, body, {
      headers: { 'Content-Type': 'application/json' },
    });
  } 


  // FICHAJES___________________________________________________________________
  loadFichajes(): Observable<any> {
    return this.http.get('http://localhost:8080/fichajes')
  }

  obtenerFichaje(id: string): Observable<any> {
    return this.http.get(`http://localhost:8080/fichaje?idFichaje=${id}`);
  }

  finalizarFichaje(
    idFichaje: number,
    fechaHoraEntrada: string,
    fechaHoraSalida: string,
    horasTrabajadas: number,
    idTrabajo: number,
    idUsuario: number
  ): Observable<any> {
    //const url = 'http://localhost:8080/fichaje/${idFichaje}';
    const body = {
      idTrabajo: idTrabajo,
      FechaHoraEntrada: fechaHoraEntrada,
      idUsuario: idUsuario,
      FechaHoraSalida: fechaHoraSalida,
      HorasTrabajadas: horasTrabajadas
    };
  
    return this.http.put(`http://localhost:8080/fichaje/${idFichaje}`, body, {
      headers: { 'Content-Type': 'application/json' }
    });
  }
}
