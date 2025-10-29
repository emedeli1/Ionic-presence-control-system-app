import { Component, OnInit } from '@angular/core';
import { HttpService } from '../services/http.service';
import { HttpClient } from '@angular/common/http';
import { Geolocation } from '@capacitor/geolocation';
import * as Leaflet from 'leaflet';
import { icon, Marker } from 'leaflet';

@Component({
  selector: 'app-gestion-fichajes',
  templateUrl: './gestion-fichajes.page.html',
  styleUrls: ['./gestion-fichajes.page.scss'],
})
export class GestionFichajesPage implements OnInit {
  fichajesArray: any[] = [];
  filteredFichajesArray: any[] = [];
  IdFichaje: number | null=null;
  Usuario: string = '';
  IdUsuario: number | null=null;
  direccionGeorreferenciada: any;
  map?: Leaflet.Map | null;
  mapVisible = false;
  searchText: string = '';
  selectedDate: string = '';
  fechaSeleccionada: string | null = null;
  showCalendar: boolean = false; 

  constructor(private httpservice: HttpService, public http: HttpClient) { }

  async ngOnInit() {
    this.httpservice.loadFichajes().subscribe(
      async (response) => {
        const ahora = new Date().getTime();
        this.fichajesArray = response.body;
        this.filteredFichajesArray = this.fichajesArray;
  
        for (let fichaje of this.fichajesArray) {
          // Guarda las fechas en formato ISO para usar en el PUT
          const fechaHoraEntradaISO = fichaje.FechaHoraEntrada;
          const fechaHoraSalidaISO = fichaje.FechaHoraSalida;
  
          // Convierte las fechas a formato legible para mostrar en la interfaz
          fichaje.FechaHoraEntrada = this.convertirFechaFormatoLegible(fechaHoraEntradaISO);
          if (fechaHoraSalidaISO) {
            fichaje.FechaHoraSalida = this.convertirFechaFormatoLegible(fechaHoraSalidaISO);
          }
  
          // Verifica si el fichaje no tiene salida y es de hace más de 12 horas
          const fechaHoraEntradaMs = new Date(fechaHoraEntradaISO).getTime();
          const horasDiferencia = (ahora - fechaHoraEntradaMs) / (1000 * 60 * 60);
          if (!fechaHoraSalidaISO && horasDiferencia > 12) {
            console.log(`Fichaje ${fichaje.IdFichaje} sin finalizar. Actualizando...`);
  
            // Calcula la fecha de salida como 12 horas después de la entrada
            const fechaHoraSalida = new Date(fechaHoraEntradaMs + 12 * 60 * 60 * 1000).toISOString();
            const horasTrabajadas = 12; // Siempre será 12 en este caso
  
            // Llama al servicio para finalizar el fichaje
            this.httpservice
              .finalizarFichaje(
                fichaje.IdFichaje,
                fechaHoraEntradaISO, // Usar el formato ISO original
                fechaHoraSalida,
                horasTrabajadas,
                fichaje.idTrabajo,
                fichaje.idUsuario
              )
              .subscribe(
                (response) => {
                  console.log(`Fichaje ${fichaje.IdFichaje} actualizado correctamente:`, response);
                  fichaje.FechaHoraSalida = this.convertirFechaFormatoLegible(fechaHoraSalida);
                },
                (error) => {
                  console.error(`Error al actualizar el fichaje ${fichaje.IdFichaje}:`, error);
                }
              );
          }
  
          // Georreferencia del fichaje
          fichaje.georreferencia = await this.locate(fichaje.GeolocalizacionLatitud, fichaje.GeolocalizacionLongitud);
        }
      },
      (error) => {
        console.error('Error al cargar fichajes:', error);
      }
    );
  }

  toggleCalendar() {
    this.showCalendar = !this.showCalendar;
  }

  clearDate() {
    this.fechaSeleccionada = null; // Elimina la fecha seleccionada
    this.filteredFichajesArray = this.fichajesArray; // Restablece la lista completa de fichajes
    this.showCalendar = false; // Oculta el calendario si estaba abierto
  }

  leafletMap(latitud: number, longitud: number) {
    const iconRetinaUrl = 'assets/marker-icon-2x.png';
    const iconUrl = 'assets/marker-icon.png';
    const shadowUrl = 'assets/marker-shadow.png';
    const iconDefault = icon({
      iconRetinaUrl,
      iconUrl,
      shadowUrl,
      iconSize: [25, 41],
      iconAnchor: [12, 41],
      popupAnchor: [1, -34],
      tooltipAnchor: [16, -28],
      shadowSize: [41, 41],
    });
  
    Marker.prototype.options.icon = iconDefault;
  
    if (this.map) {
      this.map.setView([latitud, longitud], 15); // Centra el mapa en las coordenadas
      Leaflet.marker([latitud, longitud]).addTo(this.map).bindPopup('Ubicación del fichaje').openPopup();
      return;
    }
  
    this.map = Leaflet.map('mapId').setView([latitud, longitud], 15);
    Leaflet.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution: 'DISM c Ionic Leaflet',
    }).addTo(this.map);
  
    Leaflet.marker([latitud, longitud]).addTo(this.map).bindPopup('Ubicación del fichaje').openPopup();
  }

  filterByUser() {
    const searchTerm = this.searchText.toLowerCase();
    if (!searchTerm) {
      this.filteredFichajesArray = this.fichajesArray; // Si no hay texto, muestra todos los fichajes
    } else {
      this.filteredFichajesArray = this.fichajesArray.filter(fichaje => {
        const usuarioNombre = fichaje.usuarioNombre.toLowerCase();
        return usuarioNombre.includes(searchTerm);
      });
    }
  }

  filterByDate() {
    if (this.fechaSeleccionada) {
      const fechaSeleccionadaSinHora = this.fechaSeleccionada.split('T')[0];
      console.log(fechaSeleccionadaSinHora);
      
      // Filtramos los fichajes comparando solo las fechas
      this.filteredFichajesArray = this.fichajesArray.filter(fichaje => {
        const fechaHoraEntradaSinHora = fichaje.FechaHoraEntrada.split(' ')[0];
        console.log(fechaHoraEntradaSinHora);
  
        // Comparamos solo las fechas (sin la hora)
        return fechaHoraEntradaSinHora === fechaSeleccionadaSinHora;
      });
    } else {
      this.filteredFichajesArray = this.fichajesArray;  // Si no se seleccionó una fecha, mostramos todos los fichajes
    }
  
    // Ocultar el calendario una vez se haya seleccionado la fecha
    this.showCalendar = false;
  }
  

  mostrarMapa(latitud: number, longitud: number) {
    this.mapVisible = true;
    setTimeout(() => {
      this.leafletMap(latitud, longitud);
    }, 100); // Retrasa la inicialización para permitir que el DOM se renderice
  }

  cerrarMapa() {
    this.mapVisible = false;
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
