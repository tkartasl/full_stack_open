```mermaid
Browser -> Server: POST https://studies.cs.helsinki.fi/exampleapp/new_note

Note: Data related to POST request is sent as body.
Server makes a request to retrieve the data.
Server adds the data to notes table.
Server responds with status 302

Browser -> Server: GET https://studies.cs.helsinki.fi/exampleapp/notes
Server -> Browser: returns HTML document

Note: From HTML Code browser gets link to CSS stylesheet

Browser -> Server: GET https://studies.cs.helsinki.fi/exampleapp/main.css
Server -> Browser: returns CSS file

Note: Browser gets the script tag from HTML document

Browser -> Server: GET https://studies.cs.helsinki.fi/exampleapp/main.js
Server -> Browser: returns JavaScript file

Note: Browser starts executing the JavaScript code that makes GET request to get json file

Browser -> Server: GET https://studies.cs.helsinki.fi/exampleapp/data.json
Server -> Browser: returns JSON file

Note: JSON file has notes as rawdata
```
