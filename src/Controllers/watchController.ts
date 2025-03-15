import { WatchModel } from "../Models/watchModel";
import { WatchView } from "../Views/watchView";

export class WatchController {
  private model: WatchModel;
  private view: WatchView;
  private modeClicks: number = 0;
  private onDelete: () => void;

  constructor(model: WatchModel, view: WatchView, onDelete: () => void) {
    this.model = model;
    this.view = view;
    this.onDelete = onDelete;

    this.view.bindDeleteButton(() => this.handleDelete());
    this.setupEventHandlers();
    this.startUpdateLoop();
  }

  private setupEventHandlers(): void {
    this.view.bindModeButton(() => this.handleMode());
    this.view.bindIncreaseButton(() => this.handleIncrease());
    this.view.bindLightButton(() => this.handleLight());
    this.view.bindFormatButton(() => this.handleFormat()); // Nouvel événement
    this.view.bindResetButton(() => this.handleReset()); // Nouvel événement
  }

  private startUpdateLoop(): void {
    setInterval(() => {
      this.view.updateDisplay(
        this.model.time,
        this.model.mode,
        this.model.light,
        this.model.hourFormat // Passer le format d'heure à la vue
      );
    }, 1000);
  }

  private handleMode(): void {
    this.modeClicks = (this.modeClicks + 1) % 3;

    switch (this.modeClicks) {
      case 1:
        this.model.setMode("hours");
        break;
      case 2:
        this.model.setMode("minutes");
        break;
      default:
        this.model.setMode("none");
    }
  }

  private handleIncrease(): void {
    this.model.incrementTime();
    if (this.model.mode !== "none") {
      this.model.setEditedTime(this.model.time); // Sauvegarder l'heure réglée
    }
  }

  private handleLight(): void {
    this.model.toggleLight();
  }

  // Nouvelle méthode pour gérer le changement de format
  private handleFormat(): void {
    this.model.toggleHourFormat();
  }
  // Mettre à jour la méthode handleReset pour supprimer la sauvegarde
  private handleReset(): void {
    this.model.resetTime();
  }

  private handleDelete(): void {
    this.onDelete(); // Appeler la fonction de suppression
  }
}
