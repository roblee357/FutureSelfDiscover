import requests, json
resourceURL = 'https://api.careeronestop.org/v1/jobsearch/{userId}/{keyword}/{location}/{radius}/{sortColumns}/{sortOrder}/{startRecord}/{pageSize}/{days}'
rURL = 'https://api.careeronestop.org/v1/jobsearch/'
apiToken = 'Bearer hpC99KhTcsZFp6AyxI/uJFOwkjXPy6+8IVSpPV0eKL7nnP/uWioTvtdsV2Nvg+J9KeQz6rfVFAwuD7nsTX961g=='
params = {'API Token':apiToken,'userId':'bSzANWeySBZwyEB','keyword':'developer','location':'Nashville, TN','radius':'25','sortColumns':'jobtitle','sortOrder':'ASC ','startRow':1,'pageSize':5,'days':5}
webtestURL = 'https://api.careeronestop.org/v1/jobsearch/bSzANWeySBZwyEB/developer/Nashville%2C%20TN/25/jobtitle/ASC/0/5/5?source=NLx&showFilters=false'
gapExURL = 'https://api.careeronestop.org/v1/skillgap/bSzANWeySBZwyEB/41303103/41309901/reston%2C%20va/25'
response = requests.get(gapExURL, headers={'Authorization': apiToken})
print(response)
print(response.url)
print(response.text)
with open('respons.json', 'w') as fout:
    fout.write(json.dumps(json.loads(response.text), indent=4, sort_keys=True))
