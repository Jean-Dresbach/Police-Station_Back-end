import { prisma } from "../database/prisma.connection"
import { CreateCriminalDTO, UpdateCriminalDTO } from "../dtos/criminal.dto"

import { ResponseDTO } from "../dtos/response.dto"

export class CriminalService {
  public async findAll(): Promise<ResponseDTO> {
    const criminals = await prisma.criminal.findMany({
      select: {
        id: true,
        name: true,
        surname: true,
        CPF: true
      }
    })

    return {
      code: 200,
      message: "Criminosos listados com sucesso.",
      data: criminals
    }
  }

  public async create(criminalDTO: CreateCriminalDTO): Promise<ResponseDTO> {
    const criminal = await prisma.criminal.findUnique({
      where: {
        CPF: criminalDTO.CPF
      }
    })

    if (criminal) {
      return {
        code: 400,
        message: "CPF já cadastrado."
      }
    }

    const createdCriminal = await prisma.criminal.create({
      data: {
        name: criminalDTO.name,
        surname: criminalDTO.surname,
        CPF: criminalDTO.CPF
      },
      select: {
        id: true,
        name: true,
        surname: true,
        CPF: true
      }
    })

    return {
      code: 201,
      message: "Criminosos adicionado com sucesso.",
      data: createdCriminal
    }
  }

  public async findById(id: string): Promise<ResponseDTO> {
    const criminal = await prisma.criminal.findUnique({
      where: { id },
      select: {
        id: true,
        name: true,
        surname: true,
        CPF: true
      }
    })

    if (!criminal) {
      return {
        code: 404,
        message: "Criminoso não encontrado."
      }
    }

    return {
      code: 200,
      message: "Criminoso listado com sucesso.",
      data: criminal
    }
  }

  public async update(criminalDTO: UpdateCriminalDTO): Promise<ResponseDTO> {
    const criminal = await prisma.criminal.findUnique({
      where: {
        id: criminalDTO.id
      }
    })

    if (!criminal) {
      return {
        code: 404,
        message: "Criminoso não encontrado."
      }
    }

    const updatedCriminal = await prisma.criminal.update({
      where: {
        id: criminalDTO.id
      },
      data: {
        name: criminalDTO.name,
        surname: criminalDTO.surname,
        CPF: criminalDTO.CPF
      },
      select: {
        id: true,
        name: true,
        surname: true,
        CPF: true
      }
    })

    return {
      code: 200,
      message: "Criminoso atualizado com sucesso.",
      data: updatedCriminal
    }
  }

  // delete - > delete single resource
  public async delete(id: string): Promise<ResponseDTO> {
    const criminal = await prisma.criminal.findUnique({
      where: { id }
    })

    if (!criminal) {
      return {
        code: 404,
        message: "Criminoso não encontrado."
      }
    }

    const deletedCriminal = await prisma.criminal.delete({
      where: { id },
      select: {
        id: true,
        name: true,
        surname: true,
        CPF: true
      }
    })

    return {
      code: 200,
      message: "Criminoso removido com sucesso.",
      data: deletedCriminal
    }
  }

  public async findCrimeOfACriminal(id: string): Promise<ResponseDTO> {
    const criminal = await prisma.criminal.findUnique({
      where: { id }
    })

    if (!criminal) {
      return {
        code: 404,
        message: "Criminoso não encontrado."
      }
    }

    const crimes = await prisma.crime.findMany({
      where: { criminalId: id },
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
      message: `Crimes de ${
        criminal.name + " " + criminal.surname
      } listados com sucesso.`,
      data: crimes
    }
  }
}
