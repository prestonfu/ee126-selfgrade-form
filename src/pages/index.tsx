import * as React from "react"
import homeworkData from "../data/homeworkData.json"

export default class Home extends React.Component {
  render() {
    return (
      <div>
        <div>
          EE120 Self-Grade Form
        </div>

        <div>
          Please select which homework you would like to self-grade from below:
        </div>

        <div>
          {homeworkData.map(homework => (
              <div>{homework.name}</div>
            ))
          }
        </div>
      </div>
    )
  }
}