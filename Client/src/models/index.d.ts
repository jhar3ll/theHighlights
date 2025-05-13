import { ModelInit, MutableModel, __modelMeta__, ManagedIdentifier } from "@aws-amplify/datastore";
// @ts-ignore
import { LazyLoading, LazyLoadingDisabled, AsyncCollection } from "@aws-amplify/datastore";

export enum TipType {
  REQUEST = "REQUEST",
  DONATION = "DONATION",
  PAYMENT = "PAYMENT"
}

type EagerSong = {
  readonly addedBy: string;
  readonly album?: string | null;
  readonly artist: string;
  readonly title: string;
}

type LazySong = {
  readonly addedBy: string;
  readonly album?: string | null;
  readonly artist: string;
  readonly title: string;
}

export declare type Song = LazyLoading extends LazyLoadingDisabled ? EagerSong : LazySong

export declare const Song: (new (init: ModelInit<Song>) => Song)

type EagerContactInfo = {
  readonly email: string;
  readonly phoneNumber: string;
  readonly name: string;
}

type LazyContactInfo = {
  readonly email: string;
  readonly phoneNumber: string;
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
  readonly Setlists?: (Setlist | null)[] | null;
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
  readonly Setlists: AsyncCollection<Setlist>;
  readonly createdAt?: string | null;
  readonly updatedAt?: string | null;
}

export declare type Event = LazyLoading extends LazyLoadingDisabled ? EagerEvent : LazyEvent

export declare const Event: (new (init: ModelInit<Event>) => Event) & {
  copyOf(source: Event, mutator: (draft: MutableModel<Event>) => MutableModel<Event> | void): Event;
}

type EagerSetlist = {
  readonly [__modelMeta__]: {
    identifier: ManagedIdentifier<Setlist, 'id'>;
    readOnlyFields: 'createdAt' | 'updatedAt';
  };
  readonly id: string;
  readonly addedBy: string;
  readonly title: string;
  readonly setNumber: number;
  readonly eventID: string;
  readonly songs: Song[];
  readonly createdAt?: string | null;
  readonly updatedAt?: string | null;
}

type LazySetlist = {
  readonly [__modelMeta__]: {
    identifier: ManagedIdentifier<Setlist, 'id'>;
    readOnlyFields: 'createdAt' | 'updatedAt';
  };
  readonly id: string;
  readonly addedBy: string;
  readonly title: string;
  readonly setNumber: number;
  readonly eventID: string;
  readonly songs: Song[];
  readonly createdAt?: string | null;
  readonly updatedAt?: string | null;
}

export declare type Setlist = LazyLoading extends LazyLoadingDisabled ? EagerSetlist : LazySetlist

export declare const Setlist: (new (init: ModelInit<Setlist>) => Setlist) & {
  copyOf(source: Setlist, mutator: (draft: MutableModel<Setlist>) => MutableModel<Setlist> | void): Setlist;
}

type EagerUserSongs = {
  readonly [__modelMeta__]: {
    identifier: ManagedIdentifier<UserSongs, 'id'>;
    readOnlyFields: 'createdAt' | 'updatedAt';
  };
  readonly id: string;
  readonly songs?: Song[] | null;
  readonly userPoolId: string;
  readonly createdAt?: string | null;
  readonly updatedAt?: string | null;
}

type LazyUserSongs = {
  readonly [__modelMeta__]: {
    identifier: ManagedIdentifier<UserSongs, 'id'>;
    readOnlyFields: 'createdAt' | 'updatedAt';
  };
  readonly id: string;
  readonly songs?: Song[] | null;
  readonly userPoolId: string;
  readonly createdAt?: string | null;
  readonly updatedAt?: string | null;
}

export declare type UserSongs = LazyLoading extends LazyLoadingDisabled ? EagerUserSongs : LazyUserSongs

export declare const UserSongs: (new (init: ModelInit<UserSongs>) => UserSongs) & {
  copyOf(source: UserSongs, mutator: (draft: MutableModel<UserSongs>) => MutableModel<UserSongs> | void): UserSongs;
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