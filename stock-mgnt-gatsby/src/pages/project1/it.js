import * as React from "react"
import "bootstrap/dist/css/bootstrap.min.css"
import jsonData from "./it-2019.json"

import { Form, Button, Modal, Table } from "react-bootstrap"
import { useLocalStorage } from "react-use"
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  defaults,
} from "chart.js"
import { Line } from "react-chartjs-2"

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
)

export default function ItGradeTracker() {
  //console.log(
  //  jsonData.curriculum.subjects[jsonData.curriculum.subjects.length - 1]
  //)

  let [course, setCourse] = React.useState([])
  let [semester, setSemester] = useLocalStorage("semester2", [])
  let [courseTitle, setCourseTitle] = React.useState("")
  let [getSemester, setGetSemester] = React.useState("1")
  let [grade, setGrage] = React.useState("4")
  let [gradeList, setGrageList] = useLocalStorage("gradeList2", [])
  let [gpa, setGpa] = useLocalStorage("gpaList2", [])
  let [totalGpa, setTotalGpa] = useLocalStorage("totalGpa2", 0)
  let [totalNum, setTotalNum] = useLocalStorage("totalCourse2", 0)

  const [show, setShow] = React.useState(false)
  const handleClose = () => setShow(false)
  const handleShow = event => {
    setShow(true)
    setCourseTitle(event.target.value)
  }

  // const semesterChoose = event => {
  //   setGetSemester(event.target.value)
  // }
  // const gradeChoose = event => {
  //   setGrage(event.target.value)
  // }

  function addSemester() {
    if (semester.length == 0) {
      semester.push(1)
    } else {
      semester.push(semester[semester.length - 1] + 1)
    }
    console.table(semester)
    setSemester([...semester])
  }

  function addToSemester() {
    let rating = ""
    let g = grade

    if (g == "4") {
      rating = "A"
    }
    if (g == "3.75") {
      rating = "A-"
    }
    if (g == "3.25") {
      rating = "B+"
    }
    if (g == "3") {
      rating = "B"
    }
    if (g == "2.75") {
      rating = "B-"
    }
    if (g == "2.25") {
      rating = "C+"
    }
    if (g == "2") {
      rating = "C"
    }
    if (g == "1.75") {
      rating = "C-"
    }
    if (g == "1") {
      rating = "D"
    }
    if (g == "0") {
      rating = "F"
    }
    if (g == "excluded") {
      rating = "W"
    }
    gradeList.push({
      semester: getSemester,
      course: courseTitle,
      rating: rating,
      grade: grade,
    })
    setGrageList([...gradeList])
    setShow(false)

    let currentTotalGpa = 0
    let currentTotalNum = 0
    for (let i = 1; i <= semester.length; i++) {
      let currentGpa = 0
      let num = 0

      {
        gradeList
          .filter(se => se.semester == i)
          .map(se => {
            if (se.rating == "W") {
              currentGpa = currentGpa
              currentTotalGpa = currentTotalGpa
              num = num
            } else {
              currentGpa += se.grade * 1
              currentTotalGpa += se.grade * 1
              num++
              currentTotalNum++
            }
          })
      }
      currentGpa = currentGpa / num
      gpa[i - 1] = currentGpa.toFixed(2)
      setGpa([...gpa])
      setTotalGpa(currentTotalGpa)
      setTotalNum(currentTotalNum)
    }
  }

  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: "top",
      },
      title: {
        display: true,
        text: "GPA per Semester",
      },
    },
  }

  const labels = semester

  const data = {
    labels,
    datasets: [
      {
        label: "GPA",
        data: gpa,
        borderColor: "rgb(0, 123, 255)",
        backgroundColor: "rgba(0, 123, 255, 0.5)",
      },
    ],
  }

  React.useEffect(async () => {
    let items = []
    let count = 0
    for (let i = 0; i < jsonData.curriculum.subjects.length; i++) {
      items.push(
        <h3
          key={jsonData.curriculum.subjects[i].groupName}
          style={{
            marginTop: "2.5rem",
            fontSize: "larger",
            fontWeight: "bold",
          }}
        >
          {jsonData.curriculum.subjects[i].groupName}
        </h3>
      )
      for (
        let t = 0;
        t < jsonData.curriculum.subjects[i].subjects.length;
        t++
      ) {
        var courseCode = jsonData.curriculum.subjects[i].subjects[t].code
        var courseName = jsonData.curriculum.subjects[i].subjects[t].name
        var courseTitle = courseCode + " " + courseName
        items.push(
          <Button
            id={count}
            variant="primary"
            style={{
              height: "100px",
              width: "200px",
              margin: "1rem 1rem 0 0",
            }}
            value={courseTitle}
            onClick={handleShow}
          >
            {jsonData.curriculum.subjects[i].subjects[t].code}
            <br></br>
            {jsonData.curriculum.subjects[i].subjects[t].name}
          </Button>
        )
        count++
      }
    }

    setCourse(items)
    let currentTotalGpa = 0
    let currentTotalNum = 0
    for (let i = 1; i <= semester.length; i++) {
      let currentGpa = 0
      let num = 0

      {
        gradeList
          .filter(se => se.semester == i)
          .map(se => {
            if (se.rating == "W") {
              currentGpa = currentGpa
              currentTotalGpa = currentTotalGpa
              num = num
            } else {
              currentGpa += se.grade * 1
              currentTotalGpa += se.grade * 1
              num++
              currentTotalNum++
            }
          })
      }
      currentGpa = currentGpa / num
      gpa[i - 1] = currentGpa.toFixed(2)
      setGpa([...gpa])
      setTotalGpa(currentTotalGpa)
      setTotalNum(currentTotalNum)
    }
  }, [])

  return (
    <>
      <div
        style={{
          float: "left",
          height: "100%",
          width: "62%",
          padding: "0 2rem",
          left: "0",
          borderRight: "5px solid black",
        }}
      >
        <h1 style={{ textAlign: "center", margin: "3rem", fontWeight: "bold" }}>
          Grade Tracker for IT student
        </h1>
        <h2 style={{ fontWeight: "bold" }}>Course List</h2>
        <div>{course}</div>
      </div>
      <div
        style={{
          float: "left",
          height: "100%",
          width: "38%",
          padding: "0 2rem",
          right: "0",
        }}
      >
        <h2
          style={{
            textAlign: "center",
            margin: "3rem 0 0 0",
            fontWeight: "bold",
          }}
        >
          GPA
        </h2>
        <Button
          onClick={() => {
            addSemester()
          }}
          style={{ marginLeft: "1%", marginTop: "1rem", marginBottom: "1rem" }}
          variant="primary"
        >
          Add a Semester
        </Button>
        <p
          style={{
            textAlign: "right",
            marginTop: "2rem",
            fontWeight: "bold",
          }}
          className="p-3 mb-2 bg-primary text-white"
        >
          Total GPA: {(totalGpa / totalNum).toFixed(2)}
        </p>

        {semester.map(item => {
          let tableCode = []
          let Title = []
          Title.push(<th colSpan={3}>Semester {item}</th>)
          {
            gradeList
              .filter(se => se.semester == item)
              .map(se => {
                tableCode.push(
                  <tr>
                    <td colSpan={2}>{se.course}</td>
                    <td style={{ textAlign: "right" }}>{se.rating}</td>
                  </tr>
                )
              })
          }
          return (
            <Table striped>
              <thead>
                <tr>{Title}</tr>
              </thead>
              <tbody>
                {tableCode}
                <tr>
                  <td colSpan={3} style={{ textAlign: "right" }}>
                    {gpa[item - 1]}
                  </td>
                </tr>
              </tbody>
            </Table>
          )
        })}
        <div style={{ width: "500px" }}>
          <Line options={options} data={data} />
        </div>
      </div>
      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>{courseTitle}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group className="mb-3">
              <Form.Label>Semester</Form.Label>
              <Form.Select
                aria-label="Default select example"
                id="semester"
                onChange={e => setGetSemester(e.target.value)}
              >
                <option selected disabled>
                  Select...
                </option>
                {semester.map(item => {
                  return <option value={item}>Semester {item}</option>
                })}
              </Form.Select>
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Grade</Form.Label>
              <Form.Select
                aria-label="Default select example"
                id="grade"
                onChange={e => setGrage(e.target.value)}
              >
                <option selected disabled>
                  Select...
                </option>
                <option value="4">A</option>
                <option value="3.75">A-</option>
                <option value="3.25">B+</option>
                <option value="3">B</option>
                <option value="2.75">B-</option>
                <option value="2.25">C+</option>
                <option value="2">C</option>
                <option value="1.75">C-</option>
                <option value="1">D</option>
                <option value="0">F</option>
                <option value="excluded">W</option>
              </Form.Select>
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button variant="primary" onClick={addToSemester}>
            Add
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  )
}
