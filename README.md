# Brief description
The project aimed to create an application capable of signing documents/files with an RSA key. The RSA key is stored on a pendrive, which is protected by a PIN number. The application should be able to run under two user roles: USER A and USER B. USER B should be able to verify file signatures and encrypt/decrypt files. USER A should have all the capabilities of USER B, with the additional ability to sign documents.

After signing a document, the application not only shares the signed version but also generates and shares an XML file containing all necessary data for document verification, along with information about the user and the provided document.

Every user input from the front end is properly validated, except for file inputs. If a user submits invalid files, an error occurs on the back end, and the entire process must be repeated.

This is a full-stack application. The front end is developed using the ReactJS framework, while the back end is built with Python, using Flask and Cryptography libraries.

# Steps to run the program

Firstly, clone the repository
```
  git init
  git clone https://github.com/RZEPI/document-signing-app
```
The program needs to be run on 3 terminals
### Back-end starting (User A)
Open the console and navigate to the project's back-end directory
```
   cd Disk:\path\to\the\project\app
```
Make a venv
```
 python3 -m venv venv
```
Activate venv(Windows)
```
  venv\Scripts\activate
```
Activate venv(Linux)
```
  source venv/bin/activate  
```
Install external libraries
```
 pip install -r requirements.txt 
```
Generate keys
```
 python3 -m key_genrator.py 
```
***Please note that the file private_key.pem should be on the pendrive, so copy it to your external device***
Start the application
```
  python3 -m main.py
```
### Back-end starting (User B)
Make same steps as in the previous section, except key genration and start application with this command
```
  python3 -m main.py user_b
```
### Front-end starting
Open next console and navigate to the project's front-end direcory
```
   cd Disk:\path\to\the\project\front\front-end
```
Than execute following commands*:
```
  npm install
  npm start
```
> *Ensure you have Node.JS installed on your machine( for more information visit the link: https://nodejs.org/en )

### Using the application
The web application is shared under URL: `localhost:5000`

User can change their type on the navbar at the top of the page.
