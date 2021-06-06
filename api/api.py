import re
import string
import time
import json
import requests

from flask import Flask, request
from bs4 import BeautifulSoup
from selenium import webdriver

app = Flask(__name__)

@app.route('/searchByZipcode', methods=['GET', 'POST'])
def searchByZipcode():
    data = request.get_json()
    zipcode = data['zipcode']

    return scrapeData(zipcode)



@app.route('/searchByLocation', methods=['GET', 'POST'])
def searchByLocation():
    data = request.get_json()
    lat = str(data['lat'])
    lon = str(data['lon'])
    url = "https://maps.googleapis.com/maps/api/geocode/json?latlng=" + lat + "," + lon + "2&key=AIzaSyBU7JULTi8AXbDJvlnaK6iwfA2T9udJ0nc"
    response = requests.get(url)
    response_json = response.json()
    zipcode = response_json['results'][0]['address_components'][7]['long_name']
    
    print(zipcode)
    return scrapeData(zipcode)

def scrapeData(zipcode):
    url = "https://vaccines.gov/results/?zipcode=" + zipcode

    print(url)

    driver = webdriver.Chrome('./chromedriver/chromedriver.exe')
    driver.get(url)

    time.sleep(0.5)

    html = driver.page_source
    driver.quit()

    soup = BeautifulSoup(html, "html.parser")

    all_divs = soup.find('div', {'data-cy' : 'search-results-list'})
    locations = all_divs.find_all('a')

    results = []

    for location in locations:
        root = location.findChildren('div')[1]

        name = root.findChildren('div')[1]
        name = name.decode_contents()

        address = root.findChildren('div')[7]
        address = address.decode_contents()
        address = address.split('<br/>')

        distance = root.findChildren('div')[6]
        distance = distance.decode_contents()

        availability = root.findChildren('div')[0].findChildren('div')[1].findChildren('div')[0].findChildren('div')[0].find_all('p')[0]
        availability = availability.decode_contents()

        results.append({ "name": name, "address": address[0] , "cityInfo": address[1], "distance": distance, "availability": availability })

    print(json.dumps(results, indent=4))

    return json.dumps(results)

if __name__ == '__main__':
    app.run(debug=True)