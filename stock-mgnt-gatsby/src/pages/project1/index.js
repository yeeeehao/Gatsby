import React from "react"
import { Button } from "react-bootstrap"
import "bootstrap/dist/css/bootstrap.min.css"

function GradeTracker() {
  return (
    <>
      <div
        class="border border-light"
        style={{
          textAlign: "center",
          margin: "15% auto",
          borderRadius: "25px",
          width: "60%",
          backgroundColor: "rgba(244,244,244,0.5)",
        }}
      >
        <h1 style={{ marginTop: "3rem", fontWeight: "bold" }}>Grade Tracker</h1>
        <h4 style={{ marginBottom: "2rem", fontWeight: "bold" }}>
          for VMS student (for 62x - 63x)
        </h4>
        <div
          class="d-grid gap-2 col-6 mx-auto"
          style={{ marginBottom: "3rem" }}
        >
          <Button variant="warning">
            <a href="cs" style={{ color: "black" }}>
              Computer Science
            </a>
          </Button>
          <Button variant="primary">
            <a href="it" style={{ color: "white" }}>
              Information Technology
            </a>
          </Button>
        </div>
      </div>
    </>
  )
}

export default GradeTracker
