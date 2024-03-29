import { CognitoIdentityProviderClient, InitiateAuthCommand, SignUpCommand, ConfirmSignUpCommand } from "@aws-sdk/client-cognito-identity-provider";
import config from "../Utils/config.json";

export const cognitoClient = new CognitoIdentityProviderClient({
    region: config.region,
  });

export const signIn = async (username, password) => {
    const params = {
        AuthFlow: "USER_PASSWORD_AUTH",
        ClientId: config.clientId,
        AuthParameters: {
        USERNAME: username,
        PASSWORD: password,
        },
    };


    try {
        const command = new InitiateAuthCommand(params);
        
        const { AuthenticationResult } = await cognitoClient.send(command);
        console.log("AuthenticationResult: " + AuthenticationResult)

        if (AuthenticationResult) {
        sessionStorage.setItem("idToken", AuthenticationResult.IdToken || '');
        sessionStorage.setItem("accessToken", AuthenticationResult.AccessToken || '');
        sessionStorage.setItem("refreshToken", AuthenticationResult.RefreshToken || '');
        return AuthenticationResult;
        }
    } catch (error) {
        console.error("Error signing in: ", error);
        throw error;
    }
};

export const signUp = async (name,email, password,access,priv) => {
    const params = {
        ClientId: config.clientId,
        Username: email,
        Password: password,
        UserAttributes: [
        {
            Name: "name",
            Value: name,
        },
        {
            Name: 'custom:Access_key',
            Value: access
        },
        {
            Name: 'custom:Private_key',
            Value: priv
        }],
    };
    try {
        const command = new SignUpCommand(params);
        const response = await cognitoClient.send(command);
        console.log("Sign up success: ", response);
        return response;
    } catch (error) {
        console.error("Error signing up: ", error);
        throw error;
    }
};

export const confirmSignUp = async (username, code) => {
    const params = {
        ClientId: config.clientId,
        Username: username,
        ConfirmationCode: code,
    };
    try {
        const command = new ConfirmSignUpCommand(params);
        await cognitoClient.send(command);
        console.log("User confirmed successfully");
        return true;
    } catch (error) {
        console.error("Error confirming sign up: ", error);
        throw error;
    }
};
