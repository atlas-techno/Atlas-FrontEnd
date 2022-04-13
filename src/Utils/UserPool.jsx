import {CognitoUserPool} from 'amazon-cognito-identity-js';


 const Pooldata = {
    UserPoolId: "us-east-1_6v2awSjTC",
    ClientId: "1132s6s4sjg8hjpb8unvpkq664"
} 

export default new CognitoUserPool(Pooldata);