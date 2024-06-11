import re

# Function to extract dates from a text file
def extract_dates_from_file(file_path):
    # Open the file and read its content
    with open(file_path, 'r') as file:
        content = file.read()
    
    # Regular expression to match dates in MM/DD/YYYY format
    date_pattern = r'\b\d{1,2}/\d{1,2}/(\d{4})\b'
    
    # Find all matches in the content
    dates = re.findall(date_pattern, content)
    
    return dates

# Example usage
file_path = 'test.txt'  # Replace with your text file path
dates = extract_dates_from_file(file_path)

ages = list(map((lambda x : 2023 - int(x)), dates))

bracket_1 = []
bracket_2 = []
bracket_3 = []

def sort_age(age):
    print(age)
    if (age < 18):
        bracket_1.append(age)
    elif (age <= 25):
        bracket_2.append(age)
    else:
        bracket_3.append(age)
        
for age in ages:
    sort_age(age)

print(len(bracket_1), len(bracket_1) / len(ages), bracket_1)
print(len(bracket_2), len(bracket_2) / len(ages), bracket_2)
print(len(bracket_3) / len(ages), bracket_3)
