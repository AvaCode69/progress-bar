# Progress Bar

The Progress Bar is a **Responsive** web application designed to manage and visualize progress tracking for various tasks. It provides users with a user-friendly interface to increment, decrement, and reset progress bars efficiently. The application includes an auto-increment feature that allows progress to be updated automatically, along with a stop button to pause the auto-increment functionality when needed.

## Key Features

- Dynamic Progress Tracking: Users can track the progress of different tasks using visual progress bars.
- Increment and Decrement Controls: Buttons to increase or decrease the progress value by a specified amount.
- Checkbox Selection: Users can select specific progress bars to manipulate based on their current needs.
- Automatic Progress Updates: The application allows users to set an auto-increment feature to update progress automatically,
- **Extra feature** with a **stop button** to pause the auto incrementing process.
- Local Storage Integration: Progress data is saved locally, ensuring that users’ progress is retained even after refreshing the page.

## Live Demo

https://progress-bar-ass.netlify.app

## Run application

To run the project, simply click on the index.html file. The project does not require any installation or setup as it is built using vanilla JavaScript.

## Important Note:

Ensure to run the project in a browser that does not enforce CORS (Cross-Origin Resource Sharing) restrictions. For instructions on how to create a CORS-free browser shortcut, you can refer to the additional explanation in email .

### Running tests

```sh
npm install
```

```sh
npm test
```

### Folder structure

**assets/css** : Contains CSS files, including style.css .  
**components**: Contains component definitions that manage specific functionalities of the application, such as ProgressBar.js and ProgressControl.js .  
**composable/Utils**: The definitions of the reusable components in the project.  
**data**: Contains sample data used for demonstration purposes, such as bars.js .  
**index.html**: The main HTML file for the application.  
**main.js**: The entry point of the application that initializes the app and renders components.  
**.github**: Configuration files for CI/CD pipeline. Currently, the CI/CD pipeline is not fully set up or deployed, but this folder contains the necessary configurations to run it in the future.  
**k8s**: Contains Kubernetes configuration files for deploying the application on Azure or other cloud platforms. While the deployment setup is not yet fully implemented, the configurations are provided for future use.  
**Dockerfile**: Contains instructions to build a Docker image for the project, allowing the application to be containerized and run in a Docker environment.

### Framework and Libraries

    - JavaScript
    - HTML
    - CSS
    - Jest: For testing purposes.
