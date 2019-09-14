import { Component, OnInit } from "@angular/core";
import { Marcador } from "../class/marcador";
import { Storage } from "@ionic/storage";

@Component({
  selector: "app-tab3",
  templateUrl: "tab3.page.html",
  styleUrls: ["tab3.page.scss"]
})
export class Tab3Page implements OnInit {

  marcadores: Marcador[] = [];
  lat = 4.60972222222;
  lng = -74.0816666667;

  constructor(private storage: Storage) {}

  ngOnInit() {
    this.storage.get("lines").then(val => {
      const marcador: Marcador = JSON.parse(val);
      for (let i in marcador) {
        this.marcadores.push(marcador[i]);
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
    //Almacenamiento en local storage
    this.storage.set("lines", JSON.stringify(this.marcadores));
  }
}
