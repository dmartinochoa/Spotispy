## ⚙️ Setup <br/>
  Run ```node app.js``` to start the server (port 3000 by default) or ```nodemon app.js``` to detect file changes automatically and restart the server for you<br/>

## ✔️ Requirements  <br/>
- Node.js (v14.16.1)
- Postgresql db
- Express - Install with command: ```npm install express```
- Express Sessions - Install with command: ```npm install express-session```
- Express Flash - Install with command: ```npm install express-flash```
- Postgresql for Node.js - Install with command: ```npm install mpg```
- EJS - Install with command: ```npm install ejs```
- BCrypt - ```npm install bcrypt```
- Nodemailer - ```npm install nodemailer```
- Multer - ```npm install multer```
- Cookie-parser - ```npm cookie-parser```
- Querystring - ```npm install querystring```
- Spotify web api node - ```install spotify-web-api-node```
- Morgan -  Install with command: ```npm install morgan```
- Nodemon - Intall with command: ```npm install nodemon``` 
  - To start demon ```nodemon app.js``` 
- Colors - Intall with command: ```npm install colors```

## 📁 Structure  <br/>
  ├── app.js	-	entry point <br/>
  ├── /config		-	config settings, env variables <br/>
  ├── /models		-	data access layer, business logic	 <br/>
  ├── /node_modules		-	self explanatory	 <br/>
  ├── /public	 - public files on server ```https://localhost:3000/(filepath)```	<br>
  ├── /res		-	resources  <br/> 
  ├── /routes		- api routes <br/>
  └── /views		-  yep <br/>
  
## ℹ️ PostgreSql/Node Server Info  <br/>
Use .sql file in Resource folder to import the database <br/>
[Node/Express Login System (mysql)](https://codeshack.io/basic-login-system-nodejs-express-mysql/#:~:text=Getting%20Started,js.)<br/>
[Long Node Course](https://www.youtube.com/watch?v=Oe421EPjeBE)<br/>

## ℹ️ Spotify API Info  <br/>
[Spotify API Demo Repo](https://github.com/mujibsardar/spotify_jquery_only)<br/>
[Connect to Spotify API using Only jQuery](https://youtu.be/d0FFlTeyAY8)<br/>
[Web Playback SDK](https://developer.spotify.com/documentation/web-playback-sdk/)<br/>
[Authorization](https://developer.spotify.com/documentation/general/guides/authorization-guide/)<br/>
[spotify-web-api-node explanation](https://stackoverflow.com/questions/27761493/using-spotify-web-api-node-to-generate-an-authentication-token#fromHistory)<br/>

## ℹ️ Geospatial SQL Objects  <br/>
[PostGIS](https://postgis.net/)<br/>

## ℹ️ Https Info  <br/>
Follow instructions for cert/key, run openssl.bat as admin<br/>
[Create HTTPS server](https://bit.ly/3uBw2oF)<br/>
[Openssl Download](https://slproweb.com/products/Win32OpenSSL.html)<br/>

## ℹ️ Other Info  <br/>
[File Upload](https://davidlaym.com/2018/04/subir-archivo-con-nodejs/)<br/>
[W3 Geolocation](https://www.w3schools.com/html/tryit.asp?filename=tryhtml5_geolocation_map_script)<br/>
[Nodemailer](https://blog.mailtrap.io/nodemailer-gmail/)<br/>
[Package size scanner](https://bundlephobia.com/scan)<br/>
[Build pens](https://www.youtube.com/watch?v=rtdGg4Ttb4M)<br/>
<br/>

## ℹ️ Supported Browsers For Spotify Web Playback SDK  <br/>
|OPERATING SYSTEM  |   	BROWSERS   |	STATUS   |
| ---------------- | ------------- | --------- |
| Mac/Windows/Linux  | Chrome, Firefox, IE*, Microsoft Edge |✓ Supported |
|    Android       |Chrome, Firefox	      |   ✕ Not Supported   |
|         iOS    |	 Safari, Chrome   | ✕ Not Supported   |
* IE 11 or above. Must be on Windows 8.1 or above.
***




