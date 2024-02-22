import { prisma } from "../database/prisma.connection"

import { ResponseDTO } from "../dtos/response.dto"

export class CriminalService {
  public async findAll(): Promise<ResponseDTO> {
    const criminals = await prisma.criminal.findMany()

    return {
      code: 200,
      message: "Criminosos listados com sucesso.",
      data: { criminals }
    }
  }
}
