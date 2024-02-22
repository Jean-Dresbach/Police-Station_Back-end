import { prisma } from "../database/prisma.connection"
import { CreateCriminalDTO } from "../dtos/criminal.dto"

import { ResponseDTO } from "../dtos/response.dto"
import { Criminal } from "../models/criminal.model"

export class CriminalService {
  public async findAll(): Promise<ResponseDTO> {
    const criminals = await prisma.criminal.findMany()

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
      data: createdCriminal
    }
  }
}
