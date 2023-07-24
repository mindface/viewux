
export class HelperColor {
  constructor() {}

  public getRandomInteger(min:number,max:number) {
    return Math.floor(Math.random() * (max - min -1)) + min
  }

  public getRGB() {
    return `rgb(${this.getRandomInteger(100,155)},${this.getRandomInteger(200,256)},${this.getRandomInteger(100,156)})`
  }
}

