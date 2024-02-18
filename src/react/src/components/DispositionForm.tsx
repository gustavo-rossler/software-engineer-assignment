import { useState } from "react"
import { Col, Form, Row } from "react-bootstrap"
import { Disposition } from "../models/Disposition"

export type DispositionFormData = {
  id?: number
  disposition?: string
  hireTytpe?: string
  fee?: number
  currency?: string
  rejectionReason?: string
}

export interface IDispositionFormProps {
  disposition?: Disposition
}

function DispositionForm({ disposition }: IDispositionFormProps) {
  const [data, setData] = useState<DispositionFormData>({
    disposition: disposition?.disposition ?? '',
    hireTytpe: disposition?.hireTytpe ?? '',
    fee: disposition?.fee ?? 0,
    currency: disposition?.currency ?? '',
    rejectionReason: disposition?.rejectionReason ?? '',
  })
  const [validated, setValidated] = useState(false)

  const onSubmit = () => { }

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
              value={data?.fee}
              onChange={(e) => setData({ ...data, fee: parseFloat(e.target.value) })}
            />
          </Form.Group>
        </Col>
      </Row>
    </Form>
  )
}

export default DispositionForm
