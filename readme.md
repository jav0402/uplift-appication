![Uplift-logo](https://github.com/jav0402/uplift-appication/blob/main/assets/images/uplift_logo.png)

# Demo
Watch the video demo here: <https://youtu.be/A7k7BFQTdoc>

# 📚 How to get started?
## Prerequisites
- Node.js (v21.7.0, v20.12.0) and above

### 1. Clone the repo

```
git clone https://github.com/jav0402/uplift-appication.git
```

### 2. Install all dependencies

```
npm install
```

### 3. Launch the application

```
npm run full-start
# or
npm run full-start-win #for windows
```

### 4. Methods of running the application
1. Scan the QR code with the Expo Go app (Android) or the Camera app (iOS), ensure that you have the Expo Go app downloaded.
    - [Expo Go on Google Play Store](https://play.google.com/store/apps/details?id=host.exp.exponent)
    - [Expo Go on Apple App Store](https://apps.apple.com/us/app/expo-go/id982107779)
    - **Important**: Ensure that your device is connected to the same network as your computer.
2. Run the application on an emulator (IOS simulator/ Android Studio).

### 5. Running the tests
```
npm test
```

### 6. Additional useful commands
If you wish to start the application while maintaining changes made to the backend, i.e. retain new account that were created using the app, run the following command:
```
npm run full
```

If you wish to run the application from a clean slate, i.e. reset the backend to its initial state, run the following command:
```
npm run full-reset
```
or
```
npm run full-reset-win #for windows
```

Other commands include:
- `npm run build-db` - builds the database using the schema file
- `npm run clean-db` - deletes the database
- `npm run reset-backend` - resets the backend to its initial state, i.e. clean and build the database
For windows, add `-win` to the end of the command, e.g. `npm run reset-backend-win`


To run frontend or backend individually, use the following commands:
- `npm run server` - starts the backend server
- `npm run start` - starts frontend application using expo

*Refer to the package.json file for the delcaration of all commands*

# User accounts
These are the default user accounts. Additional accounts can be created using the sign-up page. However, upon resetting the backend using `npm run reset-backend` or `npm run rull-reset`, all accounts except the default accounts will be deleted.

| Email | Password |
| --- | --- |
| xavier@gmail.com | passwd |
| shad@gmail.com | pass |
| jh@gmail.com | pass |
| ethan@gmail.com | pass |
| javier@gmail.com | pass |

*Note: These are mock email account that are used for testing purposes only. We do not have ownership of any of the email accounts listed above*


# Our Workflow

1. Create a new issue on GitHub, assign yourself, add the appropriate labels, link isssue to the project.
2. Change the status of the status to 'Backlog', 'Ready', or 'In Progress' depending on the status of the issue and create a branch.
3. Head to the `main` branch and `git fetch` to get changes made to the remote repository.
4. `git status` to check if your local repository is up-to-date with the remote repository.
5. If there are changes `git merge origin/main` to merge changes from the remote repository to your local repository, resolve conflicts if any.
6. `git checkout <branch-name>` to move to the issue branch.
7. Work on the issue, make commits to the remote repository.
8. `git push` the `branch` to the remote repository.
9. Create a pull request on GitHub, add a brief description of the changes made.
10. Request a review from a team member, and update the status of the issue to 'In-Review'.
11. Make changes if necessary and merge the pull request.
12. Move the issue to 'Done' on the project board.
13. Rinse and Repeat.


