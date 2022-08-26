import * as React from "react"
import homeworkData from "../data/homeworkData.json"
import * as indexStyles from "../styles/indexStyles.module.css"

export default class Home extends React.Component {
  render() {
    return (
      <div className={indexStyles.indexWrapper}>
        <div className={indexStyles.title}>
          EE120 Self-Grade Form
        </div>

        <div className={indexStyles.description}>
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