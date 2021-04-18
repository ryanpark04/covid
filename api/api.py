import re
import string
import time
import json

from flask import Flask, request
from bs4 import BeautifulSoup
from selenium import webdriver

app = Flask(__name__)

@app.route('/search', methods=['GET', 'POST'])
def search():
    url = "https://vaccinefinder.org/results/?zipcode=90210"

    driver = webdriver.Chrome('./chromedriver/chromedriver.exe')
    driver.get(url)

    time.sleep(0.1)

    html = driver.page_source
    driver.quit()

    soup = BeautifulSoup(html, "html.parser")

    all_divs = soup.find('div', {'data-cy' : 'search-results-list'})
    locations = all_divs.find_all('a')

    results = []

    for location in locations:
        root = location.findChildren('div')[1]
        name = root.findChildren('div')[0].findChildren('div')[0]
        name = name.decode_contents()

        address = root.findChildren('div')[0].findChildren('div')[1]
        address = address.decode_contents()
        address = address.split('<span style="padding: 0px 0.25rem;"> • </span>')

        distance = root.findChildren('div')[3].findChildren('div')[0]
        distance = distance.decode_contents()

        availability = root.findChildren('div')[3].findChildren('div')[1].find('p')
        availability = availability.decode_contents()

        results.append({ "name": name, "address": address[0], "cityInfo": address[1], "distance": distance, "availibility": availability })

    return json.dumps(results)

if __name__ == '__main__':
    app.run(debug=True)