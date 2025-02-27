from .forms_utils import getDriver, open_form, maximizeWindow, classNameFields, writeShortAnswer, writeLongAnswer, selectFromDropDown, multipleChoiceGrid, multipleChoice, multipleCheckboxGrid, selectLinearScale, giveRating, setDate, setTime, checkBoxes, submitFormButton, submitAnotherResponse
import csv
import pandas as pd
import ast
import time

def startDemoFill(url, fields, filePath):

    driver = getDriver()
    
    
    try:
        if url != None or fields != None:
            open_form(driver=driver, url=url)
            maximizeWindow(driver=driver)




            with open(file=filePath, mode="r", newline="", encoding="utf-8") as file:

                reader = csv.reader(file)


                for i, row in enumerate(reader):


                    if i == 0:
                        continue

                    if i == 4:
                        break

                    

                    for element, field in enumerate(fields):


                        time.sleep(1)
                        
                        

                        if field['type'] == "Short Answer":
                            writeShortAnswer(driver=driver, Heading=field['heading'], fieldClassName=classNameFields['textInput'], Answer=row[element])
                            continue


                        if field['type'] == "Paragraph":
                            writeLongAnswer(driver=driver, Heading=field['heading'], fieldClassName=classNameFields['textInput'], Answer=row[element]) 
                            continue


                        if field['type'] == 'Multiple Choice':
                            multipleChoice(driver=driver, Heading=field['heading'], fieldClassName=classNameFields['multiple-choice'], Option=row[element])
                            continue
                            

                        if field['type'] == "Checkboxes":
                            optList = row[element].replace(" ", "").split(",")
                            checkBoxes(driver=driver, Heading=field['heading'], fieldClassName=classNameFields['checkbox'], Options=optList)
                            continue

                        if field['type'] == "Dropdown":
                            selectFromDropDown(driver=driver, Heading=field['heading'], fieldClassName=classNameFields['dropdown'], option_name=row[element])
                            continue

                        if field['type'] == "Linear Scale":
                            selectLinearScale(driver=driver, Heading=field['heading'], fieldClassName=classNameFields['linear'], option_name=row[element])
                            continue


                        if field['type'] == "Rating":
                            giveRating(driver=driver, Heading=field['heading'], fieldClassName=classNameFields['rating-ChildDiv'], option_name=row[element])
                            continue
                            

                        if field['type'] == "Multiple Choice Grid":
                            optList = row[element].replace(" ", "").split(",")
                            intOptList = map(int, optList)
                            multipleChoiceGrid(driver=driver, Heading=field['heading'], fieldClassName=classNameFields['Multiple Choice Grid'], option_names=intOptList)

            
                        if field['type'] == "Tick Box Grid":
                            temp = "[" + row[element] + "]"
                            options = ast.literal_eval(temp)
                            multipleCheckboxGrid(driver=driver, Heading=field['heading'], fieldClassName=classNameFields['Multiple Choice Grid'], option_names=options)
                            continue

                        if field['type'] == "Date":
                            date = str(row[element])
                            setDate(driver=driver, Heading=field['heading'], Date=date)
                            continue

                        if field['type'] == "Time":
                            currentTime = str(row[element])
                            setTime(driver=driver, Heading="Choose please", fieldClassName=classNameFields['Time'], Time=currentTime )
                            continue


                    else:
                        submitFormButton(driver=driver, fieldClassName=classNameFields['submit'])

                        time.sleep(1)

                        submitAnotherResponse(driver=driver)






        else: print("\n URL IS NONE \n")
    except Exception as e:
        print(e)
    


