import React from 'react';
import { Link } from "gatsby"
import assignmentData from "../data/assignmentData.json"
import * as indexStyles from "../styles/indexStyles.module.css"
import ExternalLink from "../components/externalLink"
import { AssignmentType } from '../types';

export default function Home() {
  return (
    <div className={indexStyles.indexWrapper}>
      <div className={indexStyles.title}>
        EECS 126 Self-Grade Form
      </div>

      <div className={indexStyles.description}>
        To learn more about how self-grades work, check out <ExternalLink href="https://inst.eecs.berkeley.edu/~ee126/fa24/info.html#self-grading-policy">the course website</ExternalLink>
      </div>

      <div>
      <table className={`table table-striped table-hover ${indexStyles.homeworkTable}`}>
        <thead className={`thead-dark ${indexStyles.tableHeader}`}>
          <th>Assignment</th>
          <th>Gradescope</th>
          <th>Solutions</th>
        </thead>
        <tbody>
          {assignmentData.map((assignment: AssignmentType) =>
              <tr>
                <td>
                  <Link href={assignment.pageName}>
                    {assignment.name}
                  </Link>
                </td>
                <td>
                  <ExternalLink href={assignment.gradescopeLink}>
                      Gradescope
                  </ExternalLink>
                </td>
                <td>
                  <ExternalLink href={assignment.solutionsLink}>
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