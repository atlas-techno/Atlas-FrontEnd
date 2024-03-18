import {CognitoUserPool} from 'amazon-cognito-identity-js';


 const Pooldata = {
    UserPoolId: "us-east-1_RFFty2mN0",
    ClientId: "4bid9qrnjf0c2mrjbdbtbv7h3o"
} 

export default new CognitoUserPool(Pooldata);