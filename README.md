# Visual Decision-Support for Live Digital Forensics - Server

This nodeJS-web server is part of a research prototype to provide visual decision-support for Live Digital Forensic investigations. A publication is currently being prepared and will be linked here once it is available. A video of the prototype is available [here](https://youtu.be/vY-WYz3UYmw).

## Summary

The prototype (together with the respective [client component](https://github.com/bof64665/LDF_ReactFrontend)) is intended for forensic experts that need to quickly decide which specialized forensic tools they should apply during a live forensic investigation. The web application includes several visualizations to facilitate this decision-making process.

## Components
This repository includes a nodeJS web server exposing a GraphQL API which is used by the respective client of this research prototype. Through this web server, the client can retrieve the necessary information from a MongoDB and the specialized tool [SauvegardeEx](github.com/LudwigEnglbrecht/sauvegardeEX). Additionally, the repository holds a Python script which iteratively pre-processes the data from the connected MongoDB to meet the requirements of the frontend.

## Available Scripts

In the project directory, you can run:

### `npm start`

Runs the app in the development mode.\
Open [http://localhost:4000](http://localhost:4000) to view the GraphQL Playground in the browser.

The page will reload if you make edits.\
You will also see any lint errors in the console.

### `npm test`

Launches the test runner in the interactive watch mode.\
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `npm run build`

Builds the app for production to the `build` folder.\
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.\
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

### `npm run dev`

Runs the app in the development mode including a watcher, which recompiles the app after files were changed.
