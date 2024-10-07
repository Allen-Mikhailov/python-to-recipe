const example1: string = ""
+`# Basic Python Program to demonstrate common features without classes, IO, exception handling, and string formatting

# 1. Variables and Data Types
name = "Alice"
age = 30
is_developer = True
salary = 50000.75

print("Name:", name, "Age:", age, "Developer:", is_developer, "Salary:", salary)

# 2. Lists and Loops
programming_languages = ["Python", "Java", "C++", "JavaScript"]

print("\nList of Programming Languages:")
for language in programming_languages:
    print(language)

# 3. Conditionals
print("\nChecking if Alice is an experienced developer:")
if age > 25 and is_developer:
    print(name, "is an experienced developer.")
else:
    print(name, "is not an experienced developer.")

# 4. Functions
def calculate_bonus(salary, bonus_percentage):
    bonus = salary * bonus_percentage / 100
    return bonus

bonus = calculate_bonus(salary, 10)  # 10% bonus
print("\nBonus:", bonus)

# 5. Dictionaries
developer_info = {
    "name": name,
    "age": age,
    "languages": programming_languages,
    "salary": salary
}

print("\nDeveloper Info Dictionary:")
for key in developer_info:
    print(key, ":", developer_info[key])
`

export { example1 }