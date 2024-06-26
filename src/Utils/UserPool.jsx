
import {
    ListUsersCommand,
    CognitoIdentityProviderClient,
  } from "@aws-sdk/client-cognito-identity-provider";
import config from "./config.json"

  const formatUsers = (users) => {
    return users.map((user) => `• ${user.Username}`).join("\n");
  };
  /** snippet-start:[javascript.v3.cognito-idp.actions.ListUsers] */
  const listUsers = async () => {
    const client = new CognitoIdentityProviderClient({});
    const command = new ListUsersCommand({
      UserPoolId: config.userPoolId,
    });

    try {
        const response = await client.send(command);
        console.log(formatUsers(response.Users));
        return response.Users;
    } catch (error) {
        console.log(error);
    }

    
  };
  /** snippet-end:[javascript.v3.cognito-idp.actions.ListUsers] */

  const getCurrentUser = (email) =>{
    listUsers.filter((user) => user.Email == email)
    return listUsers[0]
  }
  
  export { listUsers, getCurrentUser };