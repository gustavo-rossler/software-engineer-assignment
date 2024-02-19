import { FormEvent, useEffect, useState } from "react"
import { Button, Col, Form, Row } from "react-bootstrap"
import { Disposition, dispositionTypes, hiredTypes, rejectedReasons } from "../models/Disposition"
import { Link } from "react-router-dom"
import CurrencyInput from "react-currency-input-field";

export type DispositionFormData = {
  id?: number
  candidate_id?: number
  disposition?: string
  hire_type?: string
  fee?: number
  currency?: string
  rejection_reason?: string
}

export interface IDispositionFormProps {
  disposition?: Disposition
  onSave: Function
}

function DispositionForm({ disposition, onSave }: IDispositionFormProps) {
  const [data, setData] = useState<DispositionFormData>({
    disposition: disposition?.disposition ?? 'undecided',
    hire_type: disposition?.hireTytpe ?? '',
    fee: disposition?.fee ?? undefined,
    currency: disposition?.currency ?? '',
    rejection_reason: disposition?.rejectionReason ?? '',
  })
  const [validated, setValidated] = useState(false)
  const [feeValue, setFeeValue] = useState<string>(disposition?.fee?.toString() ?? '')

  const onSubmit = (event: FormEvent<HTMLFormElement>) => {
    const form = event.currentTarget;

    event.preventDefault()
    event.stopPropagation()

    setValidated(true)

    if (form.checkValidity()) {
      if (!data.hire_type) {
        delete data.hire_type
      }
      if (!data.currency) {
        delete data.currency
      }
      if (!data.fee) {
        delete data.fee
      }
      if (!data.rejection_reason) {
        delete data.rejection_reason
      }
      if (!data.disposition) {
        data.disposition = 'undecided'
      }

      onSave(data)
    }
  }

  const handleDispositionChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setData({ ...data, disposition: event.target.value })
  }

  const handleHireTypeChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setData({ ...data, hire_type: event.target.value })
  }

  useEffect(() => {
    setData({ ...data, fee: parseFloat(feeValue) })
  }, [feeValue])

  return (
    <Form noValidate validated={validated} onSubmit={onSubmit}>
      <Row>
        <Col sm={6}>
          <h4>Set disposition</h4>
          <Form.Group>
            <Form.Label>Would you like to mark this candidate as hired or rejected?</Form.Label>
            <div className="mb-3">
              <Form.Check
                inline
                label={dispositionTypes.hired}
                type="radio"
                id="disposition-type-hired"
                value="hired"
                checked={data.disposition === 'hired'}
                onChange={handleDispositionChange}
              />
              <Form.Check
                inline
                label={dispositionTypes.rejected}
                type="radio"
                id="disposition-type-rejected"
                value="rejected"
                checked={data.disposition === 'rejected'}
                onChange={handleDispositionChange}
              />
            </div>
          </Form.Group>
          {data.disposition === 'hired' && (
            <>
              <Form.Group>
                <Form.Label>Is the candidate being hired internally or externally?</Form.Label>
                <div className="mb-3">
                  <Form.Check
                    inline
                    label={hiredTypes.internal}
                    type="radio"
                    id="hire-type-hired"
                    name="hire-type"
                    value="internal"
                    checked={data.hire_type === 'internal'}
                    onChange={handleHireTypeChange}
                    required
                  />
                  <Form.Check
                    inline
                    label={hiredTypes.external}
                    type="radio"
                    id="hire-type-external"
                    name="hire-type"
                    value="external"
                    checked={data.hire_type === 'external'}
                    onChange={handleHireTypeChange}
                    required
                  />
                </div>
              </Form.Group>
              <Form.Group className="mb-3" controlId="formName">
                <Form.Label>Placement fee earned (optional)</Form.Label>
                <Row>
                  <Col sm={9}>
                    <CurrencyInput
                      id="input-example"
                      name="input-name"
                      placeholder="0.00"
                      value={feeValue}
                      decimalsLimit={2}
                      allowDecimals={true}
                      onValueChange={(_, __, values) => setFeeValue(values?.formatted ?? '')}
                      className="form-control"
                      required={data.currency !== undefined && data.currency !== '' ? true : false}
                    />
                  </Col>
                  <Col sm={3}>
                    <Form.Select
                      onChange={(e) => setData({ ...data, currency: e.target.value ?? undefined })}
                      value={data.currency}
                    >
                      <option value="">Currency</option>
                      <option value="usd">USD</option>
                      <option value="eur">EUR</option>
                    </Form.Select>
                  </Col>
                </Row>
              </Form.Group>
            </>
          )}
          {data.disposition === 'rejected' && <Form.Group>
            <Form.Label>What is the reason for rejection?</Form.Label>
            <Form.Select
              onChange={(e) => setData({ ...data, rejection_reason: e.target.value ?? undefined })}
              required
              value={data.rejection_reason}
            >
              <option></option>
              {Object.keys(rejectedReasons).map((key) => (
                <option value={key} key={key}>{rejectedReasons[key]}</option>
              ))}
            </Form.Select>
          </Form.Group>}
        </Col>
      </Row>
      <div className="mt-5 py-3 border-top d-flex justify-content-between">
        <Button type="submit">Save disposition</Button>
        <Link to="/" className="btn btn-light">Cancel</Link>
      </div>
    </Form>
  )
}

export default DispositionForm
