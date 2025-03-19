import { AnalogWatchModel } from "../Models/AnalogWatchModel";
import { AnalogWatchView } from "../Views/AnalogWatchView";

export class AnalogWatchController {
  constructor(
    private model: AnalogWatchModel,
    private view: AnalogWatchView,
    private onDelete: (model: AnalogWatchModel, view: AnalogWatchView) => void
  ) {
    const deleteButton = document.createElement("button");
    deleteButton.textContent = "";
    deleteButton.className = "btn delete-btn";

    deleteButton.addEventListener("click", () =>
      this.onDelete(this.model, this.view)
    );
    this.view.getContainer().appendChild(deleteButton);
  }

  public update(time: Date): void {
    const syncedTime = this.model.syncTime(time);
    this.view.updateDisplay(syncedTime);
  }
}
