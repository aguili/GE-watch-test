export class Matrix3x3 {
  public values: number[][];

  constructor(values: number[][]) {
    this.values = values;
  }

  // Multiplier deux matrices
  multiply(other: Matrix3x3): Matrix3x3 {
    const result: number[][] = [
      [0, 0, 0],
      [0, 0, 0],
      [0, 0, 0],
    ];
    for (let i = 0; i < 3; i++) {
      for (let j = 0; j < 3; j++) {
        for (let k = 0; k < 3; k++) {
          result[i][j] += this.values[i][k] * other.values[k][j];
        }
      }
    }
    return new Matrix3x3(result);
  }

  // Appliquer une transformation à un point (x, y)
  transformPoint(x: number, y: number): { x: number; y: number } {
    const resultX =
      this.values[0][0] * x + this.values[0][1] * y + this.values[0][2];
    const resultY =
      this.values[1][0] * x + this.values[1][1] * y + this.values[1][2];
    return { x: resultX, y: resultY };
  }

  // Créer une matrice de rotation
  static rotationMatrix(angle: number): Matrix3x3 {
    const rad = (angle * Math.PI) / 180;
    const cos = Math.cos(rad);
    const sin = Math.sin(rad);
    return new Matrix3x3([
      [cos, -sin, 0],
      [sin, cos, 0],
      [0, 0, 1],
    ]);
  }

  // Créer une matrice de translation
  static translationMatrix(dx: number, dy: number): Matrix3x3 {
    return new Matrix3x3([
      [1, 0, dx],
      [0, 1, dy],
      [0, 0, 1],
    ]);
  }

  // Créer une matrice de mise à l'échelle
  static scalingMatrix(sx: number, sy: number): Matrix3x3 {
    return new Matrix3x3([
      [sx, 0, 0],
      [0, sy, 0],
      [0, 0, 1],
    ]);
  }
  public getValues(): number[][] {
    return this.values;
  }
}
