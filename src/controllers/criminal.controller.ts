import { Request, Response } from "express"

import { CriminalService } from "../services/criminal.services"

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

  // stor - > create a new resource
  public async store(request: Request, response: Response) {
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
}
