# Financial Data Filtering App
🌐 [Visit the Live Website!](https://stevensatish.github.io/Financial-Data-Filtering-App/)
(Due to free hosting limitations, it may take up to a minute for the data to be fetched)
# 🚀 Local Setup
## Prerequisites
- Python and Node.js
- Git and a code editor (such as VSCode, IntelliJ
## Installation
1. Clone the repository, then navigate into it:
```
git clone https://github.com/StevenSatish/Financial-Data-Filtering-App
cd Financial-Data-Filtering-App
```
2. Backend Setup:
  - Navigate to the backend directory, and create/start your virtual environment:
```
cd data-filtering-backend
python -m venv venv
Windows: $ venv\Scripts\activate
Mac/Linux: $ source venv/bin/activate
```
  - Install dependencies from requirements.txt:
`pip install -r requirements.txt `
3. Frontend Setup:
  - Navigate to the frontend directory `cd ../data-filtering-frontend`
  - Install dependencies:
```
npm install
```
## Configuration
1. In your data-filtering-frontend/FilterableTable.js file, change the apiUrl const in your makeAPICall function from
   `https://financial-data-filtering-backend.onrender.com/get-filtered-data?${params}`  
   to  
   `http://127.0.0.1:5000/get-filtered-data?${params}`  
2. In your data-filtering-backend/DataFetcher.py file, change the line  
  `CORS(app, origins=["https://stevensatish.github.io/*"])`  
  to just  
  `CORS(app)`  
3. Obtain a free API Key from https://site.financialmodelingprep.com/developer/docs#income-statements-financial-statements
4. In the root of your data-filtering-backend folder, create a .env file and add a field API_KEY='{your key}'
## Run your Application
1. To start your frontend, navigate to your frontend (if you are not there already) and run:
```
npm start
```
2. To start your backend, naviagate to your backend and run:
```
python Datafetcher.py
```
Your frontend should now be running at http://localhost:3000, with your backend at http://127.0.0.1:5000
Happy Coding!
