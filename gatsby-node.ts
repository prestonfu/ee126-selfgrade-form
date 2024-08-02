import homeworkData from "./src/data/homeworkData.json"
import path from "path"

exports.createPages = async function ({ actions, graphql }) {
    homeworkData.forEach(homework => {
      actions.createPage({
        path: homework.pageName,
        component: path.resolve(`./src/components/homeworkForm.tsx`),
        context: { homework: homework },
      })
    })
  }