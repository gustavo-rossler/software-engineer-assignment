import { useEffect, useState } from "react"
import Body from "../components/Body"
import CandidateForm, { CandidateFormData } from "../components/CandidateForm"
import Header from "../components/Header"
import { Alert, Spinner } from "react-bootstrap"
import { CandidatesRepository } from "../repositories/CandidatesRepository"
import { useParams } from "react-router-dom"
import { Candidate, createCandidateFromApi } from "../models/Candidate"

function UpdateCandidate() {
  const [loading, setLoading] = useState(false)
  const [updated, setUpdated] = useState(false)
  const [error, setError] = useState('')
  const [candidateError, setCandidateError] = useState('')
  const [candidate, setCandidate] = useState<Candidate>()

  const { id } = useParams()

  const repo = new CandidatesRepository()

  useEffect(() => {
    if (id) {
      fetchCandidate(parseInt(id))
    }
  }, [id])

  const fetchCandidate = async (candidateId: number) => {
    try {
      setCandidate(undefined)
      setLoading(true)
      setCandidateError('')
      const response = await repo.fetchCandidate(candidateId)
      if (response.candidate) {
        setCandidate(createCandidateFromApi(response.candidate))
      } else if (response.message) {
        setCandidateError(response.message)
      }
    } catch (e: any) {
      setCandidateError(e?.message ?? e.toString())
    } finally {
      setLoading(false)
    }
  }

  const onSave = async (data: CandidateFormData) => {
    try {
      setUpdated(false)
      setError('')
      setLoading(true)

      data.id = candidate?.id
      const response = await repo.saveCandidate(data)
      if (response.candidate) {
        setUpdated(true)
        fetchCandidate(response.candidate.id)
      } else if (response.message) {
        setError(response.message)
      }
    } catch (e: any) {
      setError(e?.message ?? e.toString())
    } finally {
      setLoading(false)
    }
  }

  return (
    <>
      <Header title="Edit candidate" />
      <Body>
        {!loading && !candidateError && candidate && <CandidateForm onSave={onSave} candidate={candidate} buttonLabel="Edit candidate" />}
        {loading && <div className="text-center p-5"><Spinner /></div>}
        {error && (
          <Alert variant="danger">
            {error}
          </Alert>
        )}
        {candidateError && (
          <Alert variant="danger">
            {candidateError}
          </Alert>
        )}
        {updated && (
          <Alert variant="success">
            Candidate edited successfully!
          </Alert>
        )}
      </Body>
    </>
  )
}

export default UpdateCandidate
