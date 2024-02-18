import { Dropdown } from "react-bootstrap"
//
import { Candidate } from "../models/Candidate"
import actionsIcon from '../assets/actions.svg'

export interface ICandidateItemDropDownProps {
    candidate: Candidate
}

function CandidateItemDropDown({ candidate }: ICandidateItemDropDownProps) {
    return (
        <Dropdown>
            <Dropdown.Toggle variant="white">
                <img src={actionsIcon} />
            </Dropdown.Toggle>
            <Dropdown.Menu>
                <Dropdown.Item href={`candidates/edit/${candidate.id}`}>Edit</Dropdown.Item>
                <Dropdown.Item href={`candidates/disposition/${candidate.id}`}>Set disposition</Dropdown.Item>
            </Dropdown.Menu>
        </Dropdown>
    )
}

export default CandidateItemDropDown
