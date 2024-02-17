import { Candidate, CandidateApi, createCandidateFromApi } from "../models/Candidate";

export interface CandidatesListApiResponse {
    candidates?: CandidateApi[]
}

export class CandidatesRepository {
    async fetchCandidates(): Promise<Candidate[]> {
        const response = await fetch('http://localhost:3006/api/v1/candidates')
        const jsonData: CandidatesListApiResponse = await response.json()
        const candidates: Candidate[] = []
        if (jsonData.candidates) {
            jsonData.candidates.forEach((item) => {
                candidates.push(createCandidateFromApi(item))
            })
        }
        return candidates
    }
}
