**Sample Self-Grade Form**
The website used by students to submit their self-grades for homework assignments.

**Adding Homeworks**
- All data is taken from the `src/data/assignmentData.json` file. 
- To add a homework to self-grade form, add it to the list of homeworks contained in this file

**Homework JSON Attribute Description**
- `name`: the name of the assignment
- `gradescopeLink`: the link to the gradescope assignment for the homework self-grades
- `solutionsLink`: the link to the solutions for the homework
- `pageName`: the name of the page for the self-grade for this homework (which will be part of the URL)
- `questions`: a list of all the questions in the HW (excluding optional problems) with their point values included

**Autograder Generation**
To generate the autograder for an assignment.
1. Add the self-grade data to `src/data/assignmentData.json`
2. `cd autograder`
3. `python create-autograder.py [Assignment Name]` (e.g. `python create-autograder.py "Homework 1"`)
A temporary self-grade autograder is in `autograder/`. To make the submission graded based on completion, add the `--completion` flag.

After commiting to the repo, a github action will be run which will deploy the site.
To deploy the github site manually, pull the repo, make your changes, and run `npm run deploy`. Note: This pushes the raw computed website, which may not be what you want.
