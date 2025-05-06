/* Amplify Params - DO NOT EDIT
	API_THEHIGHLIGHTS_GRAPHQLAPIENDPOINTOUTPUT
	API_THEHIGHLIGHTS_GRAPHQLAPIIDOUTPUT
	API_THEHIGHLIGHTS_GRAPHQLAPIKEYOUTPUT
	ENV
	REGION
Amplify Params - DO NOT EDIT */

import crypto from '@aws-crypto/sha256-js';
import { defaultProvider } from '@aws-sdk/credential-provider-node';
import { SignatureV4 } from '@aws-sdk/signature-v4';
import { HttpRequest } from '@aws-sdk/protocol-http';
import { default as fetch, Request } from 'node-fetch';

const GRAPHQL_ENDPOINT = process.env.API_THEHIGHLIGHTS_GRAPHQLAPIENDPOINTOUTPUT;
const GRAPHQL_API_KEY = process.env.API_THEHIGHLIGHTS_GRAPHQLAPIKEYOUTPUT;
const AWS_REGION = process.env.AWS_REGION || 'us-east-1';
const { Sha256 } = crypto;

const query = /* GraphQL */ `
  query MyQuery($input: String) {
    listTips(filter: {_deleted: {ne: true}, transactionId: {eq: $input}}) {
      items {
        id
        transactionId
      }
    }
  }
`;

const mutation = /* GraphQL */ `
  mutation MyMutation($input: CreateTipInput!) {
    createTip(input: $input){
      amount
      email
      message
      name
      paymentType
      requestInfo
      transactionId
      type
    }
  }
`;

/**
 * @type {import('@types/aws-lambda').APIGatewayProxyHandler}
 */

 export const handler = async (event) => {
  console.log(`EVENT: ${JSON.stringify(event)}`);
  const { amount, receipt_email, metadata, payment_intent, payment_method_details } = event.detail.data.object;

  async function performFetch(queryType){
    const endpoint = new URL(GRAPHQL_ENDPOINT);

    const signer = new SignatureV4({
      credentials: defaultProvider(),
      region: AWS_REGION,
      service: 'appsync',
      sha256: Sha256
    });

    const queryBody = () => {
      if (queryType === "query"){
        return { query, variables: {input: payment_intent} };
      } else {
        const email = receipt_email === "example@example.com" ? null : receipt_email;
        const name = metadata.name;
        const paymentType = payment_method_details.type;
        const transactionId = payment_intent;
        const type = metadata.song_requested ? "REQUEST" : "DONATION";
        return { query: mutation, variables: {input: {
          amount: (Number(amount)/100).toFixed(2), 
          email, 
          message: metadata.message,
          name, 
          paymentType, 
          requestInfo: metadata.song_requested,
          transactionId, 
          type
        }}}
      }
    }

    const requestToBeSigned = new HttpRequest({
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        host: endpoint.host,
        'x-api-key': GRAPHQL_API_KEY,
      },
      hostname: endpoint.host,
      body: JSON.stringify(queryBody()),
      path: endpoint.pathname
    });

    const signed = await signer.sign(requestToBeSigned);
    const request = new Request(endpoint, signed);
    let statusCode = 200;
    let body;
    let response;

    try {
      response = await fetch(request);
      body = await response.json();
      console.log(body);
      if (body.errors) statusCode = 400;
    } catch (error) {
      statusCode = 500;
      body = {
        errors: [
          {
            message: error.message
          }
        ]
      };
    }
   if (queryType === "query") return body.data.listTips.items.length;
  }

  if (await performFetch("query") === 0){
    await performFetch("create");
  }

};