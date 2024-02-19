import userAvatar1 from '../assets/users-1.png'
import userAvatar2 from '../assets/users-2.png'
import userAvatar3 from '../assets/users-3.png'
import userAvatar4 from '../assets/users-4.png'
import { Candidate } from "../models/Candidate"
import CandidateDispositionBadge from "./CandidateDispositionBadge"
import { ContentFormatter } from "../helpers/ContentFormatter"
import CandidateItemDropDown from './CandidateItemDropDown'
import { hiredTypes } from '../models/Disposition'

export interface ICandidatesTableItemProps {
  candidate: Candidate
}

function CandidatesTableItem({ candidate }: ICandidatesTableItemProps) {
  const candidateImage = () => {
    const images = [userAvatar1, userAvatar2, userAvatar3, userAvatar4]
    return images[(Math.floor(Math.random() * images.length))]
  }

  return (
    <tr>
      <td className="d-flex gap-2">
        <img src={candidateImage()} width="40" height="40" />
        <div className="d-flex flex-column">
          <strong>{candidate.name}</strong>
          <span>{candidate.email}</span>
        </div>
      </td>
      <td>{candidate.phone ?? '-'}</td>
      <td>
        {candidate.disposition && <CandidateDispositionBadge disposition={candidate.disposition.disposition} />}
        {!candidate.disposition && '-'}
      </td>
      <td>
        {candidate?.disposition?.hireTytpe ? hiredTypes[candidate?.disposition?.hireTytpe] : '-'}
      </td>
      <td>
        {
          candidate?.disposition?.fee && candidate?.disposition?.currency
            ? ContentFormatter.formatMoney(candidate?.disposition?.fee, candidate?.disposition?.currency)
            : '-'
        }
      </td>
      <td>
        {ContentFormatter.formatDate(candidate.createdAt)}
      </td>
      <td>
        {candidate.disposition && ContentFormatter.formatDate(candidate.disposition.createdAt)}
        {!candidate.disposition && '-'}
      </td>
      <td>
        <CandidateItemDropDown candidate={candidate} />
      </td>
    </tr>
  )
}

export default CandidatesTableItem
