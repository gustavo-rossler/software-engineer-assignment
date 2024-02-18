import { useState } from "react"
import Body from "../components/Body"
import CandidateForm, { CandidateFormData } from "../components/CandidateForm"
import Header from "../components/Header"
import { Alert, Spinner } from "react-bootstrap"
import { CandidatesRepository } from "../repositories/CandidatesRepository"

function CreateCandidate() {
  const [loading, setLoading] = useState(false)
  const [created, setCreated] = useState(false)
  const [error, setError] = useState('')

  const onSave = async (data: CandidateFormData) => {
    try {
      setCreated(false)
      setError('')
      setLoading(true)
      const repo = new CandidatesRepository()
      const response = await repo.saveCandidate(data)
      console.log(response)
      if (response.candidate) {
        setCreated(true)
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
      <Header title="Create candidate" />
      <Body>
        {!loading && <CandidateForm onSave={onSave} buttonLabel="Create candidate" />}
        {loading && <div className="text-center p-5"><Spinner /></div>}
        {error && (
          <Alert variant="danger">
            {error}
          </Alert>
        )}
        {created && (
          <Alert variant="success">
            Candidate created successfully!
          </Alert>
        )}
      </Body>
    </>
  )
}

export default CreateCandidate
