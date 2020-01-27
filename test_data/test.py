import logging
FORMAT = "[%(asctime)s] %(levelname)s: %(message)s"
logging.basicConfig(format=FORMAT, level=logging.INFO)
logging.basicConfig(format=FORMAT, level=logging.DEBUG)
logging.basicConfig(format=FORMAT, level=logging.WARNING)
log = logging.getLogger('sync2jira.main')

if __name__ == '__main__':
    # The Python File must print exactly 2 statements.
    # The first is failure/success
    # The second is any more data you want to return to the user
    print('success')
    print('Some more info')
    print('some more! capture this!')
    log.info('some log info')
    # raise Exception("something")
