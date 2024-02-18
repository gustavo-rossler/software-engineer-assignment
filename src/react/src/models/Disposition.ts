export enum DispositionType {
    undecided = 'Undecided',
    rejected = 'Rejected',
    hired = 'Hired',
}

export enum HiredType {
    internal = 'Internal',
    external = 'External',
}

export enum RejectedReason {
    didnt_meet_education = 'Did not have desired education',
    didnt_meet_qualifications = 'Did not meet overall qualifications',
    misspresented_qualifications = 'Misrepresented qualifications',
    more_qulified = 'More qualified job candidate selectedt',
    didnt_fit_culture = 'Did not fit company culture',
    incomplete_application = 'Incomplete job application',
    didnt_show = 'No show for interview',
    didnt_have_experience = 'Did not have desired experience',
    other = 'Other',
}

export enum Currency {
    usd = '$',
    eur = '€',
}

export interface DispositionApi {
    candidate_id: number
    created_at: string
    currency?: Currency
    disposition: string
    hire_type?: HiredType
    id: number
    rejection_reason?: RejectedReason
    updated_at: string
    fee: number
}

export interface Disposition {
    id: number
    disposition: DispositionType
    hireTytpe?: HiredType
    fee?: number
    currency?: Currency
    rejectionReason?: RejectedReason
    createdAt: Date
}

export function createDispositionFromApi(data: DispositionApi): Disposition {
    return {
        createdAt: new Date(data.updated_at),
        disposition: data.disposition as DispositionType,
        id: data.id,
        currency: data.currency,
        fee: data.fee,
        hireTytpe: data.hire_type as HiredType,
        rejectionReason: data.rejection_reason as RejectedReason,
    }
}
