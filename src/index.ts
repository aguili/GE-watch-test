import { WatchModel } from "./Models/watchModel";
import { WatchView } from "./Views/watchView";
import { WatchController } from "./Controllers/watchController";

class MainController {
  private watches: {
    model: WatchModel;
    view: WatchView;
    controller: WatchController;
  }[] = [];
  private addButton: HTMLButtonElement;

  constructor() {
    this.addButton = document.createElement("button");
    this.addButton.className = "btn add-btn";
    this.addButton.textContent = "Add";
    this.addButton.addEventListener("click", () => this.addWatch());
    document.body.appendChild(this.addButton);

    // Synchroniser toutes les montres chaque seconde
    setInterval(() => this.syncWatches(), 1000);
  }

  private addWatch(): void {
    // Demander à l'utilisateur de choisir un fuseau horaire
    const timezoneOffset = prompt(
      "Choisissez un fuseau horaire (ex: 2 pour GMT+2):"
    );
    const offset = timezoneOffset ? parseInt(timezoneOffset, 10) : 0;

    // Créer une nouvelle montre
    const model = new WatchModel(offset);
    const view = new WatchView();
    const controller = new WatchController(model, view, () =>
      this.deleteWatch(model, view)
    );

    // Ajouter la montre à la liste
    this.watches.push({ model, view, controller });

    // Afficher la nouvelle montre
    document.body.appendChild(view.getContainer());
  }

  private deleteWatch(model: WatchModel, view: WatchView): void {
    // Supprimer la montre de la liste
    this.watches = this.watches.filter((watch) => watch.model !== model);

    // Supprimer l'élément du DOM
    view.getContainer().remove();
  }

  private syncWatches(): void {
    const now = new Date();
    this.watches.forEach((watch) => watch.model.syncTime(now));
  }
}

// Initialiser l'application
new MainController();
