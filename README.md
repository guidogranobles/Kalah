"# Kalah game. Coding challenge"

- This project uses WildFly for development and testing. But it can be deployed in any Java EE 7 compliant application server. 
- Backend uses rest services from Java EE 7.  
- FrontEnd uses Angular2. 
	* npm install should be run from src\main\webapp folder in order to install dependencies.
	* npm start should be run from src\main\webapp folder in order to compile TypeScript files.
- This project uses Maven as build tool. In pom.xml path to WildFly home should be provided if you want auto deploy after maven install command.
  Also running maven install will generated a war file without unnecessary files like TypeScript files and node_modules folder content.
  
- The project was developed using Eclipse.