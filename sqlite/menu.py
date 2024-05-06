import sqlite3
import pandas as pd
from sqlite3 import Error
import os

#-----PREQUISITES
# 1. sqlite3 module
# 2. pandas module
# Otherwise the file might run into trouble

# Input Functions
def input_catch(prompt):
    while True: 
        u_input = input(f"{prompt}")
        if u_input:
            return u_input
        else:
            print("Invalid Input")

def check_scores(scores):
    if len(scores) == 5:
        return True
    else:
        print("Invalid Input")

# Database Functions
def create_connection(db_file):
    try:
        conn = sqlite3.connect(db_file)
    except Error as e:
        print(e)
        exit(1)
        
    return conn

def create_table(conn, table):
    try:
        cursor = conn.cursor()
        cursor.execute(table)
    except Error as e:
        print(e)
        exit(1)

def add(conn):
    name = input_catch("please input the student's name:")
    number = input_catch("please input the student's number:")
    classes = input_catch("please input the student's class:")
    while True:
        IPAscores = [int(x) for x in input_catch("please input the UH1,UH2,UH3, PTS and PAS for science respectively, use commas with no space:").split(",")]
        if check_scores(IPAscores): 
            break
    while True:
        IPSscores = [int(x) for x in input_catch("please input the UH1,UH2,UH3, PTS and PAS for social studies respectively, use commas with no space:").split(",")]
        if check_scores(IPSscores): 
            break

    for index, item in enumerate(IPAscores):
        if item > 100:
            IPAscores[index] = 100
        elif item < 0:
            IPAscores[index] = 0

    for index, item in enumerate(IPSscores):
        if item > 100:
            IPSscores[index] = 100
        elif item < 0:
            IPSscores[index] = 0
            
    student = f"""INSERT INTO students 
                (Name, StNumber, Classes, IPA_UH, IPS_UH, PTS_IPA, PAS_IPA, PTS_IPS, PAS_IPS)
                VALUES
                ('{name}',
                {number},
                '{classes}',
                '{IPAscores[0]},{IPAscores[1]},{IPAscores[2]}',
                '{IPSscores[0]},{IPSscores[1]},{IPSscores[2]}',
                {IPAscores[3]},{IPAscores[4]},{IPSscores[3]},{IPSscores[4]});
                """
    cursor = conn.cursor()
    cursor.execute(student)
    conn.commit()

def config(conn):
    idStudent = input_catch("Please enter the name of the student whose data you wish to configure:")
    number = input_catch("new number:")
    classes = input_catch("new class:")
    while True:
        IPAscores = [int(x) for x in input_catch("please input the new UH1,UH2,UH3, PTS and PAS scores for science respectively, use commas with no space:").split(",")]
        if check_scores(IPAscores):
            break
    while True:
        IPSscores = [int(x) for x in input_catch("please input the new UH1,UH2,UH3, PTS and PAS scores for social studies respectively, use commas with no space:").split(",")]
        if check_scores(IPSscores):
            break
        
    for index, item in enumerate(IPAscores):
        if item > 100:
            IPAscores[index] = 100
        elif item < 0:
            IPAscores[index] = 0

    for index, item in enumerate(IPSscores):
        if item > 100:
            IPSscores[index] = 100
        elif item < 0:
            IPSscores[index] = 0

    student =  f"""UPDATE students
                    SET StNumber = {number},
                        Classes = '{classes}',
                        IPA_UH = '{IPAscores[0]},{IPAscores[1]},{IPAscores[2]}',
                        IPS_UH = '{IPSscores[0]},{IPSscores[1]},{IPSscores[2]}',
                        PTS_IPA = {IPAscores[3]},
                        PAS_IPA = {IPAscores[4]},
                        PTS_IPS = {IPSscores[3]},
                        PAS_IPS = {IPSscores[4]}
                    WHERE Name = '{idStudent}';
                """
    cursor = conn.cursor()
    cursor.execute(student)
    conn.commit()

def delete(conn):
    print("Enlisted Students:")
    cursor = conn.cursor()
    cursor.execute("SELECT Name FROM students")
    print(cursor.fetchall())
    name = input_catch("Imput the name of the student whose data you wish to delete:")
    student = f"""DELETE FROM students 
                WHERE Name='{name}';
                """
    cursor.execute(student)
    conn.commit()

def query(conn):
    print("[1] Student data\n[2] Show all data")
    opt = input_catch("Input the respective number to choose:")
    if opt == "1":
        name = input("Please type in the name of the student whose data you wish to view:")
        data = pd.read_sql_query(f'''
                                 SELECT * FROM students WHERE Name='{name}'
                                 ''', conn, index_col="Name")
        print(data)
    if opt == "2":
        data = pd.read_sql_query('''
                                 SELECT * FROM students
                                 ''', conn, index_col="Name")
        print(data)

def main():
    cwd = os.getcwd()
    database = f"{cwd}/menu.db"
    
    student = """CREATE TABLE IF NOT EXISTS students 
                    (
                        Name text PRIMARY KEY, 
                        StNumber integer,
                        Classes text,
                        IPA_UH text NOT NULL,
                        IPS_UH text NOT NULL,
                        PTS_IPA integer NOT NULL,
                        PAS_IPA integer NOT NULL,
                        PTS_IPS integer NOT NULL,
                        PAS_IPS integer NOT NULL
                    ); 
                """
    
    conn = create_connection(database)

    if conn is not None:
        # Initialize database
        create_table(conn, student)
    else:
        print("Error whilst connecting to database! Please check if the directory within the 'database' variable is correct")

    print("------MENU------")
    print("Welcome to the menu, what would you like to do?\n[1] Add Student\n[2] Remove Student\n[3] Configure Existing Student's data\n[4] Query data")
    opt = input("(Input the respective number):")
    if opt == "1":
        add(conn)
    if opt == "2":
        delete(conn)
    if opt == "3":
        config(conn)
    if opt == "4":
        query(conn)

if __name__ == '__main__':
    main()
