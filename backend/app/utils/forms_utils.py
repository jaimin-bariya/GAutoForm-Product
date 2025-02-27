from selenium import webdriver
from selenium.webdriver.chrome.service import Service as BrowserService
from webdriver_manager.microsoft import EdgeChromiumDriverManager
from selenium.webdriver.common.by import By
from selenium.webdriver.support.ui import WebDriverWait
from selenium.webdriver.support import expected_conditions as EC

import time





def getDriver():
    driver = webdriver.Edge(service=BrowserService(EdgeChromiumDriverManager().install()))
    return driver


def open_form(driver, url):
    driver.get(url)
    time.sleep(2)



def maximizeWindow(driver):
    driver.maximize_window()





classNameFields = {
    'checkbox': 'Y6Myld',
    'multiple-choice': 'oyXaNc',
    'dropdown': 'vQES8d',
    'linear': 'PY6Xd',
    'rating-ChildDiv': 'ghIlv s6sSOd',
    'Multiple Choice Grid': 'e12QUd',
    'Time': 'PfQ8Lb',
    'textInput': 'AgroKb',
    'submit': 'l4V7wb Fxmcue'
}





def writeShortAnswer(driver, Heading, fieldClassName, Answer):
    try:

        answer_element = WebDriverWait(driver, 10).until(
            EC.element_to_be_clickable((By.XPATH, f"(//span[text()='{Heading}']/ancestor::div[contains(@class, 'z12JJ')]/following-sibling::div[contains(@class, '{fieldClassName}')]//input[@type='text'])"))
        )

        
        driver.execute_script("arguments[0].scrollIntoView({block: 'center', inline: 'center'})", answer_element)

        finalAns = str(Answer)
        answer_element.send_keys(finalAns)

    except Exception as text_err:
        print("Short element not found", text_err)


def writeLongAnswer(driver, Heading, fieldClassName, Answer):
    try:
        # Locate the text area using the provided heading and field class name
        xpath = f"(//span[text()='{Heading}']/ancestor::div[contains(@class, 'z12JJ')]/following-sibling::div[contains(@class, '{fieldClassName}')]//textarea[contains(@class, 'KHxj8b tL9Q4c')])"
        
        answer_element = WebDriverWait(driver, 10).until(
            EC.presence_of_element_located((By.XPATH, xpath))
        )

        # Scroll to the element to ensure visibility
        driver.execute_script("arguments[0].scrollIntoView({block: 'center', inline: 'center'})", answer_element)

        # Click before sending keys to ensure focus
        finalAns = str(Answer)
        answer_element.click()
        answer_element.send_keys(finalAns)

    except Exception as e:
        print(f"Error in writeLongAnswer: {e}")


def multipleChoice(driver, Heading, fieldClassName, Option):
    try:
        selectedOption = WebDriverWait(driver, 10).until(
            EC.element_to_be_clickable((By.XPATH, f"(//span[text()='{Heading}']/ancestor::div[contains(@class, 'z12JJ')]/following-sibling::div[contains(@class, '{fieldClassName}')]//span[text()='{Option}'])"))
        )

        driver.execute_script("arguments[0].scrollIntoView({block: 'center', inline: 'center'});", selectedOption)

        selectedOption.click()

    except Exception as e:
        print("NOT Found element ", e)



def checkBoxes(driver, Heading, fieldClassName, Options):
    try:
        # Locate the section containing the checkboxes
        xpath = f"(//span[text()='{Heading}']/ancestor::div[contains(@class, 'z12JJ')]/following-sibling::div[contains(@class, '{fieldClassName}')])"
        
        optionList = WebDriverWait(driver, 10).until(
            EC.element_to_be_clickable((By.XPATH, xpath))
        )

        # Scroll to ensure visibility
        driver.execute_script("arguments[0].scrollIntoView({block: 'center', inline: 'center'});", optionList)

        for opt in Options:
            # Locate the checkbox by its label text
            checkBoxLabel = optionList.find_elements(By.XPATH, f".//span[text()='{str(opt)}']")
            
            if checkBoxLabel:
                checkBoxLabel[0].click()

    except Exception as e:
        print(f"Error in checkBoxes: {e}")


def selectFromDropDown(driver, Heading, fieldClassName, option_name):

    try:
        dropdownlist = WebDriverWait(driver, 10).until(
            EC.element_to_be_clickable((By.XPATH, f"(//span[text()='{Heading}']/ancestor::div[contains(@class, 'z12JJ')]/following-sibling::div[contains(@class, '{fieldClassName}')]//div[contains(@class, 'ry3kXd')])"))
        )

       
        driver.execute_script("arguments[0].scrollIntoView({block: 'center', inline: 'center'});", dropdownlist)
        dropdownlist.click()
        
        time.sleep(1)  # Use WebDriverWait if needed for more control

        # Step 2: Locate the Option and Click it
        option = WebDriverWait(driver, 10).until(
            # EC.element_to_be_clickable((By.XPATH, f"(//span[text()='{Heading}']/ancestor::div[contains(@class, 'z12JJ')]/following-sibling::div[contains(@class, '{fieldClassName}')]//span[text()='{option_name}'])"))
            EC.element_to_be_clickable((By.XPATH, f"(//div[contains(@class, '{fieldClassName}')]//div[@role='option']//span[text()='{option_name}'])"))
        )
        driver.execute_script("arguments[0].scrollIntoView({block: 'center', inline: 'center'});", option)
        option.click()
    
    except Exception:
        print("NOT Found element ")


def selectLinearScale(driver, Heading, fieldClassName, option_name):
    try:

        Scaler = WebDriverWait(driver, 10).until(
            EC.element_to_be_clickable((By.XPATH, f"(//span[text()='{Heading}']/ancestor::div[contains(@class, 'z12JJ')]/following-sibling::div[contains(@class, '{fieldClassName}')]//label//div[text()='{option_name}'])"))
        )

        driver.execute_script("arguments[0].scrollIntoView({block: 'center', inline: 'center'});", Scaler)
        Scaler.click()

    except Exception:
        print("Element not found")


def giveRating(driver, Heading, fieldClassName, option_name):
    try:

        Scaler = WebDriverWait(driver, 10).until(
            EC.element_to_be_clickable((By.XPATH, f"(//span[text()='{Heading}']/ancestor::div[contains(@class, 'z12JJ')]/following-sibling::div//div[contains(@class, '{fieldClassName}')]//label[@data-ratingscale='{option_name}'])"))
        )

        driver.execute_script("arguments[0].scrollIntoView({block: 'center', inline: 'center'});", Scaler)
        Scaler.click()

    except Exception:
        print("Element not found")


def multipleChoiceGrid(driver, Heading, fieldClassName, option_names):

    option_iterator = iter(option_names)

    try:
        # Locate all rows based on the given XPath
        Rows = driver.find_elements(By.XPATH, f"(//span[text()='{Heading}']/ancestor::div[contains(@class, 'z12JJ')]/following-sibling::div[contains(@class, '{fieldClassName}')]//div[contains(@class, 'xOMX8e')]//div[contains(@class, 'lLfZXe fnxRtf EzyPc')])")

        # Iterate over each row, starting from the second item
        for index, row in enumerate(Rows):
            # Scroll the row into view
            driver.execute_script("arguments[0].scrollIntoView({block: 'center', inline: 'center'});", row)

            # Find all columns within this row
            column = row.find_elements(By.XPATH, ".//span//div[contains(@class, 'V4d7Ke')]")[next(option_iterator)]
            # columns = row.find_elements(By.XPATH, "//form[@id='mG61Hd']/div[2]/div[1]/div[2]/div[9]/div[1]/div[1]/div[2]/div[1]/div[1]/div[1]/div[2]/span[1]/div[4]/div[1]/div[1]/div[3]")
            # Iterate over columns in the row and click each one

            driver.execute_script("arguments[0].scrollIntoView({block: 'center', inline: 'center'});", column)
            WebDriverWait(driver, 5).until(EC.element_to_be_clickable(column))

            column.click()
            print("Clicked on column:", column.text)



            # Optional: Print row info for debugging
            print(f"Row {index} text:", row.text)

            print("\n")

        # Print total number of rows for debugging
        print("Total number of rows:", len(Rows))

    except Exception as e:
        print("Error in locating or interacting with elements:", e)


def multipleCheckboxGrid(driver, Heading, fieldClassName, option_names):
    option_iterator = list(map(lambda row: list(map(lambda x: x - 1, row)), option_names))
    option_iterator = iter(option_iterator)

    print("------------------\n Inside MultipleCheckboxGrid --------------------\n")
    try:
        # Locate all rows based on the given XPath
        Rows = driver.find_elements(By.XPATH, f"(//span[text()='{Heading}']/ancestor::div[contains(@class, 'z12JJ')]/following-sibling::div[contains(@class, '{fieldClassName}')]//div[contains(@class, 'xOMX8e')]//div[contains(@class, 'EzyPc mxSrOe')])")

        # Iterate over each row
        for index, row in enumerate(Rows):
            # Scroll the row into view
            driver.execute_script("arguments[0].scrollIntoView({block: 'center', inline: 'center'});", row)

            # Find all columns within this row
            columns = row.find_elements(By.XPATH, ".//label[contains(@class, 'V4d7Ke')]")

            # Get the options for the current row from the iterator
            try:
                options_this_row = next(option_iterator)  # This should be a list of column indexes for the current row
            except StopIteration:
                print("No more options to iterate over.")
                break

            # Click on each specified column in the current row
            for option in options_this_row:
                try:
                    column = columns[option]  # Select the specific column
                    driver.execute_script("arguments[0].scrollIntoView({block: 'center', inline: 'center'});", column)
                    WebDriverWait(driver, 5).until(EC.element_to_be_clickable(column)).click()
                    print("Clicked on column:", column.text)
                except Exception as col_err:
                    print(f"Error clicking column {option} in row {index}: {col_err}")

            # Optional: Print row info for debugging
            print(f"Row {index} text:", row.text)
            print("\n")

        # Print total number of rows for debugging
        print("Total number of rows:", len(Rows))

    except Exception as e:
        print("Error in locating or interacting with elements:", e)


def setDate(driver, Heading, Date):
    
    try:
        date_Element = WebDriverWait(driver, 10).until(
            EC.element_to_be_clickable((By.XPATH, f"(//span[text()='{Heading}']//ancestor::div[contains(@class, 'z12JJ')]/following-sibling::div//input[@type='date'])"))
        )

        driver.execute_script("arguments[0].scrollIntoView({block: 'center', inline: 'center'});", date_Element)

        date_Element.send_keys(Date)


    except Exception as date_err:
        print("Date element not found", date_err)


def setTime(driver, Heading, fieldClassName, Time):
    
    try:
        hours = WebDriverWait(driver, 10).until(
            EC.element_to_be_clickable((By.XPATH, f"(//span[text()='{Heading}']//ancestor::div[contains(@class, 'z12JJ')]/following-sibling::div[contains(@class, '{fieldClassName}')]//div[contains(@class, 'vEXS5c')][1]//input)"))
        )

        driver.execute_script("arguments[0].scrollIntoView({block: 'center', inline: 'center'});", hours)

        hours.send_keys(Time[:2])

        minutes = WebDriverWait(driver, 10).until(
            EC.element_to_be_clickable((By.XPATH, f"(//span[text()='{Heading}']//ancestor::div[contains(@class, 'z12JJ')]/following-sibling::div[contains(@class, '{fieldClassName}')]//div[contains(@class, 'vEXS5c')][2]//input)"))
        )

        minutes.send_keys(Time[2:])

    except Exception as date_err:
        print("Date element not found", date_err)



def submitFormButton(driver, fieldClassName):
    try:
        
        button = WebDriverWait(driver, 10).until(
            EC.element_to_be_clickable((By.XPATH, f"(//span[contains(@class, '{fieldClassName}')]/span[text()='Submit'])"))
        )

        button.click()

    except Exception as e:
        print(e)


def submitAnotherResponse(driver):
    try:
        
        anchor = WebDriverWait(driver, 10).until(
            EC.element_to_be_clickable((By.XPATH, f"(//a[text()='Submit another response'])"))
        )

        anchor.click()


    except Exception as e:
        print(e)