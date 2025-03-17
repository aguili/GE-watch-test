import { WatchModel } from "../Models/watchModel";
import { WatchView } from "../Views/watchView";
import { WatchController } from "../Controllers/watchController";

export class MainController {
  private watches: {
    model: WatchModel;
    view: WatchView;
    controller: WatchController;
  }[] = [];
  private addButton: HTMLButtonElement;

  constructor() {
    this.addButton = document.createElement("button");
    this.addButton.className = "btn add-btn";
    this.addButton.textContent = "Add watch";
    this.addButton.addEventListener("click", () => this.addWatch());
    document.body.appendChild(this.addButton);

    // Synchroniser toutes les montres chaque seconde
    setInterval(() => this.syncWatches(), 1000);
  }

  private addWatch(): void {
    let timezoneOffset: string | null;
    let offset: number;
    let isValidInput: boolean = false;

    while (!isValidInput) {
      timezoneOffset = prompt(
        "Choisissez un fuseau horaire (ex: 2 pour GMT+2, -3 pour GMT-3) :"
      );
      if (timezoneOffset === null) {
        return;
      }
      if (timezoneOffset.trim() === "") {
        offset = 0; // Convertir en heures
        console.log("Décalage horaire du système (GMT):", offset);
        break; // Sortir de la boucle
      }
      if (isNaN(Number(timezoneOffset))) {
        alert("Erreur : Vous devez entrer un nombre valide.");
        continue;
      }

      offset = parseInt(timezoneOffset, 10);
      if (offset < -12 || offset > 12) {
        alert("Erreur : Le fuseau horaire doit être compris entre -12 et +12.");
        continue;
      }
      isValidInput = true;
    }

    // Créer une nouvelle montre avec le décalage horaire valide
    const model = new WatchModel(offset);
    const view = new WatchView();
    const controller = new WatchController(model, view, () =>
      this.deleteWatch(model, view)
    );
    this.watches.push({ model, view, controller });
    document.body.appendChild(view.getContainer());
  }

  private deleteWatch(model: WatchModel, view: WatchView): void {
    this.watches = this.watches.filter((watch) => watch.model !== model);
    view.getContainer().remove();
  }

  private syncWatches(): void {
    const now = new Date();
    this.watches.forEach((watch) => watch.model.syncTime(now));
  }
}
