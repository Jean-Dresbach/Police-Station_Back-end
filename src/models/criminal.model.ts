export class Criminal {
  constructor(
    private _name: string,
    private _surname: string,
    private _CPF: string
  ) {}

  get name() {
    return this._name
  }

  get surname() {
    return this._surname
  }

  get CPF() {
    const part1 = this._CPF.slice(0, 3)
    const part2 = this._CPF.slice(3, 6)
    const part3 = this._CPF.slice(6, 9)
    const part4 = this._CPF.slice(9)

    return `${part1}.${part2}.${part3}-${part4}`
  }
}
