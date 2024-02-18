import { DispositionApi } from "../models/Disposition";
import { BasicRepository } from "./BasicRepository";

export interface DispositionApiResponse {
  disposition?: DispositionApi
  error?: any
  message?: string
}

export class DispositionsRepository extends BasicRepository {
  async fetchDisposition(id: number): Promise<DispositionApiResponse> {
    const response = await fetch(`${this.baseUrl}/dispositions/${id}`, {
      headers: this.baseHeaders,
    })
    const jsonData: DispositionApiResponse = await response.json()
    return jsonData
  }
}
