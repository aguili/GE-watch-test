import { Matrix3x3 } from "../utils/Matrix3x3";
export class AnalogWatchView {
  private container: HTMLElement;
  private hourHand: HTMLElement;
  private minuteHand: HTMLElement;
  private secondHand: HTMLElement;

  constructor() {
    this.container = document.createElement("div");
    this.container.className = "analog-clock";

    this.hourHand = document.createElement("div");
    this.hourHand.className = "hand hour-hand";
    this.minuteHand = document.createElement("div");
    this.minuteHand.className = "hand minute-hand";
    this.secondHand = document.createElement("div");
    this.secondHand.className = "hand second-hand";

    this.container.append(this.hourHand, this.minuteHand, this.secondHand);
  }

  public updateDisplay(time: Date): void {
    const hours = time.getHours() % 12;
    const minutes = time.getMinutes();
    const seconds = time.getSeconds();

    // Calculer les angles des aiguilles
    const hourAngle = hours * 30 + minutes * 0.5; // 30 degrés par heure, 0.5 degré par minute
    const minuteAngle = minutes * 6 + seconds * 0.1; // 6 degrés par minute, 0.1 degré par seconde
    const secondAngle = seconds * 6; // 6 degrés par seconde

    // Appliquer les transformations matricielles
    const hourMatrix = Matrix3x3.rotationMatrix(hourAngle);
    const minuteMatrix = Matrix3x3.rotationMatrix(minuteAngle);
    const secondMatrix = Matrix3x3.rotationMatrix(secondAngle);

    // Appliquer les transformations aux aiguilles
    this.applyTransform(this.hourHand, hourMatrix);
    this.applyTransform(this.minuteHand, minuteMatrix);
    this.applyTransform(this.secondHand, secondMatrix);
  }

  // Appliquer une transformation matricielle à un élément
  private applyTransform(element: HTMLElement, matrix: Matrix3x3): void {
    const transform = `matrix(${matrix.values[0][0]}, ${matrix.values[1][0]}, ${matrix.values[0][1]}, ${matrix.values[1][1]}, ${matrix.values[0][2]}, ${matrix.values[1][2]})`;
    element.style.transform = transform;
  }
  public getContainer(): HTMLElement {
    return this.container;
  }
}
