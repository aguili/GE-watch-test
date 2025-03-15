export class WatchView {
  private display: HTMLElement;
  private modeBtn: HTMLButtonElement;
  private increaseBtn: HTMLButtonElement;
  private lightBtn: HTMLButtonElement;
  private formatBtn: HTMLButtonElement; // Nouveau bouton
  private resetBtn: HTMLButtonElement; // Nouveau bouton
  private deleteBtn: HTMLButtonElement;

  private root: HTMLElement;
  private container: HTMLElement; // Nouvelle propriété pour stocker le conteneur

  constructor() {
    this.root = document.getElementById("watch-root")!;
    this.createUI();
  }

  private createUI(): void {
    this.container = document.createElement("div"); // Créer le conteneur
    this.container.className = "watch-container";

    this.display = document.createElement("div");
    this.display.className = "display";

    this.modeBtn = document.createElement("button");
    this.modeBtn.className = "btn mode-btn";
    this.modeBtn.textContent = "MODE";

    this.increaseBtn = document.createElement("button");
    this.increaseBtn.className = "btn increase-btn";
    this.increaseBtn.textContent = "ADJ";

    this.lightBtn = document.createElement("button");
    this.lightBtn.className = "btn light-btn";
    this.lightBtn.textContent = "LIGHT";

    // Nouveau bouton pour basculer entre 12h et 24h
    this.formatBtn = document.createElement("button");
    this.formatBtn.className = "btn format-btn";
    this.formatBtn.textContent = "12/24";

    // Nouveau bouton Reset
    this.resetBtn = document.createElement("button");
    this.resetBtn.className = "btn reset-btn";
    this.resetBtn.textContent = "RESET";

    // Nouveau bouton Delete
    this.deleteBtn = document.createElement("button");
    this.deleteBtn.className = "btn delete-btn";
    this.deleteBtn.textContent = "Supprimer";

    this.container.append(
      this.display,
      this.modeBtn,
      this.increaseBtn,
      this.lightBtn,
      this.formatBtn, // Ajouter le bouton à l'interface
      this.resetBtn, // Ajouter le bouton Reset à l'interface
      this.deleteBtn // Ajouter le bouton Delete à l'interface
    );
    document.body.appendChild(this.container); // Ajouter le conteneur au DOM
  }

  // Nouvelle méthode pour retourner le conteneur
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
      const period = hours >= 12 ? "PM" : "AM"; // Déterminer AM ou PM
      hours = hours % 12 || 12; // Convertir 0 en 12 pour le format 12h
      this.display.innerHTML = `
            <span class="${
              editMode === "hours" ? "blink" : ""
            }">${this.formatNumber(hours)}</span>:
            <span class="${
              editMode === "minutes" ? "blink" : ""
            }">${minutes}</span>:
            <span>${seconds}</span>
            <span class="period">${period}</span> <!-- Afficher AM ou PM dynamiquement -->
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

  // Lier le nouveau bouton
  bindFormatButton(handler: () => void): void {
    this.formatBtn.addEventListener("click", handler);
  }

  // Événements
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
