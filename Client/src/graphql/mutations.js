/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const createMessage = /* GraphQL */ `
  mutation CreateMessage(
    $input: CreateMessageInput!
    $condition: ModelMessageConditionInput
  ) {
    createMessage(input: $input, condition: $condition) {
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
export const updateMessage = /* GraphQL */ `
  mutation UpdateMessage(
    $input: UpdateMessageInput!
    $condition: ModelMessageConditionInput
  ) {
    updateMessage(input: $input, condition: $condition) {
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
export const deleteMessage = /* GraphQL */ `
  mutation DeleteMessage(
    $input: DeleteMessageInput!
    $condition: ModelMessageConditionInput
  ) {
    deleteMessage(input: $input, condition: $condition) {
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
export const createTip = /* GraphQL */ `
  mutation CreateTip(
    $input: CreateTipInput!
    $condition: ModelTipConditionInput
  ) {
    createTip(input: $input, condition: $condition) {
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
export const updateTip = /* GraphQL */ `
  mutation UpdateTip(
    $input: UpdateTipInput!
    $condition: ModelTipConditionInput
  ) {
    updateTip(input: $input, condition: $condition) {
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
export const deleteTip = /* GraphQL */ `
  mutation DeleteTip(
    $input: DeleteTipInput!
    $condition: ModelTipConditionInput
  ) {
    deleteTip(input: $input, condition: $condition) {
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
