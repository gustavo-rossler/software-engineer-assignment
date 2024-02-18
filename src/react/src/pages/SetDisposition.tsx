import { useState } from "react"
import Header from "../components/Header"
import Body from "../components/Body"
import { Alert, Spinner } from "react-bootstrap"

function SetDisposition() {
  const [loading, setLoading] = useState(false)
  const [created, setCreated] = useState(false)
  const [error, setError] = useState('')

  return (
    <>
      <Header title="Create candidate" />
      <Body>
        {loading && <div className="text-center p-5"><Spinner /></div>}
        {error && (
          <Alert variant="danger">
            {error}
          </Alert>
        )}
        {created && (
          <Alert variant="success">
            Disposition saved successfully!
          </Alert>
        )}
      </Body>
    </>
  )
}

export default SetDisposition
