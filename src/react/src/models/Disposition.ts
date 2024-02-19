export type dispositionOptionType = {
    [key: string]: string
}

export const dispositionTypes: dispositionOptionType = {
    undecided: 'Undecided',
    rejected: 'Rejected',
    hired: 'Hired',
}

export const hiredTypes: dispositionOptionType = {
    internal: 'Internal',
    external: 'External',
}

export const rejectedReasons: dispositionOptionType = {
    didnt_meet_education: 'Did not have desired education',
    didnt_meet_qualifications: 'Did not meet overall qualifications',
    misspresented_qualifications: 'Misrepresented qualifications',
    more_qulified: 'More qualified job candidate selectedt',
    didnt_fit_culture: 'Did not fit company culture',
    incomplete_application: 'Incomplete job application',
    didnt_show: 'No show for interview',
    didnt_have_experience: 'Did not have desired experience',
    other: 'Other',
}

export const currencies: dispositionOptionType = {
    usd: '$',
    eur: '€',
}

export interface DispositionApi {
    candidate_id: number
    created_at: string
    currency?: string
    disposition: string
    hire_type?: string
    id: number
    rejection_reason?: string
    updated_at: string
    fee: number
}

export interface Disposition {
    id: number
    disposition: string
    hireTytpe?: string
    fee?: number
    currency?: string
    rejectionReason?: string
    createdAt: Date
}

export function createDispositionFromApi(data: DispositionApi): Disposition {
    return {
        createdAt: new Date(data.updated_at),
        disposition: data.disposition,
        id: data.id,
        currency: data.currency,
        fee: data.fee,
        hireTytpe: data.hire_type,
        rejectionReason: data.rejection_reason,
    }
}
