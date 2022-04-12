import {CognitoUserPool} from 'amazon-cognito-identity-js';


 const Pooldata = {
    UserPoolId: "us-east-1_pypmBYsh8",
    ClientId: "usa573bocubjadq9kcqa2m0ni"
} 

export default new CognitoUserPool(Pooldata);