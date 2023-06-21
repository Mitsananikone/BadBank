# Banking Application

This project is a banking application that allows users to create an account, log in, deposit money, withdraw money, and manage user information. The application is built using Next.js for enhanced user experience, React for the frontend, Express for the backend, and MongoDB for data storage. The application is deployed using Vercel and is available to see online.

## Features

- **Account Creation**: Users can create an account using their email address and password. Upon successful account creation, a success message is displayed. The email address or username appears at the top right corner when logged in, providing a personalized experience.

- **Authentication**: Users can log in to their accounts using their email address, password, or OAuth2 authentication. The application supports secure login functionality and ensures the privacy and confidentiality of user data. Users can also log out of their accounts.

- **Deposit**: Users can deposit money into their accounts. The application updates the account balance accordingly, ensuring accurate and real-time balance tracking. The deposited information persists across logins, providing a seamless experience for users.

- **Withdrawal**: Users can withdraw money from their accounts. Similar to the deposit functionality, the application updates the account balance based on the withdrawal amount. The withdrawal information also persists across logins, ensuring accurate balance management.

- **Database Integration**: The application utilizes MongoDB Atlas, an online database service, to store user information securely. As an additional demonstration of the database functionality, a screenshot of user information in the database will be provided as supporting evidence.

- **Admin Page**: An admin page is included, allowing authorized administrators to manage user information. Admins can delete users from the database using a password-protected interface. The password to access the admin page is "admin".

## Technologies Used

- Next.js: Utilized for enhanced user experience, server-side rendering, and efficient routing.
- React: Used to build custom components from scratch, providing a highly customized user interface.
- Express: Employed as the backend framework to handle server-side logic and API integration.
- MongoDB: Integrated MongoDB Atlas for secure and efficient storage of user information.
- Context: Utilized to share user information across the application, ensuring consistent and seamless user experience.
- Mongoose: Used for database connectivity and interaction, simplifying the integration with MongoDB.
- APIs: Leveraged the ease of API development provided by Next.js, enabling smooth communication between frontend and backend.

## Deployment

The application is deployed using Vercel, a popular hosting platform for Next.js applications. The deployment ensures accessibility and availability of the application online.

## Screenshots
<div>
  <img src="/public/images/badbank_home.JPG" alt="home" width="400" height="auto" style="display:inline-block; margin-right:10px">
  <img src="/public/images/badbank_createaccount.JPG" alt="home" width="400" height="auto" style="display:inline-block; margin-right:10px">
  <img src="/public/images/badbank_deposit.JPG" alt="home" width="400" height="auto" style="display:inline-block; margin-right:10px">
  <img src="/public/images/badbank_transaction.JPG" alt="home" width="400" height="auto" style="display:inline-block; margin-right:10px">
  <img src="/public/images/badbank_adminLogin.JPG" alt="home" width="400" height="auto" style="display:inline-block; margin-right:10px">
  <img src="/public/images/badbank_adminPage.JPG" alt="home" width="400" height="auto" style="display:inline-block; margin-right:10px">
</div>

## Usage

To run the application locally:

1. Clone the repository: `git clone <repository-url>`
2. Install dependencies: `npm install`
3. Configure the MongoDB connection in the application's configuration files.
4. Run the application: `npm run dev`
5. Access the application in your browser at `http://localhost:3000`.

## Contributors

- [Your Name]: Developer and creator of the application.

## License

[Specify the license under which the project is distributed, if applicable.]

Please note that this is a sample README.md file that can be used as a starting point. Modify and update it according to your specific project requirements and information.
