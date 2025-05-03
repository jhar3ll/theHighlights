// @ts-check
import { initSchema } from '@aws-amplify/datastore';
import { schema } from './schema';

const TipType = {
  "REQUEST": "REQUEST",
  "DONATION": "DONATION",
  "PAYMENT": "PAYMENT"
};

const { Contact, Tip, ContactInfo } = initSchema(schema);

export {
  Contact,
  Tip,
  TipType,
  ContactInfo
};