import { Disposition, DispositionApi, createDispositionFromApi } from "./Disposition"

export interface Candidate {
    id: number
    name: string
    email: string
    phone?: string
    createdAt: Date
    disposition?: Disposition
}

export interface CandidateApi {
    created_at: string
    email: string
    phone?: string
    id: number
    name: string
    updated_at: string
    disposition?: DispositionApi
}

export function createCandidateFromApi(data: CandidateApi): Candidate {
    return {
        createdAt: new Date(data.created_at),
        email: data.email,
        name: data.name,
        phone: data.phone,
        id: data.id,
        disposition: data.disposition ? createDispositionFromApi(data.disposition) : undefined,
    }
}
