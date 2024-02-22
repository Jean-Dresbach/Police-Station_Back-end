import { prisma } from "../database/prisma.connection"
import { CreateCriminalDTO } from "../dtos/criminal.dto"

import { ResponseDTO } from "../dtos/response.dto"
import { Criminal } from "../models/criminal.model"

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
      data: { criminals }
    }
  }

  public async create(criminalDTO: CreateCriminalDTO): Promise<ResponseDTO> {
    const newCriminal = new Criminal(
      criminalDTO.name,
      criminalDTO.surname,
      criminalDTO.CPF
    )

    const criminal = await prisma.criminal.findUnique({
      where: {
        CPF: newCriminal.CPF
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
        name: newCriminal.name,
        surname: newCriminal.surname,
        CPF: newCriminal.CPF
      }
    })

    return {
      code: 201,
      message: "Criminosos adicionado com sucesso.",
      data: {
        id: createdCriminal.id,
        name: createdCriminal.name,
        surname: createdCriminal.surname,
        CPF: createdCriminal.CPF
      }
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
}
