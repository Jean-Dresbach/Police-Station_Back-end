import { Request, Response } from "express"
import { CrimeService } from "../services/crimes.service"
import { CreateCrimeDTO } from "../dtos/crime.dto"

const crimeService = new CrimeService()

export class CrimesController {
  public async index(_: Request, response: Response) {
    try {
      const result = await crimeService.findAll()

      return response.status(result.code).json(result)
    } catch (error) {
      return response.status(500).json({
        code: response.statusCode,
        message: "Erro ao listar criminosos."
      })
    }
  }

  public async store(request: Request, response: Response) {
    try {
      const { type, description, location, date, criminalId } = request.body

      if (!type || !description || !location || !date || !criminalId) {
        return response.status(400).json({
          code: response.statusCode,
          message: "Preencha todos os campos obrigatórios."
        })
      }

      const crime: CreateCrimeDTO = {
        type,
        description,
        location,
        date: new Date(date),
        criminalId
      }

      const result = await crimeService.create(crime)

      return response.status(result.code).json(result)
    } catch (error) {
      console.log(error)

      return response.status(500).json({
        code: response.statusCode,
        message: "Erro ao criar um crime."
      })
    }
  }

  public async show(request: Request, response: Response) {
    try {
      const { id } = request.params

      const result = await crimeService.findById(id)

      return response.status(result.code).json(result)
    } catch (error) {
      return response.status(500).json({
        code: response.statusCode,
        message: "Erro ao listar crime."
      })
    }
  }

  public async update(request: Request, response: Response) {
    try {
      const { id } = request.params
      const { type, description, location, date, criminalId } = request.body

      const result = await crimeService.update({
        id,
        type,
        description,
        location,
        date: new Date(date),
        criminalId
      })

      return response.status(result.code).json(result)
    } catch (error) {
      return response.status(500).json({
        code: response.statusCode,
        message: "Erro ao atulizar crime."
      })
    }
  }

  public async delete(request: Request, response: Response) {
    try {
      const { id } = request.params

      const result = await crimeService.delete(id)

      return response.status(result.code).json(result)
    } catch (error) {
      return response.status(500).json({
        code: response.statusCode,
        message: "Erro ao excluir crime."
      })
    }
  }

  public async findWeaponOfACrime(request: Request, response: Response) {
    try {
      const { id } = request.params

      const result = await crimeService.findWeaponOfACrime(id)

      return response.status(result.code).json(result)
    } catch (error) {
      return response.status(500).json({
        code: response.statusCode,
        message: "Erro ao localizar crimes."
      })
    }
  }
}
