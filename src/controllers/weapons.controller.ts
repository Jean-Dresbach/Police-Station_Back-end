import { Request, Response } from "express"

import { WeaponService } from "../services/weapon.service"
import { CreateWeaponDTO } from "../dtos/weapon.dto"

const weaponService = new WeaponService()

export class WeaponController {
  public async index(_: Request, response: Response) {
    try {
      const result = await weaponService.findAll()

      return response.status(result.code).json(result)
    } catch (error) {
      return response.status(500).json({
        code: response.statusCode,
        message: "Erro ao listar armas."
      })
    }
  }

  public async store(request: Request, response: Response) {
    try {
      const { type, description, origin, condition, crimeId } = request.body

      if (!type || !description || !origin || !condition || !crimeId) {
        return response.status(400).json({
          code: response.statusCode,
          message: "Preencha todos os campos obrigatórios."
        })
      }

      const weapon: CreateWeaponDTO = {
        type,
        description,
        origin,
        condition,
        crimeId
      }

      const result = await weaponService.create(weapon)

      return response.status(result.code).json(result)
    } catch (error) {
      return response.status(500).json({
        code: response.statusCode,
        message: "Erro ao criar arma."
      })
    }
  }

  public async show(request: Request, response: Response) {
    try {
      const { id } = request.params

      const result = await weaponService.findById(id)

      return response.status(result.code).json(result)
    } catch (error) {
      return response.status(500).json({
        code: response.statusCode,
        message: "Erro ao listar arma."
      })
    }
  }

  public async update(request: Request, response: Response) {
    try {
      const { id } = request.params
      const { type, description, origin, condition } = request.body

      const result = await weaponService.update({
        id,
        type,
        description,
        origin,
        condition
      })

      return response.status(result.code).json(result)
    } catch (error) {
      return response.status(500).json({
        code: response.statusCode,
        message: "Erro ao atulizar arma."
      })
    }
  }

  public async delete(request: Request, response: Response) {
    try {
      const { id } = request.params

      const result = await weaponService.delete(id)

      return response.status(result.code).json(result)
    } catch (error) {
      return response.status(500).json({
        code: response.statusCode,
        message: "Erro ao excluir arma."
      })
    }
  }
}
