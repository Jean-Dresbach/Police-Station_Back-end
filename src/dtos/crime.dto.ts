export interface CreateCrimeDTO {
  type: string
  description: string
  location: string
  date: Date
  criminalId: string
}

export interface UpdateCrimeDTO {
  id: string
  type?: string
  description?: string
  location?: string
  date?: Date
  criminalId?: string
}
