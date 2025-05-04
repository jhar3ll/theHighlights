// @ts-check
import { initSchema } from '@aws-amplify/datastore';
import { schema } from './schema';

const TipType = {
  "REQUEST": "REQUEST",
  "DONATION": "DONATION",
  "PAYMENT": "PAYMENT"
};

const { Message, Tip, ContactInfo } = initSchema(schema);

export {
  Message,
  Tip,
  TipType,
  ContactInfo
};