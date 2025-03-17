export class WatchView {
  private display: HTMLElement;
  private modeBtn: HTMLButtonElement;
  private increaseBtn: HTMLButtonElement;
  private lightBtn: HTMLButtonElement;
  private formatBtn: HTMLButtonElement;
  private resetBtn: HTMLButtonElement;
  private deleteBtn: HTMLButtonElement;

  private container: HTMLElement;

  constructor() {
    document.getElementById("watch-root")!;
    this.createUI();
  }

  private createUI(): void {
    this.container = document.createElement("div");
    this.container.className = "watch-container";

    this.display = document.createElement("div");
    this.display.className = "display";

    this.modeBtn = document.createElement("button");
    this.modeBtn.className = "btn mode-btn";
    this.modeBtn.textContent = "MOD";

    this.increaseBtn = document.createElement("button");
    this.increaseBtn.className = "btn increase-btn";
    this.increaseBtn.textContent = "ADJ";

    this.lightBtn = document.createElement("button");
    this.lightBtn.className = "btn light-btn";
    this.lightBtn.textContent = "LT";

    this.formatBtn = document.createElement("button");
    this.formatBtn.className = "btn format-btn";
    this.formatBtn.textContent = "AP";

    this.resetBtn = document.createElement("button");
    this.resetBtn.className = "btn reset-btn";
    this.resetBtn.textContent = "RST";

    this.deleteBtn = document.createElement("button");
    this.deleteBtn.className = "btn delete-btn";
    this.deleteBtn.textContent = "";

    this.container.append(
      this.display,
      this.modeBtn,
      this.increaseBtn,
      this.lightBtn,
      this.formatBtn,
      this.resetBtn,
      this.deleteBtn
    );
    document.body.appendChild(this.container);
  }

  getContainer(): HTMLElement {
    return this.container;
  }

  updateDisplay(
    time: Date,
    editMode: string,
    isLightOn: boolean,
    is12HourFormat: boolean
  ): void {
    let hours = time.getHours();
    const minutes = this.formatNumber(time.getMinutes());
    const seconds = this.formatNumber(time.getSeconds());

    // Convertir en format 12h si nécessaire
    if (is12HourFormat) {
      const period = hours >= 12 ? "PM" : "AM";
      hours = hours % 12 || 12;
      this.display.innerHTML = `
        <span class="${
          editMode === "hours" ? "blink" : ""
        }">${this.formatNumber(hours)}</span>:
        <span class="${
          editMode === "minutes" ? "blink" : ""
        }">${minutes}</span>:
        <span>${seconds}</span>
        <span class="period">${period}</span>
      `;
    } else {
      this.display.innerHTML = `
        <span class="${
          editMode === "hours" ? "blink" : ""
        }">${this.formatNumber(hours)}</span>:
        <span class="${
          editMode === "minutes" ? "blink" : ""
        }">${minutes}</span>:
        <span>${seconds}</span>
      `;
    }

    this.display.style.backgroundColor = isLightOn ? "#FBE106" : "#FFFFFF";
  }

  private formatNumber(num: number): string {
    return num.toString().padStart(2, "0");
  }

  //évenements :
  bindFormatButton(handler: () => void): void {
    this.formatBtn.addEventListener("click", handler);
  }

  bindModeButton(handler: () => void): void {
    this.modeBtn.addEventListener("click", handler);
  }

  bindIncreaseButton(handler: () => void): void {
    this.increaseBtn.addEventListener("click", handler);
  }

  bindLightButton(handler: () => void): void {
    this.lightBtn.addEventListener("click", handler);
  }

  bindResetButton(handler: () => void): void {
    this.resetBtn.addEventListener("click", handler);
  }

  bindDeleteButton(handler: () => void): void {
    this.deleteBtn.addEventListener("click", handler);
  }
}
