import assignmentData from "./src/data/assignmentData.json"
import path from "path"
import { AssignmentType } from "./src/types"

exports.createPages = async function ({ actions }) {
    assignmentData.forEach((assignment: AssignmentType) => {
      actions.createPage({
        path: assignment.pageName,
        component: path.resolve(`./src/components/SelfGradeForm.tsx`),
        context: { assignment: assignment },
      })
    })
  }