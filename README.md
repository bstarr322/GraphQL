# graphql-frontend

This is the backend for graphql frontend. This component presents a unified public interface for graphql capable clients. See the [Backends For Frontends](http://samnewman.io/patterns/architectural/bff/) pattern for an intro to the pattern.

## Development Setup

### Prerequisites
The following must be installed the 
* node.js - [How to](https://nodejs.org/en/download/package-manager/)
* git - [How to](https://git-scm.com/book/en/v2/Getting-Started-Installing-Git)

### Acquiring code and running
Run the following on your preferred command environment (command prompt, git console, any linux shell or emulator).
```
git clone git@github.com:CPDOne/graphql-frontend.git
cd graphql-frontend
npm install
npm start
```
At this point the graphql-frontend will be running accessible on *http://localhost:__[configured_port]__*. **[configured_port]** is what you have configured it to be (see _configuration_ section below) the default is ***3000**.

### Adding dependencies
To add a dependency modify the **packages.json** file then run:
`npm install`

### Running the project with existing dependencies.
If you have previously run `npm install` and have not added any dependencies, you may simply run `npm start`.

### Configuration
The default configuration can be seen in config.js.

If you wish to override a configuration locally set the appropriate environment variable of the same name **before** running the application. (See: [12 factor app config](https://12factor.net/config)).

### Json Server
The npm [json-server](https://www.npmjs.com/package/json-server) serves as the backend restful service that graphql server call to for the data.
To initiate the json-server open a seperate node.js command prompt. Then go to the directory of graphql-frontend folder and enter:

`json-server --port 9000 stub-data.json` 

Currently working paths are:

```
reference/taskTypes
reference/goalTypes
```