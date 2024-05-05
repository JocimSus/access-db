import sqlite3
from sqlite3 import Error

def create_connection(db_file):
    conn = None
    try:
        conn = sqlite3.connect(db_file)
    except Error as e:
        print(e)

    return conn

def create_table(conn, table):
    try:
        cursor = conn.cursor()
        cursor.execute(table)
    except Error as e:
        print(e)

def add(conn):
    i = 0
    name = input("please input the student's name:")
    number = input("please input the student's number:")
    classes = input("please input the student's class:")
    IPAscores = [int(x) for x in input("please input the UH1,UH2,UH3, PTS and PAS for science respectively, use commas with no space:").split(",")]
    IPSscores = [int(x) for x in input("please input the UH1,UH2,UH3, PTS and PAS for social studies respectively, use commas with no space:").split(",")]
    for x in IPAscores:
        if x > 100:
            IPAscores[i] = 100
            i += 1 
    i = 0
    for y in IPSscores:
        if y > 100:
            IPSscores[i] = 100
            i += 1 
    i = 0
    if len(IPAscores) == 5 and len(IPSscores) == 5 and name and number and classes:
        student = f"""INSERT INTO students (Name, StNumber, Classes, IPA_UH, IPS_UH, PTS_IPA, PAS_IPA, PTS_IPS, PAS_IPS)
                     VALUES('{name}',{number},'{classes}','{IPAscores[0]},{IPAscores[1]},{IPAscores[2]}','{IPSscores[0]},{IPSscores[1]},{IPSscores[2]}',{IPAscores[3]},{IPAscores[4]},{IPSscores[3]},{IPSscores[4]})"""
        cursor = conn.cursor()
        cursor.execute(student)
        conn.commit()
    else:
        print("invalid input")

def config(conn):
    i = 0
    idStudent = input("Please enter the name of the student whose data you wish to configure:")
    number = input("new number:")
    classes = input("new class:")
    IPAscores = [int(x) for x in input("please input the new UH1,UH2,UH3, PTS and PAS scores for science respectively, use commas with no space:").split(",")]
    IPSscores = [int(x) for x in input("please input the new UH1,UH2,UH3, PTS and PAS scores for social studies respectively, use commas with no space:").split(",")]
    for x in IPAscores:
        if x > 100:
            IPAscores[i] = 100
            i += 1 
    i = 0
    for y in IPSscores:
        if y > 100:
            IPSscores[i] = 100
            i += 1 
    i = 0
    if len(IPAscores) == 5 and len(IPSscores) == 5 and number and classes:
        student =  f'''UPDATE students
                        SET StNumber = {number},
                            Classes = '{classes}',
                            IPA_UH = '{IPAscores[0]},{IPAscores[1]},{IPAscores[2]}',
                            IPS_UH = '{IPSscores[0]},{IPSscores[1]},{IPSscores[2]}',
                            PTS_IPA = {IPAscores[3]},
                            PAS_IPA = {IPAscores[4]},
                            PTS_IPS = {IPSscores[3]},
                            PAS_IPS = {IPSscores[4]}
                        WHERE Name = '{idStudent}'
                        '''
        cursor = conn.cursor()
        cursor.execute(student)
        conn.commit()
    else:
        print("invalid input")

def delete(conn):
    name = input("Imput the name of the student whose data you wish to delete:")
    student = f'''DELETE FROM students 
                WHERE Name='{name}'
                '''
    cursor = conn.cursor()
    cursor.execute(student)
    conn.commit()

def query(conn):
    print("[1] Student data\n[2] Show all data")
    opt = input("Input the respective number to choose:")
    cursor = conn.cursor()
    if opt == "1":
        data = cursor.execute("SELECT * FROM students")
        header = ""
        for column in data.description:
            header = header + column[0] + "|"
        
        name = input("Imput the name of the student whose data you wish to view:")
        cursor.execute(f"SELECT * FROM students WHERE Name='{name}'")
        rows = cursor.fetchall()

        print(header)
        for row in rows:
            print(row)
    if opt == "2":
        data = cursor.execute("SELECT * FROM students")
        header = ""
        for column in data.description:
            header = header + column[0] + " | "

        rows = cursor.fetchall()

        print(header)
        for row in rows:
            print(row)

def main():
    #----------------Change the directory to your own computer's !!!
    database = r"D:\Christopher\SMACC\sqlite\menu.db"
    
    student = """ CREATE TABLE IF NOT EXISTS students (
                                        Name text PRIMARY KEY, 
                                        StNumber integer,
                                        Classes text,
                                        IPA_UH text NOT NULL,
                                        IPS_UH text NOT NULL,
                                        PTS_IPA integer NOT NULL,
                                        PAS_IPA integer NOT NULL,
                                        PTS_IPS integer NOT NULL,
                                        PAS_IPS integer NOT NULL
                                    ); """
    
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