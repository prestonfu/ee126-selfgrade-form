import pandas as pd
import argparse
import glob
import json 

parser = argparse.ArgumentParser()
parser.add_argument('--assignment_folder', type=str, required=True, help='the name of the csv file containing the submissions for the assignment')
parser.add_argument('--output_filename', type=str, help='the name of the csv file containing the submissions for the assignment')

if __name__ == "__main__":
    args = parser.parse_args()

    output_filename = "output.xlsx"
    if args.output_filename:
        output_filename = args.output_filename
    
    output = pd.DataFrame(columns=['Feedback', 'Difficulty (10 scale)', "Hours Spent"])

    filenames = glob.glob(f"{args.assignment_folder}/*/*.json")
    for filename in filenames:
        with open(filename) as f:
            form = json.load(f)
            row = {
                "Feedback": form["feedback"] if "feedback" in form else "N/A",
                "Hours Spent": form["hours"] if "hours" in form else "N/A",
                "Difficulty (10 scale)": form["difficulty"] if "difficulty" in form else "N/A"
                }
            output = output.append(row, ignore_index=True)

    output.to_excel(output_filename, index=False)

