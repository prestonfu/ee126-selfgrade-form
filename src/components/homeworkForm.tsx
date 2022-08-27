import * as React from "react"
import * as homeworkFormStyles from "../styles/homeworkFormStyles.module.css"
import ExternalLink from "./externalLink"

export default class Home extends React.Component {
  render() {
    var selfGradeOptions = [0, 1, 2, 3, 4, 5]
    var difficultyOptions = ["1 (least difficult)", "2", "3", "4", "5", "6", "7", "8", "9", "10 (most difficult)"]
    return (
        <div className={homeworkFormStyles.homeworkFormWrapper}>
          <div className={homeworkFormStyles.title}>{this.props.pageContext.homework.name} Self-Grade</div>
          <div><ExternalLink href={this.props.pageContext.homework.gradescopeLink}>Gradescope Link</ExternalLink></div>
          <div><ExternalLink href={this.props.pageContext.homework.solutionsLink}>Solutions Link</ExternalLink></div>
          <div className={homeworkFormStyles.description}>Description</div>
          <div className={homeworkFormStyles.sectionTitle}>Self grade guide</div>
          <div>
            <form>
              <div className={homeworkFormStyles.sectionTitle}>Personal Info</div>
              <div class="form-group">
                <label for="inputName">Name</label>
                <input type="name" class="form-control" id="inputName" placeholder="Enter Name" required/>
              </div>
              <div class="form-group">
                <label for="inputEmail">Email address</label>
                <input type="email" class="form-control" id="inputEmail" aria-describedby="emailHelp" placeholder="Enter Email" required/>
                <small id="emailHelp" class="form-text text-muted">Your Berkeley Email (ex. oski@berkeley.edu)</small>
              </div>
              <div class="form-group">
                <label for="inputStudentID">Student ID</label>
                <input class="form-control" id="inputStudentID" placeholder="Enter Student ID" required/>
              </div>
              <div className={homeworkFormStyles.sectionTitle}>Self Grade Questions</div>
              {this.props.pageContext.homework.questions.map((question) =>
                    <div>
                      <div>Question {question}</div>
                      {selfGradeOptions.map((selfGradeOption) => 
                        <div class="form-check form-check-inline">
                          <input class="form-check-input" type="radio" name={`${question}-inlineRadioOptions`} id={`${question}-${selfGradeOption}`} value={`${question}-option${selfGradeOption}`} required/>
                          <label class="form-check-label" for={`${question}-${selfGradeOption}`}>{selfGradeOption}</label>
                        </div>
                      )}
                    </div>
                )}
                <div>
                  <div className={homeworkFormStyles.sectionTitle}>Feedback (Optional)</div>
                  <div>
                  <div>Rate the difficulty of this homework</div>
                    {difficultyOptions.map((difficultyOption) => 
                      <div class="form-check form-check-inline">
                        <input class="form-check-input" type="radio" name={`difficulty-inlineRadioOptions`} id={`difficulty-${difficultyOption}`} value={`difficulty-option${difficultyOption}`} />
                        <label class="form-check-label" for={`difficulty-${difficultyOption}`}>{difficultyOption}</label>
                      </div>
                    )}
                  </div>
                  <div>
                    <div class="form-group">
                      <label for="inputHours">How many hours did this homework take you?</label>
                      <input type="number" class="form-control" min="0" id="inputHours" placeholder="Enter # of Hours" />
                    </div>
                  </div>
                  <div>
                    
                  </div>
                  <div class="form-group">
                    <label for="feedback">Do you have any other feedback for this homework?</label>
                    <textarea class="form-control" id="feedback" rows="3"></textarea>
                  </div>
                </div>
              <button class="btn btn-primary" type="submit">Generate</button>
            </form>
          </div>
      </div>

    )
  }
}