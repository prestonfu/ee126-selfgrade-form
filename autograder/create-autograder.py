import argparse
import json
import shutil

def main(assignment_name, completion=False):
    with open('../src/data/assignmentData.json', 'r') as file:
        assignmentData = json.load(file)
    
    assignment = None
    for assignmentInfo in assignmentData:
        if assignmentInfo["name"] == assignment_name:
            assignment = assignmentInfo

    if assignment == None:
        print(f"Couldn't find self-grade in ../src/data/assignmentData.json")
        return
    
    assignment['completion'] = completion

    with open('autograder/assignment.json', 'w') as file:
        json.dump(assignment, file)
    
    shutil.make_archive(f'selfgrade-autograder-{assignment["pageName"]}', 'zip', 'autograder')

    print(f"Created autograder for {assignment_name}")

if __name__ == '__main__':
    parser = argparse.ArgumentParser()
    parser.add_argument('assignment', type=str, help='Name of the assignment')
    parser.add_argument('--completion', action='store_true', help='Grade by completion')
    args = parser.parse_args()

    main(args.assignment, args.completion)