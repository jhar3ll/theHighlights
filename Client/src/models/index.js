// @ts-check
import { initSchema } from '@aws-amplify/datastore';
import { schema } from './schema';

const TipType = {
  "REQUEST": "REQUEST",
  "DONATION": "DONATION",
  "PAYMENT": "PAYMENT"
};

const { Message, Event, Setlist, Song, Tip, SetlistSong, ContactInfo } = initSchema(schema);

export {
  Message,
  Event,
  Setlist,
  Song,
  Tip,
  SetlistSong,
  TipType,
  ContactInfo
};