import { WatchModel } from "./watchModel";

export class AnalogWatchModel extends WatchModel {
  private offset: number;

  constructor(offset: number) {
    super();
    this.offset = offset;
  }

  public syncTime(now: Date): Date {
    const offsetMs = this.offset * 60 * 60 * 1000;
    return new Date(now.getTime() + offsetMs);
  }
}
