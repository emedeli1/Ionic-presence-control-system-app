import { Component, OnInit } from '@angular/core';
import { HttpService } from '../services/http.service';
import { Geolocation } from '@capacitor/geolocation';

@Component({
  selector: 'app-registrar-fichaje',
  templateUrl: './registrar-fichaje.page.html',
  styleUrls: ['./registrar-fichaje.page.scss'],
})
export class RegistrarFichajePage implements OnInit {
  latitud:any;
  longitud:any;
  trabajosArray: any[] = [];
  selectedTrabajo!: number;
  tieneFichajeReciente: boolean = false;
  ultimoFichajeId: number | null = null;
  fichajeAbierto:any;
  mensajeEstado: string = '';

  constructor(private httpservice: HttpService) {
  }

  ngOnInit() {
    this.httpservice.loadTrabajos().subscribe(
      (response)=>{
        console.log(response)
        this.trabajosArray = response.body;
      }
    )
    this.locate();

    this.httpservice.loadFichajes().subscribe((response) => {
      const ahora = new Date().getTime();
      console.log('Fichajes cargados:', response.body)
      
      //Filtrar fichajes pendientes
      this.fichajeAbierto = response.body.find((fichaje: any) => {
        const fechaEntrada = new Date(fichaje.FechaHoraEntrada).getTime();
        const diferenciaHoras = (ahora - fechaEntrada) / (1000 * 60 * 60);
        return !fichaje.FechaHoraSalida && diferenciaHoras <= 12;
      });

      //Si hay un fichaje abierto de las últimas 12 horas, cambia el estado
      if(this.fichajeAbierto) {
        console.log('Fichaje abierto encontrado:', this.fichajeAbierto);
        this.tieneFichajeReciente = true;
        this.ultimoFichajeId = this.fichajeAbierto.IdFichaje;
      } else{
        console.log('No hay fichajes abiertos en las últimas 12 horas');
      }
    });
  }

  calcularHorasTrabajadas(fechaHoraEntrada: string, fechaHoraSalida: string): number {
    const entrada = new Date(fechaHoraEntrada).getTime();
    const salida = new Date(fechaHoraSalida).getTime();
    const horasTrabajadas = (salida - entrada) / (1000 * 60 * 60);  // Convierte la diferencia a horas
    return Math.floor(horasTrabajadas);
  }

  async locate() {

      //Obtener Geolocalización
      const coordinates = await Geolocation.getCurrentPosition();
      this.latitud=coordinates.coords.latitude;
      this.longitud=coordinates.coords.longitude;
      console.log('Current position:', coordinates);
  }

  realizarFichaje() {
    const fecha = new Date().toISOString();
    const fechaHoraSalida = new Date().toISOString();

    console.log('Fecha actual:', fecha);
    console.log('Tiene fichaje reciente', this.tieneFichajeReciente);
    console.log('ID último fichaje:', this.ultimoFichajeId);

    if (this.tieneFichajeReciente && this.ultimoFichajeId) {
      const fechaHoraEntrada = this.fichajeAbierto.FechaHoraEntrada;
      const trabajoAbierto = this.fichajeAbierto.IdTrabajo;
      const horasTrabajadas = this.calcularHorasTrabajadas(fechaHoraEntrada, fechaHoraSalida);

      
      //Finalizar el fichaje
      this.httpservice.finalizarFichaje(
        this.ultimoFichajeId, 
        fechaHoraEntrada,
        fechaHoraSalida,
        horasTrabajadas,
        trabajoAbierto,
        1
      ).subscribe(response => {
        console.log('Fichaje finalizado:', response);
        this.mensajeEstado = 'Fichaje finalizado correctamente.'; // Mensaje de éxito
        this.tieneFichajeReciente = false;
        this.ultimoFichajeId = null;
        },
        error => {
          console.error('Error al finalizar el fichaje:', error);
          this.mensajeEstado = 'Error al finalizar el fichaje.';
        }
      );
    } else{
      if (!this.selectedTrabajo) {
        alert("Debes seleccionar un trabajo para registrar un fichaje.");
        return;
      }
  
      this.httpservice.crearFichajes(
        fecha, 
        this.selectedTrabajo, 
        1, 
        this.latitud, 
        this.longitud
      ).subscribe(
        (response)=>{
        console.log(response);
        this.mensajeEstado = 'Fichaje iniciado correctamente.'; // Mensaje de éxito
      },
      error => {
        console.error('Error al iniciar el fichaje:', error);
        this.mensajeEstado = 'Error al iniciar el fichaje.';
      }
    );
    }
  }
}
