import { prisma } from "../database/prisma.connection"
import { CreateCrimeDTO } from "../dtos/crime.dto"
import { ResponseDTO } from "../dtos/response.dto"
import { CreateWeaponDTO, UpdateWeaponDTO } from "../dtos/weapon.dto"

//show
export class WeaponService {
  public async findAll(): Promise<ResponseDTO> {
    const weapon = await prisma.weapon.findMany({
      select: {
        id: true,
        type: true,
        description: true,
        origin: true,
        condition: true,
        crimeId: true
      }
    })

    return {
      code: 200,
      message: "Armas listadas com sucesso.",
      data: weapon
    }
  }

  //create
  public async create(weaponDTO: CreateWeaponDTO): Promise<ResponseDTO> {
    const createWeapon = await prisma.weapon.create({
      data: {
        type: weaponDTO.type,
        description: weaponDTO.description,
        origin: weaponDTO.origin,
        condition: weaponDTO.condition,
        crimeId: weaponDTO.crimeId
      },
      select: {
        id: true,
        type: true,
        description: true,
        origin: true,
        condition: true,
        crimeId: true
      }
    })

    return {
      code: 201,
      message: "Arma registrada com sucesso.",
      data: createWeapon
    }
  }

  //findById
  public async findById(id: string): Promise<ResponseDTO> {
    const weapon = await prisma.weapon.findUnique({
      where: { id },
      select: {
        id: true,
        type: true,
        description: true,
        origin: true,
        condition: true,
        crimeId: true
      }
    })

    if (!weapon) {
      return {
        code: 404,
        message: "Arma não encontrada."
      }
    }

    return {
      code: 200,
      message: " Arma encontrada com sucesso.",
      data: weapon
    }
  }

  //update
  public async update(weaponDTO: UpdateWeaponDTO): Promise<ResponseDTO> {
    const weapon = await prisma.weapon.findUnique({
      where: {
        id: weaponDTO.id
      }
    })

    if (!weapon) {
      return {
        code: 404,
        message: "Arma não encontrada."
      }
    }

    const updatedWeapon = await prisma.weapon.update({
      where: {
        id: weaponDTO.id
      },
      data: {
        type: weaponDTO.type,
        description: weaponDTO.description,
        origin: weaponDTO.origin,
        condition: weaponDTO.condition,
        crimeId: weaponDTO.crimeId
      },
      select: {
        id: true,
        type: true,
        description: true,
        origin: true,
        condition: true,
        crimeId: true
      }
    })

    return {
      code: 200,
      message: "Arma atualizada com sucesso.",
      data: weapon
    }
  }

  public async delete(id: string): Promise<ResponseDTO> {
    const weapon = await prisma.weapon.findUnique({
      where: { id }
    })

    if (!weapon) {
      return {
        code: 404,
        message: "Arma não encontrada."
      }
    }

    const deletedWeapon = await prisma.weapon.delete({
      where: { id },
      select: {
        id: true,
        type: true,
        description: true,
        origin: true,
        condition: true,
        crimeId: true
      }
    })

    return {
      code: 200,
      message: "Arma deletada com sucesso.",
      data: deletedWeapon
    }
  }
}
