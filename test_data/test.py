from time import sleep

if __name__ == '__main__':
    # The Python File must print exactly 2 statements.
    # The first is failure/success
    # The second is any more data you want to return to the user
    print('success')
    print('Some more info')
    sleep(100)
    raise Exception("something")
