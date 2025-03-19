import { WatchModel } from "../Models/watchModel";
import { WatchView } from "../Views/watchView";
import { WatchController } from "../Controllers/watchController";
import { AnalogWatchModel } from "../Models/AnalogWatchModel";
import { AnalogWatchView } from "../Views/AnalogWatchView";
import { AnalogWatchController } from "../Controllers/AnalogWatchController";

export class MainController {
  private watches: {
    model: WatchModel | AnalogWatchModel;
    view: WatchView | AnalogWatchView;
    controller: WatchController | AnalogWatchController;
  }[] = [];
  private addDigitalButton: HTMLButtonElement;
  private addAnalogButton: HTMLButtonElement;

  constructor() {
    this.addDigitalButton = document.createElement("button");
    this.addDigitalButton.className = "btn add-btn-dg";
    this.addDigitalButton.textContent = "Add Digital watch";
    this.addDigitalButton.addEventListener("click", () =>
      this.addDigitalWatch()
    );
    document.body.appendChild(this.addDigitalButton);

    this.addAnalogButton = document.createElement("button");
    this.addAnalogButton.className = "btn add-btn-an";
    this.addAnalogButton.textContent = "Add Analog watch";
    this.addAnalogButton.addEventListener("click", () => this.addAnalogWatch());
    document.body.appendChild(this.addAnalogButton);

    setInterval(() => this.syncWatches(), 1000);
  }

  private addOffsetPrompt(): { isValidInput: boolean; offset: number } {
    const systemTimezoneOffset = new Date().getTimezoneOffset() / -60;
    console.log(
      `Décalage horaire détecté : UTC${
        systemTimezoneOffset >= 0 ? "+" : ""
      }${systemTimezoneOffset}`
    );

    const systemTimezoneMessage = `Le fuseau horaire actuel est : UTC${
      systemTimezoneOffset >= 0 ? "+" : ""
    }${systemTimezoneOffset}.`;

    let timezoneOffset: string | null = prompt(
      `${systemTimezoneMessage}\n\nEntrez un fuseau horaire (entre -12 et +14) :`
    );

    let offset: number;
    let isValidInput: boolean = false;

    while (!isValidInput) {
      if (timezoneOffset === null) {
        return { isValidInput: false, offset: 0 };
      }

      if (timezoneOffset.trim() === "") {
        offset = systemTimezoneOffset - 1;
        isValidInput = true;
        break;
      }

      if (isNaN(Number(timezoneOffset))) {
        alert("Erreur : Vous devez entrer un nombre valide.");
        timezoneOffset = prompt(
          `${systemTimezoneMessage}\n\nEntrez un fuseau horaire (entre -12 et +14) :`
        );
        continue;
      }

      offset = parseInt(timezoneOffset, 10) - 1;
      if (offset < -12 || offset > 14) {
        alert("Erreur : Le fuseau horaire doit être compris entre -12 et +14.");
        timezoneOffset = prompt(
          `${systemTimezoneMessage}\n\nEntrez un fuseau horaire (entre -12 et +14) :`
        );
        continue;
      }

      isValidInput = true;
    }

    return { isValidInput, offset };
  }

  private addDigitalWatch(): void {
    const validOffsetPrompt = this.addOffsetPrompt();
    if (validOffsetPrompt.isValidInput) {
      const model = new WatchModel(validOffsetPrompt.offset);
      const view = new WatchView();
      const controller = new WatchController(model, view, () =>
        this.deleteWatch(model, view)
      );
      this.watches.push({ model, view, controller });
      document.body.appendChild(view.getContainer());
    }
  }

  private addAnalogWatch(): void {
    const validOffsetPrompt = this.addOffsetPrompt();
    if (validOffsetPrompt.isValidInput) {
      const model = new AnalogWatchModel(validOffsetPrompt.offset);
      const view = new AnalogWatchView();
      const controller = new AnalogWatchController(model, view, (model, view) =>
        this.deleteWatch(model, view)
      );

      this.watches.push({ model, view, controller });
      document.body.appendChild(view.getContainer());
    }
  }

  private deleteWatch(
    model: WatchModel | AnalogWatchModel,
    view: WatchView | AnalogWatchView
  ): void {
    this.watches = this.watches.filter((watch) => watch.model !== model);
    view.getContainer().remove();
  }

  private syncWatches(): void {
    const now = new Date();
    this.watches.forEach((watch) => {
      if (watch.controller instanceof AnalogWatchController) {
        watch.controller.update(now);
      } else if (watch.controller instanceof WatchController) {
        // watch.controller.update(now);
      }
    });
  }
}
