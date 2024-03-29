// import {CognitoUserPool} from 'amazon-cognito-identity-js';


//  const Pooldata = {
//     UserPoolId: "us-east-1_RFFty2mN0",
//     ClientId: "4bid9qrnjf0c2mrjbdbtbv7h3o"
// } 

// export default new CognitoUserPool(Pooldata);

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