// @ts-check
import { initSchema } from '@aws-amplify/datastore';
import { schema } from './schema';

const TipType = {
  "REQUEST": "REQUEST",
  "DONATION": "DONATION",
  "PAYMENT": "PAYMENT"
};

const { Message, Song, Tip, ContactInfo } = initSchema(schema);

export {
  Message,
  Song,
  Tip,
  TipType,
  ContactInfo
};