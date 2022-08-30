**Sample Self-Grade Form**
The website used by students to submit their self-grades for homework assignments.

**Adding Homeworks**
- All data is taking from the `src/data/homeworkData.json` file. 
- To add a homework to self-grade form, add it to the list of homeworks contained in this file

**Homework JSON Attribute Description**
- `namme`: the name of the assignment
- `gradescopeLink`: the link to the gradescope assignment for the homework
- `solutionsLink`: the link to the solutions for the homework
- `pageName`: the name of the page for the self-grade for this homework (which will be part of the URL)
- `questions`: a list of all the questions in the HW (excluding optional problems) with their point values included

After commiting to the repo, a github action will be run which will deploy the site.
To deploy the github site manually, pull the repo, make your changes, and run `npm run deploy`