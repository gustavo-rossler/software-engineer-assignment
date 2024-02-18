import { FormEvent, useState } from "react"
import { Button, Col, Form, Row } from "react-bootstrap"
import { Link } from "react-router-dom"
import { Candidate } from "../models/Candidate"

export type CandidateFormData = {
  name?: string
  email?: string
  phone?: string
  id?: number
}

export interface ICandidateFormProps {
  candidate?: Candidate
  onSave: Function
  buttonLabel: string
}

function CandidateForm({ candidate, onSave, buttonLabel }: ICandidateFormProps) {
  const [data, setData] = useState<CandidateFormData>({
    email: candidate?.email ?? '',
    name: candidate?.name ?? '',
    phone: candidate?.phone ?? '',
  })
  const [validated, setValidated] = useState(false)

  const isEmailValid = data?.email !== undefined && data.email.length > 0
  const isNameValid = data?.name !== undefined && data?.name?.length > 0

  const onSubmit = (event: FormEvent<HTMLFormElement>) => {
    const form = event.currentTarget;

    event.preventDefault()
    event.stopPropagation()

    setValidated(true)

    if (form.checkValidity()) {
      if (!data.phone) {
        delete data.phone
      }
      onSave(data)
    }
  }

  return (
    <Form noValidate validated={validated} onSubmit={onSubmit}>
      <Row>
        <Col sm={6}>
          <h4>Candidate information</h4>
          <Form.Group className="mb-3" controlId="formName">
            <Form.Label>Name <i>(required)</i></Form.Label>
            <Form.Control
              required
              type="text"
              placeholder="Full name"
              value={data?.name}
              onChange={(e) => setData({ ...data, name: e.target.value })}
              isValid={isNameValid}
            />
          </Form.Group>
          <Form.Group className="mb-3" controlId="formEmail">
            <Form.Label>Email <i>(required)</i></Form.Label>
            <Form.Control
              required
              type="email"
              placeholder="name@email.com"
              value={data?.email}
              onChange={(e) => setData({ ...data, email: e.target.value })}
              isValid={isEmailValid}
            />
          </Form.Group>
          <Form.Group className="mb-3" controlId="formEmail">
            <Form.Label>Phone</Form.Label>
            <Form.Control
              type="text"
              placeholder="XXX-XXX-XXX"
              value={data?.phone}
              onChange={(e) => setData({ ...data, phone: e.target.value })}
            />
          </Form.Group>
        </Col>
      </Row>
      <div className="mt-5 py-3 border-top d-flex justify-content-between">
        <Button type="submit">{buttonLabel}</Button>
        <Link to="/" className="btn btn-light">Cancel</Link>
      </div>
    </Form>
  )
}

export default CandidateForm
