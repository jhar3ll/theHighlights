// @ts-check
import { initSchema } from '@aws-amplify/datastore';
import { schema } from './schema';

const TipType = {
  "REQUEST": "REQUEST",
  "DONATION": "DONATION",
  "PAYMENT": "PAYMENT"
};

const { Message, Event, Setlist, UserSongs, Tip, Song, ContactInfo } = initSchema(schema);

export {
  Message,
  Event,
  Setlist,
  UserSongs,
  Tip,
  TipType,
  Song,
  ContactInfo
};