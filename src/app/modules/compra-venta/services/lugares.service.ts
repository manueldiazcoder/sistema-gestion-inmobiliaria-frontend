import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class LugaresService {

  // Se declara la variable que almacenara coordenadas que podrá tener un valor indefinido al principio
  coordenadas: [number, number] | undefined;

  get coordenadasListas(): boolean {
    // Comprobación booleana
    return !!this.coordenadas;
  }

  constructor() {
    this.obtenerCoordenadasUsuario();
  }

  async obtenerCoordenadasUsuario(): Promise<[number, number]> {
    return new Promise((resolve, reject) => {
      navigator.geolocation.getCurrentPosition(
        ({ coords }) => {
          this.coordenadas = [coords.latitude, coords.longitude];
          resolve(this.coordenadas);
        },
        // Segundo argumento: se ejecuta si el navegador no da la ubicación
        // (permiso denegado, sin GPS o sin conexión). Sin esto la promesa
        // quedaria pendiente para siempre.
        (error) => {
          console.error('No se pudo obtener la geolocalizacion', error);
          reject(error);
        }
      );
    });
  }
}