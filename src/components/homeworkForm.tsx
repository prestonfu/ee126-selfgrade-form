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
          <div><ExternalLink href={this.props.pageContext.homework.gradescopeLink}>Gradescope Link</ExternalLink></div>
          <div><ExternalLink href={this.props.pageContext.homework.solutionsLink}>Solutions Link</ExternalLink></div>
          <div className={homeworkFormStyles.description}>Description</div>
          <div className={homeworkFormStyles.sectionTitle}>Self grade guide</div>
          <div>
            <form target="frame" id="selfGradeForm">
              <div className={homeworkFormStyles.sectionTitle}>Personal Info</div>
              <div className="form-group">
                <label htmlFor="inputName">Name</label>
                <input name="inputName" type="name" className="form-control" id="inputName" placeholder="Enter Name" required/>
              </div>
              <div className="form-group">
                <label htmlFor="inputEmail">Email address</label>
                <input name="inputEmail" type="email" className="form-control" id="inputEmail" aria-describedby="emailHelp" placeholder="Enter Email" required/>
                <small id="emailHelp" className="form-text text-muted">Your Berkeley Email (ex. oski@berkeley.edu)</small>
              </div>
              <div className="form-group">
                <label htmlFor="inputStudentID">Student ID</label>
                <input name="inputStudentID" className="form-control" id="inputStudentID" placeholder="Enter Student ID" required/>
              </div>
              <div className={homeworkFormStyles.sectionTitle}>Self Grade Questions</div>
              {this.props.pageContext.homework.questions.map((question) =>
                    <div>
                      <div>Question {question}</div>
                      {this.state.selfGradeOptions.map((selfGradeOption) => 
                        <div className="form-check form-check-inline">
                          <input className="form-check-input" type="radio" name={`${question}-inlineRadioOptions`} id={`${question}-${selfGradeOption}`} value={`${question}-option${selfGradeOption}`} required/>
                          <label className="form-check-label" htmlFor={`${question}-${selfGradeOption}`}>{selfGradeOption}</label>
                        </div>
                      )}
                    </div>
                )}
                <div>
                  <div className={homeworkFormStyles.sectionTitle}>Feedback (Optional)</div>
                  <div>
                  <div>Rate the difficulty of this homework</div>
                    {this.state.difficultyOptions.map((difficultyOption) => 
                      <div className="form-check form-check-inline">
                        <input name={`difficulty-${difficultyOption}`} className="form-check-input" type="radio" name={`difficulty-inlineRadioOptions`} id={`difficulty-${difficultyOption}`} value={`difficulty-option${difficultyOption}`} />
                        <label className="form-check-label" htmlFor={`difficulty-${difficultyOption}`}>{difficultyOption}</label>
                      </div>
                    )}
                  </div>
                  <div>
                    <div className="form-group">
                      <label htmlFor="inputHours">How many hours did this homework take you?</label>
                      <input name="inputHours" type="number" className="form-control" min="0" id="inputHours" placeholder="Enter # of Hours" />
                    </div>
                  </div>
                  <div>
                    
                  </div>
                  <div className="form-group">
                    <label htmlFor="feedback">Do you have any other feedback for this homework?</label>
                    <textarea name="feedback" className="form-control" id="feedback" rows="3"></textarea>
                  </div>
                </div>
              <button className="btn btn-primary" type="submit" onClick={this.convertFormToObject}>Generate</button>
            </form>
          </div>
          <iframe name="frame"></iframe>
      </div>

    )
  }
}