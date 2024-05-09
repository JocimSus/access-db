import { useEffect, useState } from "react"

import Insert from "./Insert.jsx"
import "./App.css"

function App() {
  const [backendData, setBackendData] = useState(null)

  useEffect(() => {
    fetch("/api")
      .then((res) => res.json())
      .then((data) => setBackendData(data))
      .catch((err) => console.log(err))
  }, [])

  return (
    <>
      <div className="title">Access Scores Database</div>
      <div className="input-block">
        <Insert />
        {backendData == null ? (
          <p>Loading...</p>
        ) : (
          backendData.users.map((user, i) => {
            ;<p key={i}>{user}</p>
          })
        )}
      </div>
    </>
  )
}

export default App
