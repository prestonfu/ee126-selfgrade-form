import * as React from "react"

export default class Home extends React.Component {
  render() {
    return (
        <div>
          <div>{this.props.pageContext.homework.name} Self-Grade</div>
          <br></br>
          <div>Description</div>
          <div>Self grade guide</div>
          <div>

          <div>name</div>
          <div>email</div>
          <div>student id</div>
          {this.props.pageContext.homework.questions.map((question) =>
                <div>{question}</div>
            )}
          </div>

        <div>Feedback (Optional)</div>
        <div>Difficulty</div>
        <div>Hours</div>
        <div>Any other feedback?</div>
      </div>

    )
  }
}