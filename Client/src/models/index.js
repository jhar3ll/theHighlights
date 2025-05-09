// @ts-check
import { initSchema } from '@aws-amplify/datastore';
import { schema } from './schema';

const TipType = {
  "REQUEST": "REQUEST",
  "DONATION": "DONATION",
  "PAYMENT": "PAYMENT"
};

const { Message, Event, Song, Tip, ContactInfo } = initSchema(schema);

export {
  Message,
  Event,
  Song,
  Tip,
  TipType,
  ContactInfo
};