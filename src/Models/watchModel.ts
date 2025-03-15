export class WatchModel {
  private currentTime: Date;
  private timezoneOffset: number; // Décalage horaire en heures
  private editedTime: Date | null = null;
  private editMode: "hours" | "minutes" | "none" = "none";
  private isLightOn: boolean = false;
  private is12HourFormat: boolean = false; // Nouvelle propriété
  private updateInterval: number;

  constructor(timezoneOffset: number = 0) {
    this.timezoneOffset = timezoneOffset;
    this.currentTime = this.getCurrentTime();
    this.startClock();
    this.loadSavedTime(); // Charger l'heure sauvegardée au démarrage
  }

  private startClock(): void {
    this.updateInterval = setInterval(() => {
      if (this.editedTime) {
        // Si une heure a été réglée, on continue à partir de cette heure
        this.editedTime.setSeconds(this.editedTime.getSeconds() + 1);
      } else {
        // Sinon, on utilise l'heure actuelle
        this.currentTime = this.getCurrentTime();
      }
    }, 1000) as unknown as number;
  }

  // Sauvegarder l'heure réglée dans le localStorage
  private saveTime(): void {
    if (this.editedTime) {
      localStorage.setItem("savedTime", JSON.stringify(this.editedTime));
    } else {
      localStorage.removeItem("savedTime"); // Supprimer la sauvegarde si l'heure n'est pas réglée
    }
  }
  private loadSavedTime(): void {
    const savedTime = localStorage.getItem("savedTime");
    if (savedTime) {
      this.editedTime = new Date(JSON.parse(savedTime));
    }
  }

  getCurrentTime(): Date {
    const now = new Date();
    const offset = this.timezoneOffset * 3600 * 1000; // Convertir en millisecondes
    return new Date(now.getTime() + offset);
  }
  syncTime(baseTime: Date): void {
    const offset = this.timezoneOffset * 3600 * 1000;
    this.currentTime = new Date(baseTime.getTime() + offset);
  }

  setMode(newMode: "hours" | "minutes" | "none"): void {
    this.editMode = newMode;
    if (newMode === "none") {
      // Quand on quitte le mode édition, on conserve l'heure réglée
      if (!this.editedTime) {
        this.editedTime = new Date(this.currentTime);
      }
    }
  }

  incrementTime(): void {
    const newTime = new Date(this.currentTime);

    if (this.editMode === "hours") {
      newTime.setHours((newTime.getHours() + 1) % 24);
    } else if (this.editMode === "minutes") {
      newTime.setMinutes((newTime.getMinutes() + 1) % 60);
      if (newTime.getMinutes() === 0) {
        newTime.setHours((newTime.getHours() + 1) % 24);
      }
    }

    // Mettre à jour l'heure réglée
    this.editedTime = newTime;
  }

  toggleLight(): void {
    this.isLightOn = !this.isLightOn;
  }

  toggleHourFormat(): void {
    this.is12HourFormat = !this.is12HourFormat;
  }

  // Nouvelle méthode pour réinitialiser l'heure
  resetTime(): void {
    this.currentTime = new Date(); // Réinitialiser à l'heure actuelle
    this.editedTime = null; // Effacer l'heure réglée manuellement
    this.saveTime(); // Mettre à jour le localStorage
  }

  // Mettre à jour l'heure réglée et sauvegarder
  setEditedTime(newTime: Date): void {
    this.editedTime = newTime;
    this.saveTime(); // Sauvegarder la nouvelle heure
  }
  // Getters/Setters
  get time(): Date {
    return this.editedTime || this.currentTime;
  }

  get mode(): string {
    return this.editMode;
  }
  get light(): boolean {
    return this.isLightOn;
  }
  // Getter pour le format d'heure
  get hourFormat(): boolean {
    return this.is12HourFormat;
  }
}
