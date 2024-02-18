import { useEffect, useState } from "react"
import Header from "../components/Header"
import Body from "../components/Body"
import { Alert, Spinner } from "react-bootstrap"
import { DispositionsRepository } from "../repositories/DispositionsRepository"
import { useParams } from "react-router-dom"
import { Disposition, createDispositionFromApi } from "../models/Disposition"
import DispositionForm, { DispositionFormData } from "../components/DispositionForm"

function SetDisposition() {
  const [loading, setLoading] = useState(false)
  const [saved, setSaved] = useState(false)
  const [error, setError] = useState('')
  const [disposition, setDisposition] = useState<Disposition>()

  const { id } = useParams()

  const repo = new DispositionsRepository()

  useEffect(() => {
    if (id) {
      fetchDisposition(parseInt(id))
    }
  }, [id])

  const fetchDisposition = async (candidateId: number) => {
    try {
      setDisposition(undefined)
      setError('')
      setLoading(true)
      const response = await repo.fetchDispositionByCandidateId(candidateId)
      if (response.disposition) {
        setDisposition(createDispositionFromApi(response.disposition))
      }
    } catch (e: any) {
      setError(e?.message ?? e.toString())
    } finally {
      setLoading(false)
    }
  }

  const onSave = async (data: DispositionFormData) => {
    try {
      setSaved(false)
      setDisposition(undefined)
      setError('')
      setLoading(true)

      if (id) {
        data.candidate_id = parseInt(id)
      }
      const response = await repo.saveDisposition(data)
      if (response.disposition) {
        setDisposition(createDispositionFromApi(response.disposition))
        setSaved(true)
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
        {!loading && <DispositionForm disposition={disposition} onSave={onSave} />}
        {loading && <div className="text-center p-5"><Spinner /></div>}
        {error && (
          <Alert variant="danger">
            {error}
          </Alert>
        )}
        {saved && (
          <Alert variant="success">
            Disposition saved successfully!
          </Alert>
        )}
      </Body>
    </>
  )
}

export default SetDisposition
