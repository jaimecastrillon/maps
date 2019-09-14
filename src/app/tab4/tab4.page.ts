import { Component, OnInit } from "@angular/core";
import { Marcador } from "../class/marcador";
import { Storage } from "@ionic/storage";

@Component({
  selector: "app-tab4",
  templateUrl: "tab4.page.html",
  styleUrls: ["tab4.page.scss"]
})
export class Tab4Page implements OnInit {
  marcadores: Marcador[] = [];
  lat = 4.60972222222;
  lng = -74.0816666667;
  paths: Array<any> = [];
  polygon = false;
  latA: number;
  latB: number;
  lngA: number;
  lngB: number;

  constructor(private storage: Storage) {}

  ngOnInit() {
    this.storage.get("polygons").then(val => {
      const marcador: Marcador = JSON.parse(val);
      for (let i in marcador) {
        this.marcadores.push(marcador[i]);
        this.paths.push(marcador[i]);
      }

      if (this.marcadores.length >= 3) {
        this.paths = this.marcadores;
        this.polygon = true;
      }
    });
  }

  ingresarMarcador(lat, lng, title, description) {
    const nuevoMarcador = new Marcador(lat, lng, title, description);
    this.marcadores.push(nuevoMarcador);
  }

  agregarMarcador(evento) {
    this.ingresarMarcador(
      parseFloat(evento.coords.lat),
      parseFloat(evento.coords.lng),
      evento.coords.title,
      evento.coords.description
    );

    if (this.marcadores.length % 2) {
      this.paths = this.marcadores;
      this.polygon = true;
    } else {
      this.polygon = false;
    }

    //Almacenamiento en local storage
    this.storage.set("polygons", JSON.stringify(this.marcadores));
  }
}
