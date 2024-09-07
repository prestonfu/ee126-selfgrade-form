import React, { useState } from 'react';
import * as homeworkFormStyles from "../styles/SelfGradeForm.module.css"
import ExternalLink from "./externalLink"
import { AssignmentType, QuestionType } from '../types';

interface PageContextType {
  assignment: AssignmentType
}

const selfGradeOptions = [0, 2, 5, 8, 10];
  const difficultyOptions = ["1 (least difficult)", "2", "3", "4", "5", "6", "7", "8", "9", "10 (most difficult)"];

export default function SelfGradeForm({ pageContext }: { pageContext: PageContextType }) {
  const assignment = pageContext.assignment
  console.log(assignment.questions)

  const [personalInfo, setPersonalInfo] = useState({
    "name": null,
    "email": null,
    "studentID": null,
  });
  const [questions, setQuestions] = useState(assignment.questions.reduce((questionsObj, question) => ({
      ...questionsObj,
      [question.name]: {
        "grade": null,
        "comments": "",
        "points": question.points
      }
    }), {}));
  const [feedback, setFeedback] = useState({
    "difficulty": null,
    "hours": null,
    "feedback": null,
  });
  console.log(feedback)

  const [formObj, setFormObj] = useState({});
  const [submitted, setSubmitted] = useState(false);

  const updatePersonalInfo = (field: string, value: string) => {
    setPersonalInfo({...personalInfo, [field]: value});
  }
  const updateFeedback = (field: string, value: string) => {
    setFeedback({...feedback, [field]: value});
  }

  const updateQuestion = (questionName: string, value: string | number, isScore: boolean) => {
    const questionsCopy = {...questions};
    if (isScore) {
      questionsCopy[questionName].grade = value;
    } else {
      questionsCopy[questionName].comments = value;
    }
    
    setQuestions(questionsCopy);
  }

  const downloadObjectAsJson = (exportObj, exportName) => {
    var dataStr = "data:text/json;charset=utf-8," + encodeURIComponent(JSON.stringify(exportObj));
    var downloadAnchorNode = document.createElement('a');
    downloadAnchorNode.setAttribute("href",     dataStr);
    downloadAnchorNode.setAttribute("download", exportName + ".json");
    document.body.appendChild(downloadAnchorNode); // required for firefox
    downloadAnchorNode.click();
    downloadAnchorNode.remove();
  }

  const submitForm = (e) => {
    if (e.target.reportValidity()) {
      const newFormObj = {"assignment": assignment.name, ...personalInfo, "questions": questions, ...feedback}
      downloadObjectAsJson(newFormObj, assignment.pageName + "-selfgrade")
      setFormObj(newFormObj);
      setSubmitted(true);
    }
  }

  return (
      <div className={homeworkFormStyles.homeworkFormWrapper}>
        <div className={homeworkFormStyles.title}>{assignment.name} Self-Grade</div>
        <div className={homeworkFormStyles.description}>
          <div>Here is the gradescope link for this assignment: <ExternalLink href={assignment.gradescopeLink}>Gradescope Link</ExternalLink></div>
          <div>Here is the link to the solutions for this assignment: <ExternalLink href={assignment.solutionsLink}>Solutions Link</ExternalLink></div>
          <div>Self-grade your assignment submission by filling out all the fields. To learn more about self-grades, how they factor into your final assignment grade,
          and how you should go about them, check out <ExternalLink href="https://inst.eecs.berkeley.edu/~ee126/fa24/info.html#self-grading-policy">the course website</ExternalLink>.</div>
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
          <form target="frame" id="selfGradeForm" onSubmit={submitForm}>
            <div className={homeworkFormStyles.sectionTitle}>Personal Info</div>
            <div className={`form-group ${homeworkFormStyles.inputField}`}>
              <label htmlFor="inputName">Name</label>
              <input name="inputName" type="text" className="form-control" id="inputName" placeholder="Enter Name" onChange={(e) => updatePersonalInfo("name", e.target.value)} required />
            </div>
            <div className={`form-group ${homeworkFormStyles.inputField}`}>
              <label htmlFor="inputEmail">Email address</label>
              <input name="inputEmail" type="email" className="form-control" id="inputEmail" aria-describedby="emailHelp" placeholder="Enter Email" onChange={(e) => updatePersonalInfo("email", e.target.value)} required />
              <small id="emailHelp" className="form-text text-muted">Your Berkeley Email (ex. oski@berkeley.edu)</small>
            </div>
            <div className={`form-group ${homeworkFormStyles.inputField}`}>
              <label htmlFor="inputStudentID">Student ID</label>
              <input name="inputStudentID" type="text" className="form-control" id="inputStudentID" placeholder="Enter Student ID" onChange={(e) => updatePersonalInfo("studentID", e.target.value)} required />
            </div>
            <div className={homeworkFormStyles.sectionTitle}>Self Grade Questions</div>
            {assignment.questions.map((question) =>
                <>
                  <div className={homeworkFormStyles.inputField}>
                    <div>Question {question.name} <span className={homeworkFormStyles.questionPoints}>({question.points} points)</span></div>
                    {selfGradeOptions.map((selfGradeOption) => 
                      <div className={`form-check form-check-inline`}>
                        <input className="form-check-input" type="radio" name={`${question.name}-inlineRadioOptions`} id={`${question.name}-${selfGradeOption}`} value={selfGradeOption} onChange={e => updateQuestion(question.name, e.target.value, true)} required/>
                        <label className="form-check-label" htmlFor={`${question.name}-${selfGradeOption}`}>{selfGradeOption}</label>
                      </div>
                    )}
                    <div className={`form-group ${homeworkFormStyles.commentField}`}>
                      <label className={homeworkFormStyles.comment} htmlFor="input">Comment</label>
                      <input name="inputComment" type="text" className="form-control" id="inputName" placeholder="Enter comment for a 2, 5, or 8 score" onChange={e => updateQuestion(question.name, e.target.value, false)} required={questions[question.name].grade != 0 && questions[question.name].grade != 10} />
                    </div>
                  </div>
                </>
              )}
              <div>
                <div className={homeworkFormStyles.sectionTitle}>Feedback (Optional)</div>
                <div className={homeworkFormStyles.inputField}>
                  <div>Rate the difficulty of this homework</div>
                  <div>
                    {difficultyOptions.map((difficultyOption) => 
                      <div className={`form-check form-check-inline`}>
                        <input className="form-check-input" type="radio" name={`difficulty-inlineRadioOptions`} id={`difficulty-${difficultyOption}`} value={`${difficultyOption}`} onChange={(e) => updateFeedback("difficulty", e.target.value)} />
                        <label className="form-check-label" htmlFor={`difficulty-${difficultyOption}`}>{difficultyOption}</label>
                      </div>
                    )}
                  </div>
                </div>
                <div>
                  <div className={`form-group ${homeworkFormStyles.inputField}`}>
                    <label htmlFor="inputHours">How many hours did this homework take you?</label>
                    <input name="inputHours" type="number" className="form-control" min="0" id="inputHours" placeholder="Enter # of Hours" onChange={(e) => updateFeedback("hours", e.target.value)} />
                  </div>
                </div>
                <div>
                  
                </div>
                <div className={`form-group ${homeworkFormStyles.inputField}`}>
                  <label htmlFor="feedback">Do you have any other feedback for this homework?</label>
                  <textarea name="feedback" className="form-control" id="feedback" rows={3} onChange={(e) => updateFeedback("feedback", e.target.value)} ></textarea>
                </div>
              </div>
            <button id="submitButton" className={`btn btn-primary ${homeworkFormStyles.submitButton}`} type="submit">GENERATE SELF-GRADE</button>
            <label className="form-text text-muted" htmlFor="submitButton">Pressing this button will generate and download the JSON Self-Grade file (which you should then submit to the Gradescope assignment)</label>
          </form>
          {submitted ? 
            <div>
              <hr />
              <div>
                If you encounter issues with downloading the file, feel free to copy the below JSON into a JSON file and submit that to the gradescope assignment
              </div>
              <pre className={homeworkFormStyles.jsonOutput}>{JSON.stringify(formObj, null, 2)}</pre>
            </div>: <div/>}
        </div>
        <iframe name="frame"></iframe>
    </div>

  )
}
