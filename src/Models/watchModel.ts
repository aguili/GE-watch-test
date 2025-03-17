export class WatchModel {
  private currentTime: Date;
  private editedTime: Date | null = null;
  private editMode: "hours" | "minutes" | "none" = "none";
  private isLightOn: boolean = false;
  private is12HourFormat: boolean = false;
  private updateInterval: number;

  constructor(timezoneOffset: number = 0) {
    this.currentTime = this.applyTimezoneOffset(new Date(), timezoneOffset);
    console.log("1this.currentTime", this.currentTime);
    this.startClock();
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
        const newTime = new Date(this.currentTime.getTime());
        newTime.setSeconds(newTime.getSeconds() + 1);
        this.currentTime = newTime;
      }
    }, 1000) as unknown as number;
  }
  private applyTimezoneOffset(date: Date, timezoneOffset: number): Date {
    const offsetInMilliseconds = timezoneOffset * 60 * 60 * 1000;
    return new Date(date.getTime() + offsetInMilliseconds);
  }

  getCurrentTime(timezoneOffset: number = 0): Date {
    return this.applyTimezoneOffset(new Date(), timezoneOffset);
  }
  syncTime(baseTime: Date): void {
    this.currentTime = new Date(baseTime.getTime());
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
  }

  setEditedTime(newTime: Date): void {
    this.editedTime = newTime;
  }
}
