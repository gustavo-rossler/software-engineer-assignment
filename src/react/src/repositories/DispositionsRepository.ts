import { DispositionFormData } from "../components/DispositionForm";
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

  async fetchDispositionByCandidateId(candidateId: number): Promise<DispositionApiResponse> {
    const response = await fetch(`${this.baseUrl}/candidates/${candidateId}/disposition`, {
      headers: this.baseHeaders,
    })
    const jsonData: DispositionApiResponse = await response.json()
    return jsonData
  }

  async saveDisposition(data: DispositionFormData): Promise<DispositionApiResponse> {
    const response = await fetch(`${this.baseUrl}/dispositions`, {
      method: 'PUT',
      body: JSON.stringify(data),
      headers: this.baseHeaders,
    })
    const jsonData = await response.json()
    return jsonData as DispositionApiResponse
  }
}
