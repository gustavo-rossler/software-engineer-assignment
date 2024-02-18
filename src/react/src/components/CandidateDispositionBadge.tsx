import { Alert } from "react-bootstrap"
import { DispositionType } from "../models/Disposition"

export interface ICandidateDispositionBadgeProps {
    disposition: string
}

function CandidateDispositionBadge({ disposition }: ICandidateDispositionBadgeProps) {
    const variation = (): string => {
        switch (disposition) {
            case 'undecided': return 'light'
            case 'rejected': return 'danger'
            case 'hired': return 'success'
            default: return ''
        }
    }

    return (
        <Alert variant={variation()} className="p-2 m-0 d-inline border-0">{DispositionType[disposition]}</Alert>
    )
}

export default CandidateDispositionBadge
