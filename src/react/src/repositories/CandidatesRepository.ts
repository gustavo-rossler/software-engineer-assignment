import { CandidateFormData } from "../components/CandidateForm";
import { Candidate, CandidateApi, createCandidateFromApi } from "../models/Candidate";
import { BasicRepository } from "./BasicRepository";

export interface CandidatesListApiResponse {
  candidates?: CandidateApi[]
}

export interface CandidateSaveApiResponse {
  candidate?: CandidateApi
  error?: any
  message?: string
}

export class CandidatesRepository extends BasicRepository {
  async fetchCandidates(): Promise<Candidate[]> {
    const response = await fetch(`${this.baseUrl}/candidates`, {
      headers: this.baseHeaders,
    })
    const jsonData: CandidatesListApiResponse = await response.json()
    const candidates: Candidate[] = []
    if (jsonData.candidates) {
      jsonData.candidates.forEach((item) => {
        candidates.push(createCandidateFromApi(item))
      })
    }
    return candidates
  }

  async fetchCandidate(id: number): Promise<CandidateSaveApiResponse> {
    const response = await fetch(`${this.baseUrl}/candidates/${id}`, {
      headers: this.baseHeaders,
    })
    const jsonData: CandidateSaveApiResponse = await response.json()
    return jsonData as CandidateSaveApiResponse
  }

  async saveCandidate(data: CandidateFormData): Promise<CandidateSaveApiResponse> {
    const response = await fetch(`${this.baseUrl}/candidates`, {
      method: 'PUT',
      body: JSON.stringify(data),
      headers: this.baseHeaders,
    })
    const jsonData = await response.json()
    return jsonData as CandidateSaveApiResponse
  }
}
