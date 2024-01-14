import * as React from "react"
import * as homeworkFormStyles from "../styles/homeworkFormStyles.module.css"
import ExternalLink from "./externalLink"

export default class Home extends React.Component {

  constructor(props) {
    super(props);
    this.convertFormToObject=this.convertFormToObject.bind(this);
    this.downloadObjectAsJson=this.downloadObjectAsJson.bind(this);
    this.submitForm=this.submitForm.bind(this)
    this.state = {
      selfGradeOptions: [0, 2, 5, 8, 10],
      difficultyOptions: ["1 (least difficult)", "2", "3", "4", "5", "6", "7", "8", "9", "10 (most difficult)"],
      submitted: false
    }
  }

    submitForm() {
      if (document.getElementById("selfGradeForm").checkValidity()) {
        var formObj = this.convertFormToObject()
        this.downloadObjectAsJson(formObj, this.props.pageContext.homework.pageName + "-selfgrade")
        this.setState({submitted: true})
      }
    }

  convertFormToObject() {
    var form = document.getElementById("selfGradeForm").elements;
    var formObj = {
      "name": form["inputName"].value,
      "email": form["inputEmail"].value,
      "studentID": form["inputStudentID"].value,
      "hours": form["inputHours"].value,
      "feedback": form["feedback"].value,
      "questions": {}
    }
    if (document.querySelector(`input[name="difficulty-inlineRadioOptions"]:checked`)) {
      formObj["difficulty"] =  document.querySelector(`input[name="difficulty-inlineRadioOptions"]:checked`).value
    } else {
      formObj["difficulty"] = ""
    }

    for (var question of this.props.pageContext.homework.questions) {
      formObj["questions"][question["name"]] = {
                                                "grade": document.querySelector(`input[name="${question["name"]}-inlineRadioOptions"]:checked`).value.substr(-1),
                                                "points": question["points"]
                                               }
    }
    console.log(formObj)
    return formObj
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
            <div>Self-grade your assignment submission by filling out all the fields. To learn more about self-grades, how they factor into your final assignment grade,
            and how you should go about them, check out <ExternalLink href="https://ee120-course-staff.github.io/course-site/policies/#self-grades">the course website</ExternalLink>.</div>
            <div className={homeworkFormStyles.note}>Note: Optional problems are left out of the self-grade form, as they are not counted towards your grade.</div>
          </div>
          <div>
            <div className={homeworkFormStyles.sectionTitle}>Self-grade rubric</div>
            <table className={`table table-striped table-hover ${homeworkFormStyles.guideTable}`}>
              <thead className={`thead-dark ${homeworkFormStyles.tableHead}`}>
                <th>Score</th>
                <th>Score Description</th>
              </thead>
              <tbody>
                <tr>
                  <td className={homeworkFormStyles.optionCol}>0</td>
                  <td>Didn’t attempt or very wrong.</td>
                </tr>
                <tr>
                  <td className={homeworkFormStyles.optionCol}>2</td>
                  <td>Got started and made some progress, but went off in the wrong direction or with no clear direction.</td>
                </tr>
                <tr>
                  <td className={homeworkFormStyles.optionCol}>5</td>
                  <td>Right direction and got halfway there.</td>
                </tr>
                <tr>
                  <td className={homeworkFormStyles.optionCol}>8</td>
                  <td>Mostly right but a minor thing missing or wrong.</td>
                </tr>
                <tr>
                  <td className={homeworkFormStyles.optionCol}>10</td>
                  <td>100% correct, with full effort and work shown. Complete work must be shown for full credit!</td>
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
                  <>
                    <div className={homeworkFormStyles.inputField}>
                      <div>Question {question["name"]} <span className={homeworkFormStyles.questionPoints}>({question["points"]} points)</span></div>
                      {this.state.selfGradeOptions.map((selfGradeOption) => 
                        <div className={`form-check form-check-inline`}>
                          <input className="form-check-input" type="radio" name={`${question["name"]}-inlineRadioOptions`} id={`${question["name"]}-${selfGradeOption}`} value={`${question["name"]}-option${selfGradeOption}`} required/>
                          <label className="form-check-label" htmlFor={`${question["name"]}-${selfGradeOption}`}>{selfGradeOption}</label>
                        </div>
                      )}
                      <div className={`form-group ${homeworkFormStyles.commentField}`}>
                        <label className={homeworkFormStyles.comment} htmlFor="input">Comment</label>
                        <input name="inputComment" type="text" className="form-control" id="inputName" placeholder="Enter comment for a 2, 5, or 8 score" />
                      </div>
                    </div>
                  </>
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
              <button id="submitButton" className={`btn btn-primary ${homeworkFormStyles.submitButton}`} type="submit" onClick={this.submitForm}>GENERATE SELF-GRADE</button>
              <label className="form-text text-muted" htmlFor="submitButton">Pressing this button will generate and download the JSON Self-Grade file (which you should then submit to the Gradescope assignment)</label>
            </form>
            {this.state.submitted ? 
              <div>
                <hr />
                <div>
                  If you encounter issues with downloading the file, feel free to copy the below JSON into a JSON file and submit that to the gradescope assignment
                </div>
                <pre className={homeworkFormStyles.jsonOutput}>{JSON.stringify(this.convertFormToObject(), null, 2)}</pre>
              </div>: <div/>}
          </div>
          <iframe name="frame"></iframe>
      </div>

    )
  }
}
