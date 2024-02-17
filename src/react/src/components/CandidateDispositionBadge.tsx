import { Alert } from "react-bootstrap"
import { DispositionType } from "../models/Disposition"

export interface ICandidateDispositionBadgeProps {
    disposition: DispositionType
}

function CandidateDispositionBadge({ disposition }: ICandidateDispositionBadgeProps) {
    const variation = (): string => {
        switch (disposition) {
            case DispositionType.undecided: return 'light';
            case DispositionType.rejected: return 'danger';
            case DispositionType.hired: return 'success';
        }
    }

    return (
        <Alert variant={variation()} className="p-2 m-0 d-inline border-0">{disposition}</Alert>
    )
}

export default CandidateDispositionBadge
