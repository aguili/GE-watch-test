export class WatchModel {
  private currentTime: Date;
  private timezoneOffset: number;
  private editedTime: Date | null = null;
  private editMode: "hours" | "minutes" | "none" = "none";
  private isLightOn: boolean = false;
  private is12HourFormat: boolean = false;
  private updateInterval: number;

  constructor(timezoneOffset: number = 0) {
    this.timezoneOffset = timezoneOffset;
    this.currentTime = this.getCurrentTime();
    this.startClock();
    this.loadSavedTime();
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
  get hourFormat(): boolean {
    return this.is12HourFormat;
  }

  private startClock(): void {
    this.updateInterval = setInterval(() => {
      if (this.editedTime) {
        this.editedTime.setSeconds(this.editedTime.getSeconds() + 1);
      } else {
        this.currentTime = this.getCurrentTime();
      }
    }, 1000) as unknown as number;
  }

  // Gérer l'heure réglée dans le localStorage
  private saveTime(): void {
    if (this.editedTime) {
      localStorage.setItem("savedTime", JSON.stringify(this.editedTime));
    } else {
      localStorage.removeItem("savedTime");
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
    const offset = this.timezoneOffset * 3600 * 1000;
    return new Date(now.getTime() + offset);
  }
  syncTime(baseTime: Date): void {
    const offset = this.timezoneOffset * 3600 * 1000;
    this.currentTime = new Date(baseTime.getTime() + offset);
  }

  setMode(newMode: "hours" | "minutes" | "none"): void {
    this.editMode = newMode;
    if (newMode === "none") {
      if (!this.editedTime) {
        this.editedTime = new Date(this.currentTime);
      }
    }
  }

  incrementTime(): void {
    const timeToUpdate = this.editedTime || this.currentTime;
    const newTime = new Date(timeToUpdate);

    if (this.editMode === "hours") {
      newTime.setHours((newTime.getHours() + 1) % 24);
    } else if (this.editMode === "minutes") {
      newTime.setMinutes((newTime.getMinutes() + 1) % 60);
      if (newTime.getMinutes() === 0) {
        newTime.setHours((newTime.getHours() + 1) % 24);
      }
    }
    this.editedTime = newTime;
  }

  toggleLight(): void {
    this.isLightOn = !this.isLightOn;
  }

  toggleHourFormat(): void {
    this.is12HourFormat = !this.is12HourFormat;
  }

  resetTime(): void {
    this.currentTime = new Date();
    this.editedTime = null;
    this.saveTime();
  }

  setEditedTime(newTime: Date): void {
    this.editedTime = newTime;
    this.saveTime();
  }
}
