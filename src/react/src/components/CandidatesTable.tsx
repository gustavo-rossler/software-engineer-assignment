import { Table } from "react-bootstrap"
import CandidatesTableItem from "./CandidatesTableItem"
import { Candidate } from "../models/Candidate"

export interface ICandidatesTableProps {
  candidates: Candidate[]
}

function CandidatesTable({ candidates }: ICandidatesTableProps) {
  return (
    <div>
      <div className="border rounded">
        <Table className="m-0 p-0">
          <thead>
            <tr>
              <th>Candidate</th>
              <th>Phone</th>
              <th>Disposition</th>
              <th>Hire type</th>
              <th>Fee</th>
              <th>Candidate created</th>
              <th>Disposition created</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {candidates.map((candidate) => <CandidatesTableItem candidate={candidate} key={candidate.id} />)}
          </tbody>
        </Table>
      </div>
    </div>
  )
}

export default CandidatesTable
