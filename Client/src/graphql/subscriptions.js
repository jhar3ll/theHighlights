/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const onCreateMessage = /* GraphQL */ `
  subscription OnCreateMessage($filter: ModelSubscriptionMessageFilterInput) {
    onCreateMessage(filter: $filter) {
      id
      title
      contactInfo {
        email
        phoneNumber
        name
        __typename
      }
      description
      createdAt
      updatedAt
      _version
      _deleted
      _lastChangedAt
      __typename
    }
  }
`;
export const onUpdateMessage = /* GraphQL */ `
  subscription OnUpdateMessage($filter: ModelSubscriptionMessageFilterInput) {
    onUpdateMessage(filter: $filter) {
      id
      title
      contactInfo {
        email
        phoneNumber
        name
        __typename
      }
      description
      createdAt
      updatedAt
      _version
      _deleted
      _lastChangedAt
      __typename
    }
  }
`;
export const onDeleteMessage = /* GraphQL */ `
  subscription OnDeleteMessage($filter: ModelSubscriptionMessageFilterInput) {
    onDeleteMessage(filter: $filter) {
      id
      title
      contactInfo {
        email
        phoneNumber
        name
        __typename
      }
      description
      createdAt
      updatedAt
      _version
      _deleted
      _lastChangedAt
      __typename
    }
  }
`;
export const onCreateTip = /* GraphQL */ `
  subscription OnCreateTip($filter: ModelSubscriptionTipFilterInput) {
    onCreateTip(filter: $filter) {
      id
      amount
      email
      message
      name
      paymentType
      requestInfo
      transactionId
      type
      createdAt
      updatedAt
      _version
      _deleted
      _lastChangedAt
      __typename
    }
  }
`;
export const onUpdateTip = /* GraphQL */ `
  subscription OnUpdateTip($filter: ModelSubscriptionTipFilterInput) {
    onUpdateTip(filter: $filter) {
      id
      amount
      email
      message
      name
      paymentType
      requestInfo
      transactionId
      type
      createdAt
      updatedAt
      _version
      _deleted
      _lastChangedAt
      __typename
    }
  }
`;
export const onDeleteTip = /* GraphQL */ `
  subscription OnDeleteTip($filter: ModelSubscriptionTipFilterInput) {
    onDeleteTip(filter: $filter) {
      id
      amount
      email
      message
      name
      paymentType
      requestInfo
      transactionId
      type
      createdAt
      updatedAt
      _version
      _deleted
      _lastChangedAt
      __typename
    }
  }
`;
