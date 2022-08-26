import * as React from "react"
import { Link } from "gatsby"
import homeworkData from "../data/homeworkData.json"
import * as indexStyles from "../styles/indexStyles.module.css"
import ExternalLink from "../components/externalLink"

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
        <table className={`table table-hover table-primary ${indexStyles.homeworkTable}`}>
          <thead style={{ border: "none" }}>
            <th>Homework</th>
            <th>Gradescope</th>
            <th>Solutions</th>
          </thead>
          <tbody>
            {homeworkData.map((homework) =>
              <tr>
                <td>
                  <Link to={"/" + homework.pageName}>
                    {homework.name}
                  </Link>
                </td>
                <td>
                  <ExternalLink href={homework.gradescopeLink}>
                      Gradescope
                  </ExternalLink>
                </td>
                <td>
                  <ExternalLink href={homework.solutionsLink}>
                      Solutions
                  </ExternalLink>
                </td>
              </tr>
            )}
          </tbody>
        </table>
        </div>
      </div>
    )
  }
}