import { prisma } from "../database/prisma.connection"
import { CreateCrimeDTO, UpdateCrimeDTO } from "../dtos/crime.dto"

import { ResponseDTO } from "../dtos/response.dto"

export class CrimeService {
  public async findAll(): Promise<ResponseDTO> {
    const crimes = await prisma.crime.findMany({
      select: {
        id: true,
        type: true,
        description: true,
        location: true,
        date: true,
        criminalId: true
      }
    })

    return {
      code: 200,
      message: "Crimes listados com sucesso.",
      data: crimes
    }
  }

  public async create(crimeDTO: CreateCrimeDTO): Promise<ResponseDTO> {
    const createdCrime = await prisma.crime.create({
      data: {
        type: crimeDTO.type,
        description: crimeDTO.description,
        location: crimeDTO.location,
        date: crimeDTO.date,
        criminalId: crimeDTO.criminalId
      },
      select: {
        id: true,
        type: true,
        description: true,
        location: true,
        date: true,
        criminalId: true
      }
    })

    return {
      code: 201,
      message: "Crime criado com sucesso.",
      data: createdCrime
    }
  }

  public async findById(id: string): Promise<ResponseDTO> {
    const crime = await prisma.crime.findUnique({
      where: { id },
      select: {
        id: true,
        type: true,
        description: true,
        location: true,
        date: true,
        criminalId: true
      }
    })

    if (!crime) {
      return {
        code: 404,
        message: "Crime não encontrado."
      }
    }

    return {
      code: 200,
      message: "Crime encontrado com sucesso.",
      data: crime
    }
  }

  public async update(crimeDTO: UpdateCrimeDTO): Promise<ResponseDTO> {
    const crime = await prisma.crime.findUnique({
      where: {
        id: crimeDTO.id
      }
    })

    if (!crime) {
      return {
        code: 404,
        message: "Crime não encontrado."
      }
    }

    const updatedCrime = await prisma.crime.update({
      where: {
        id: crimeDTO.id
      },
      data: {
        type: crimeDTO.type,
        description: crimeDTO.description,
        location: crimeDTO.location,
        date: crimeDTO.date,
        criminalId: crimeDTO.criminalId
      },
      select: {
        id: true,
        type: true,
        description: true,
        location: true,
        date: true,
        criminalId: true
      }
    })

    return {
      code: 200,
      message: "Crime atualizado com sucesso.",
      data: updatedCrime
    }
  }

  public async delete(id: string): Promise<ResponseDTO> {
    const crime = await prisma.crime.findUnique({
      where: { id }
    })

    if (!crime) {
      return {
        code: 404,
        message: "Crime não encontrado."
      }
    }

    const deletedCrime = await prisma.crime.delete({
      where: { id },
      select: {
        id: true,
        type: true,
        description: true,
        location: true,
        date: true,
        criminalId: true
      }
    })

    return {
      code: 200,
      message: "Crime deletado com sucesso.",
      data: deletedCrime
    }
  }

  public async findWeaponOfACrime(id: string) {
    const crime = await prisma.crime.findUnique({
      where: { id }
    })

    if (!crime) {
      return {
        code: 404,
        message: "Crime não encontrado."
      }
    }

    const weapons = await prisma.weapon.findMany({
      where: { crimeId: crime.id },
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
      data: weapons
    }
  }
}
