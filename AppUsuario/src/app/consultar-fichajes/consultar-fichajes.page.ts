import { Component, OnInit } from '@angular/core';
import { HttpService } from '../services/http.service';
import { Geolocation } from '@capacitor/geolocation';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-consultar-fichajes',
  templateUrl: './consultar-fichajes.page.html',
  styleUrls: ['./consultar-fichajes.page.scss'],
})
export class ConsultarFichajesPage implements OnInit {
  fichajesArray: any[] = [];
  direccionGeorreferenciada:any;

  constructor(private httpservice: HttpService, public http: HttpClient) { }
  
  async ngOnInit() {
    this.httpservice.loadFichajes().subscribe(
      async (response)=>{
        const ahora = new Date().getTime();
        console.log(response);
        this.fichajesArray.forEach(fichaje => {
          fichaje.georreferencia = '';
        })
        this.fichajesArray = response.body.filter((fichaje: any) => {
          const fechaEntrada = new Date(fichaje.FechaHoraEntrada).getTime();
          const diferenciaHoras = (ahora - fechaEntrada) / (1000 * 60 * 60);
          return diferenciaHoras <= 24;
        });
        
        console.log(this.fichajesArray)
        for(let fichaje of this.fichajesArray){
          fichaje.FechaHoraEntrada = this.convertirFechaFormatoLegible(fichaje.FechaHoraEntrada);
          if (fichaje.FechaHoraSalida !== null){
            fichaje.FechaHoraSalida = this.convertirFechaFormatoLegible(fichaje.FechaHoraSalida);
          }
          fichaje.georreferencia = await this.locate(fichaje.GeolocalizacionLatitud, fichaje.GeolocalizacionLongitud);
          console.log(fichaje.georreferencia);
        }
      }
    )
  }

  async locate(latitud:any, longitud:any) {

    //Obtener Georreferenciación
    const urlNominatin='https://nominatim.openstreetmap.org/reverse?format=json&lat='
    +latitud+'&lon='+longitud+'&addressdetails=1';
    return new Promise((resolve, reject) => {
      this.http.get(urlNominatin).subscribe(
        (data: any) => {
          const direccion = data.display_name || 'Dirección no disponible';
          resolve(direccion);
        },
        (error) => {
          console.error('Error al obtener la dirección:', error);
          resolve('Error al obtener la dirección');
        }
      );
    });
  }

  convertirFechaFormatoLegible(fecha: string): string {
    const date = new Date(fecha);
    const año = date.getFullYear();
    const mes = String(date.getMonth() + 1).padStart(2, '0');
    const día = String(date.getDate()).padStart(2, '0');
    const horas = String(date.getHours()).padStart(2, '0');
    const minutos = String(date.getMinutes()).padStart(2, '0');
    const segundos = String(date.getSeconds()).padStart(2, '0');
  
    return `${año}-${mes}-${día} ${horas}:${minutos}:${segundos}`;
  }

}
