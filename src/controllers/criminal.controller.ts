import { Request, Response } from "express"

import { CriminalService } from "../services/criminal.services"
import { CreateCriminalDTO } from "../dtos/criminal.dto"

const criminalService = new CriminalService()

export class CriminalController {
  // index -> list all
  public async index(request: Request, response: Response) {
    try {
      const result = await criminalService.findAll()

      return response.status(result.code).json(result)
    } catch (error) {
      return response.status(500).json({
        code: response.statusCode,
        message: "Erro ao listar alunos."
      })
    }
  }

  // store - > create a new resource
  public async store(request: Request, response: Response) {
    try {
      const { name, surname, CPF } = request.body

      if (!name || !surname || !CPF) {
        return response.status(400).json({
          code: response.statusCode,
          message: "Preencha todos os campos obrigatórios."
        })
      }

      if (isNaN(Number(CPF)) || CPF.length !== 11) {
        return response.status(400).json({
          code: response.statusCode,
          message: "CPF inválido."
        })
      }

      const criminal: CreateCriminalDTO = { name, surname, CPF }

      const result = await criminalService.create(criminal)

      return response.status(result.code).json(result)
    } catch (error) {
      return response.status(500).json({
        code: response.statusCode,
        message: "Erro ao listar alunos."
      })
    }
  }
}
