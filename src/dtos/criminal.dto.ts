export interface CreateCriminalDTO {
  name: string
  surname: string
  CPF: string
}

export interface UpdateCriminalDTO {
  id: string
  name?: string
  surname?: string
  CPF?: string
}
