import Body from "../components/Body";
import CandidatesTable from "../components/CandidatesTable";
import Header from "../components/Header";
import { Link } from "react-router-dom";
import { Candidate } from "../models/Candidate";
import { useEffect, useState } from "react";
import { CandidatesRepository } from "../repositories/CandidatesRepository";
import { Spinner } from "react-bootstrap";

function Home() {
  const [candidates, setCandidates] = useState<Candidate[]>()
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  const fetchCandidates = async () => {
    try {
      setLoading(true)
      const repo = new CandidatesRepository()
      const data = await repo.fetchCandidates()
      setCandidates(data)
    } catch (e: any) {
      setError(e?.message ?? error.toString())
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    if (candidates === undefined) {
      fetchCandidates()
    }
  }, [candidates])

  return (
    <>
      <Header title="Candidate list">
        <Link to="candidates/create" className="btn btn-primary">Create candidate</Link>
      </Header>
      <Body>
        {!loading && candidates !== undefined && candidates?.length === 0 && (
          <>
            <h3>No candidates found</h3>
            <p>Create your first candidate</p>
            <p>
              <Link to="candidates/create" className="btn btn-primary">Create candidate</Link>
            </p>
          </>
        )}
        {!loading && candidates !== undefined && candidates.length > 0 && <CandidatesTable candidates={candidates} />}
        {loading && <div className="text-center p-5"><Spinner /></div>}
      </Body>
    </>
  );
}

export default Home;
