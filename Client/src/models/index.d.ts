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

type EagerTip = {
  readonly [__modelMeta__]: {
    identifier: ManagedIdentifier<Tip, 'id'>;
    readOnlyFields: 'createdAt' | 'updatedAt';
  };
  readonly id: string;
  readonly name: string;
  readonly amount: number;
  readonly type: TipType | keyof typeof TipType;
  readonly transactionId: string;
  readonly email?: string | null;
  readonly paymentType: string;
  readonly requestInfo?: string | null;
  readonly createdAt?: string | null;
  readonly updatedAt?: string | null;
}

type LazyTip = {
  readonly [__modelMeta__]: {
    identifier: ManagedIdentifier<Tip, 'id'>;
    readOnlyFields: 'createdAt' | 'updatedAt';
  };
  readonly id: string;
  readonly name: string;
  readonly amount: number;
  readonly type: TipType | keyof typeof TipType;
  readonly transactionId: string;
  readonly email?: string | null;
  readonly paymentType: string;
  readonly requestInfo?: string | null;
  readonly createdAt?: string | null;
  readonly updatedAt?: string | null;
}

export declare type Tip = LazyLoading extends LazyLoadingDisabled ? EagerTip : LazyTip

export declare const Tip: (new (init: ModelInit<Tip>) => Tip) & {
  copyOf(source: Tip, mutator: (draft: MutableModel<Tip>) => MutableModel<Tip> | void): Tip;
}