export interface CreateWeaponDTO {
  type: string
  description: string
  origin: string
  condition: string
  crimeId: string
}

export interface UpdateWeaponDTO {
  id: string
  type?: string
  description?: string
  origin?: string
  condition?: string
  crimeId?: string
}
