import * as React from "react"

const wineImage = {
  height: "10rem",
}
export default function Wine() {
  let items = []
  let [wineTitles, setWineTitles] = React.useState([])

  React.useEffect(async () => {
    let res = await fetch("https://api.sampleapis.com/wines/reds")
    let wines = await res.json()
    for (let i = 0; i < wines.length; i++) {
      console.log(wines[i].winery)
      items.push(
        <li>
          <div style={{ width: "40rem", overflow: "hidden" }}>
            <div style={{ width: "11rem", float: "left" }}>
              <img style={wineImage} src={wines[i].image} />
            </div>
            <div>
              <div>
                <b>Winery: {wines[i].winery}</b>
              </div>
              <div>
                <p>Wine: {wines[i].wine}</p>
                <p>
                  <b>Rating:</b>
                  <p>
                    Average: {wines[i].rating.average}
                    <br />
                    Reviews: {wines[i].rating.reviews}
                  </p>
                </p>
              </div>
            </div>
          </div>
        </li>
      )
    }

    setWineTitles(items)
  }, [])

  return (
    <>
      <h1>Wines</h1>
      <ul>{wineTitles}</ul>
    </>
  )
}
