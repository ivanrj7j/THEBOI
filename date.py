from datetime import *

def datenow():
    """
    docstring
    """
    today = date.today()

    # dd/mm/YY
    d1 = today.strftime("%d/%m/%Y")
    return d1

def datet():
    """
    Returns the date
    """
    return datetime.now()

def check_age(dated, browser):
    """
    Checks the age of user
    """
    dated = dated.split('-')
    if browser == 'firefox':
        ndate = date(int(dated[-1]), int(dated[1]), int(dated[0]))
    else:
        ndate = date(int(dated[0]), int(dated[1]), int(dated[2]))
    
    
    difference = datenow()
    difference = date.today() - ndate
    difference = int(str(difference).split()[0])
    return difference

    


if __name__ == "__main__":
    f_date = date(2006, 10, 25)
    l_date = date(2020, 11, 24)
    delta = l_date - f_date
    print(int(str(delta).split(' ')[0]))
    print(check_age("24-07-2019", 'firefox'))