import * as React from "react"
import * as homeworkFormStyles from "../styles/homeworkFormStyles.module.css"
import ExternalLink from "./externalLink"

export default class Home extends React.Component {

  constructor(props) {
    super(props);
    this.convertFormToObject=this.convertFormToObject.bind(this);
    this.downloadObjectAsJson=this.downloadObjectAsJson.bind(this);
    this.state = {
      selfGradeOptions: [0, 1, 2, 3, 4, 5],
      difficultyOptions: ["1 (least difficult)", "2", "3", "4", "5", "6", "7", "8", "9", "10 (most difficult)"]
    }
  }

  convertFormToObject() {
    if (document.getElementById("selfGradeForm").checkValidity()) {
      var form = document.getElementById("selfGradeForm").elements;
      var formObj = {
        "name": form["inputName"].value,
        "email": form["inputEmail"].value,
        "studentID": form["inputStudentID"].value,
        "difficulty": document.querySelector(`input[name="difficulty-inlineRadioOptions"]:checked`).value,
        "hours": form["inputHours"].value,
        "feedback": form["feedback"].value,
        "questions": {}
      }
      for (var question of this.props.pageContext.homework.questions) {
        formObj["questions"][question] = document.querySelector(`input[name="${question}-inlineRadioOptions"]:checked`).value.substr(-1);
      }
      console.log(formObj)
      this.downloadObjectAsJson(formObj, this.props.pageContext.homework.name + "-selfgrade")
    }
  }

  downloadObjectAsJson(exportObj, exportName){
    var dataStr = "data:text/json;charset=utf-8," + encodeURIComponent(JSON.stringify(exportObj));
    var downloadAnchorNode = document.createElement('a');
    downloadAnchorNode.setAttribute("href",     dataStr);
    downloadAnchorNode.setAttribute("download", exportName + ".json");
    document.body.appendChild(downloadAnchorNode); // required for firefox
    downloadAnchorNode.click();
    downloadAnchorNode.remove();
  }

  render() {
    return (
        <div className={homeworkFormStyles.homeworkFormWrapper}>
          <div className={homeworkFormStyles.title}>{this.props.pageContext.homework.name} Self-Grade</div>
          <div className={homeworkFormStyles.description}>
            <div>Here is the gradescope link for this assignment: <ExternalLink href={this.props.pageContext.homework.gradescopeLink}>Gradescope Link</ExternalLink></div>
            <div>Here is the link to the solutions for this assignment: <ExternalLink href={this.props.pageContext.homework.solutionsLink}>Solutions Link</ExternalLink></div>
            Self-grade your assignment submission by filling out all the fields. To learn more about self-grades and how you should go about them,
            check out <ExternalLink href="https://bcourses.berkeley.edu/courses/1517338/files/folder/EE120-F22-HW?preview=8392592">this document</ExternalLink>
            <div className={homeworkFormStyles.note}>Note: Optional problems are left out of the self-grade form, as they are not counted towards your grade.</div>
          </div>
          <div>
            <div className={homeworkFormStyles.sectionTitle}>Self grade guide</div>
            <table className={`table table-striped table-hover ${homeworkFormStyles.guideTable}`}>
              <thead className={`thead-dark ${homeworkFormStyles.tableHead}`}>
                <th>Score</th>
                <th>Score Description</th>
              </thead>
              <tbody>
                <tr>
                  <td className={homeworkFormStyles.optionCol}>0</td>
                  <td>Blank or did not attempt.</td>
                </tr>
                <tr>
                  <td className={homeworkFormStyles.optionCol}>1</td>
                  <td>Minimal progress; almost fully incorrect.</td>
                </tr>
                <tr>
                  <td className={homeworkFormStyles.optionCol}>2</td>
                  <td>You made initial progress but proceeded in the wrong direction.</td>
                </tr>
                <tr>
                  <td className={homeworkFormStyles.optionCol}>3</td>
                  <td>You made about half (or a little less) of the progress required for a correct solution.</td>
                </tr>
                <tr>
                  <td className={homeworkFormStyles.optionCol}>4</td>
                  <td>Your work was in the right direction, but missing one or a few critical steps.</td>
                </tr>
                <tr>
                  <td className={homeworkFormStyles.optionCol}>5</td>
                  <td>At least 80% of the problem is correct, with full effort and work shown. Complete work must beshown for full credit!</td>
                </tr>
              </tbody>
            </table>
          </div>
          <div>
            <form target="frame" id="selfGradeForm">
              <div className={homeworkFormStyles.sectionTitle}>Personal Info</div>
              <div className={`form-group ${homeworkFormStyles.inputField}`}>
                <label htmlFor="inputName">Name</label>
                <input name="inputName" type="text" className="form-control" id="inputName" placeholder="Enter Name" required/>
              </div>
              <div className={`form-group ${homeworkFormStyles.inputField}`}>
                <label htmlFor="inputEmail">Email address</label>
                <input name="inputEmail" type="email" className="form-control" id="inputEmail" aria-describedby="emailHelp" placeholder="Enter Email" required/>
                <small id="emailHelp" className="form-text text-muted">Your Berkeley Email (ex. oski@berkeley.edu)</small>
              </div>
              <div className={`form-group ${homeworkFormStyles.inputField}`}>
                <label htmlFor="inputStudentID">Student ID</label>
                <input name="inputStudentID" type="text" className="form-control" id="inputStudentID" placeholder="Enter Student ID" required/>
              </div>
              <div className={homeworkFormStyles.sectionTitle}>Self Grade Questions</div>
              {this.props.pageContext.homework.questions.map((question) =>
                    <div className={homeworkFormStyles.inputField}>
                      <div>Question {question}</div>
                      {this.state.selfGradeOptions.map((selfGradeOption) => 
                        <div className={`form-check form-check-inline`}>
                          <input className="form-check-input" type="radio" name={`${question}-inlineRadioOptions`} id={`${question}-${selfGradeOption}`} value={`${question}-option${selfGradeOption}`} required/>
                          <label className="form-check-label" htmlFor={`${question}-${selfGradeOption}`}>{selfGradeOption}</label>
                        </div>
                      )}
                    </div>
                )}
                <div>
                  <div className={homeworkFormStyles.sectionTitle}>Feedback (Optional)</div>
                  <div className={homeworkFormStyles.inputField}>
                    <div>Rate the difficulty of this homework</div>
                    <div>
                      {this.state.difficultyOptions.map((difficultyOption) => 
                        <div className={`form-check form-check-inline`}>
                          <input className="form-check-input" type="radio" name={`difficulty-inlineRadioOptions`} id={`difficulty-${difficultyOption}`} value={`${difficultyOption}`} />
                          <label className="form-check-label" htmlFor={`difficulty-${difficultyOption}`}>{difficultyOption}</label>
                        </div>
                      )}
                    </div>
                  </div>
                  <div>
                    <div className={`form-group ${homeworkFormStyles.inputField}`}>
                      <label htmlFor="inputHours">How many hours did this homework take you?</label>
                      <input name="inputHours" type="number" className="form-control" min="0" id="inputHours" placeholder="Enter # of Hours" />
                    </div>
                  </div>
                  <div>
                    
                  </div>
                  <div className={`form-group ${homeworkFormStyles.inputField}`}>
                    <label htmlFor="feedback">Do you have any other feedback for this homework?</label>
                    <textarea name="feedback" className="form-control" id="feedback" rows="3"></textarea>
                  </div>
                </div>
              <button className={`btn btn-primary ${homeworkFormStyles.submitButton}`} type="submit" onClick={this.convertFormToObject}>GENERATE SELF-GRADE</button>
            </form>
          </div>
          <iframe name="frame"></iframe>
      </div>

    )
  }
}