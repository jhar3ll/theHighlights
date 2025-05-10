import { ModelInit, MutableModel, __modelMeta__, ManagedIdentifier } from "@aws-amplify/datastore";
// @ts-ignore
import { LazyLoading, LazyLoadingDisabled } from "@aws-amplify/datastore";

export enum TipType {
  REQUEST = "REQUEST",
  DONATION = "DONATION",
  PAYMENT = "PAYMENT"
}

type EagerContactInfo = {
  readonly email?: string | null;
  readonly phoneNumber?: string | null;
  readonly name: string;
}

type LazyContactInfo = {
  readonly email?: string | null;
  readonly phoneNumber?: string | null;
  readonly name: string;
}

export declare type ContactInfo = LazyLoading extends LazyLoadingDisabled ? EagerContactInfo : LazyContactInfo

export declare const ContactInfo: (new (init: ModelInit<ContactInfo>) => ContactInfo)

type EagerMessage = {
  readonly [__modelMeta__]: {
    identifier: ManagedIdentifier<Message, 'id'>;
    readOnlyFields: 'createdAt' | 'updatedAt';
  };
  readonly id: string;
  readonly title: string;
  readonly contactInfo: ContactInfo;
  readonly description: string;
  readonly createdAt?: string | null;
  readonly updatedAt?: string | null;
}

type LazyMessage = {
  readonly [__modelMeta__]: {
    identifier: ManagedIdentifier<Message, 'id'>;
    readOnlyFields: 'createdAt' | 'updatedAt';
  };
  readonly id: string;
  readonly title: string;
  readonly contactInfo: ContactInfo;
  readonly description: string;
  readonly createdAt?: string | null;
  readonly updatedAt?: string | null;
}

export declare type Message = LazyLoading extends LazyLoadingDisabled ? EagerMessage : LazyMessage

export declare const Message: (new (init: ModelInit<Message>) => Message) & {
  copyOf(source: Message, mutator: (draft: MutableModel<Message>) => MutableModel<Message> | void): Message;
}

type EagerEvent = {
  readonly [__modelMeta__]: {
    identifier: ManagedIdentifier<Event, 'id'>;
    readOnlyFields: 'createdAt' | 'updatedAt';
  };
  readonly id: string;
  readonly addedBy: string;
  readonly address?: string | null;
  readonly dateTime: string;
  readonly title: string;
  readonly createdAt?: string | null;
  readonly updatedAt?: string | null;
}

type LazyEvent = {
  readonly [__modelMeta__]: {
    identifier: ManagedIdentifier<Event, 'id'>;
    readOnlyFields: 'createdAt' | 'updatedAt';
  };
  readonly id: string;
  readonly addedBy: string;
  readonly address?: string | null;
  readonly dateTime: string;
  readonly title: string;
  readonly createdAt?: string | null;
  readonly updatedAt?: string | null;
}

export declare type Event = LazyLoading extends LazyLoadingDisabled ? EagerEvent : LazyEvent

export declare const Event: (new (init: ModelInit<Event>) => Event) & {
  copyOf(source: Event, mutator: (draft: MutableModel<Event>) => MutableModel<Event> | void): Event;
}

type EagerSong = {
  readonly [__modelMeta__]: {
    identifier: ManagedIdentifier<Song, 'id'>;
    readOnlyFields: 'createdAt' | 'updatedAt';
  };
  readonly id: string;
  readonly addedBy: string;
  readonly album: string;
  readonly artist: string;
  readonly title: string;
  readonly createdAt?: string | null;
  readonly updatedAt?: string | null;
}

type LazySong = {
  readonly [__modelMeta__]: {
    identifier: ManagedIdentifier<Song, 'id'>;
    readOnlyFields: 'createdAt' | 'updatedAt';
  };
  readonly id: string;
  readonly addedBy: string;
  readonly album: string;
  readonly artist: string;
  readonly title: string;
  readonly createdAt?: string | null;
  readonly updatedAt?: string | null;
}

export declare type Song = LazyLoading extends LazyLoadingDisabled ? EagerSong : LazySong

export declare const Song: (new (init: ModelInit<Song>) => Song) & {
  copyOf(source: Song, mutator: (draft: MutableModel<Song>) => MutableModel<Song> | void): Song;
}

type EagerTip = {
  readonly [__modelMeta__]: {
    identifier: ManagedIdentifier<Tip, 'id'>;
    readOnlyFields: 'createdAt' | 'updatedAt';
  };
  readonly id: string;
  readonly amount: number;
  readonly email?: string | null;
  readonly message?: string | null;
  readonly name: string;
  readonly paymentType: string;
  readonly requestInfo?: string | null;
  readonly transactionId: string;
  readonly type: TipType | keyof typeof TipType;
  readonly createdAt?: string | null;
  readonly updatedAt?: string | null;
}

type LazyTip = {
  readonly [__modelMeta__]: {
    identifier: ManagedIdentifier<Tip, 'id'>;
    readOnlyFields: 'createdAt' | 'updatedAt';
  };
  readonly id: string;
  readonly amount: number;
  readonly email?: string | null;
  readonly message?: string | null;
  readonly name: string;
  readonly paymentType: string;
  readonly requestInfo?: string | null;
  readonly transactionId: string;
  readonly type: TipType | keyof typeof TipType;
  readonly createdAt?: string | null;
  readonly updatedAt?: string | null;
}

export declare type Tip = LazyLoading extends LazyLoadingDisabled ? EagerTip : LazyTip

export declare const Tip: (new (init: ModelInit<Tip>) => Tip) & {
  copyOf(source: Tip, mutator: (draft: MutableModel<Tip>) => MutableModel<Tip> | void): Tip;
}