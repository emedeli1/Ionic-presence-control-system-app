import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http'
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class HttpService {
  constructor(public http: HttpClient) { }

  loadFichajes(): Observable<any> {
    return this.http.get('http://localhost:8080/fichajes')
  }

  crearFichajes(
    fechaEntrada: string, 
    idTrabajo: number, 
    idUsuario: number, 
    geolocalizacionLatitud: number, 
    geolocalizacionLongitud: number
  )
  {
    const body= {
      idTrabajo: idTrabajo,
      idUsuario: idUsuario,
      GeolocalizacionLatitud: geolocalizacionLatitud,
      GeolocalizacionLongitud: geolocalizacionLongitud,
      FechaHoraEntrada: fechaEntrada
    }
    return this.http.post('http://localhost:8080/fichaje', body);
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

  loadTrabajos(): Observable<any> {
    return this.http.get('http://localhost:8080/trabajos')
  }
}
