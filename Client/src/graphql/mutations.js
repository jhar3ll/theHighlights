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
export const createEvent = /* GraphQL */ `
  mutation CreateEvent(
    $input: CreateEventInput!
    $condition: ModelEventConditionInput
  ) {
    createEvent(input: $input, condition: $condition) {
      id
      addedBy
      address
      dateTime
      title
      Setlists {
        nextToken
        startedAt
        __typename
      }
      createdAt
      updatedAt
      _version
      _deleted
      _lastChangedAt
      __typename
    }
  }
`;
export const updateEvent = /* GraphQL */ `
  mutation UpdateEvent(
    $input: UpdateEventInput!
    $condition: ModelEventConditionInput
  ) {
    updateEvent(input: $input, condition: $condition) {
      id
      addedBy
      address
      dateTime
      title
      Setlists {
        nextToken
        startedAt
        __typename
      }
      createdAt
      updatedAt
      _version
      _deleted
      _lastChangedAt
      __typename
    }
  }
`;
export const deleteEvent = /* GraphQL */ `
  mutation DeleteEvent(
    $input: DeleteEventInput!
    $condition: ModelEventConditionInput
  ) {
    deleteEvent(input: $input, condition: $condition) {
      id
      addedBy
      address
      dateTime
      title
      Setlists {
        nextToken
        startedAt
        __typename
      }
      createdAt
      updatedAt
      _version
      _deleted
      _lastChangedAt
      __typename
    }
  }
`;
export const createSetlist = /* GraphQL */ `
  mutation CreateSetlist(
    $input: CreateSetlistInput!
    $condition: ModelSetlistConditionInput
  ) {
    createSetlist(input: $input, condition: $condition) {
      id
      addedBy
      title
      setNumber
      eventID
      songs {
        addedBy
        album
        artist
        title
        __typename
      }
      createdAt
      updatedAt
      _version
      _deleted
      _lastChangedAt
      __typename
    }
  }
`;
export const updateSetlist = /* GraphQL */ `
  mutation UpdateSetlist(
    $input: UpdateSetlistInput!
    $condition: ModelSetlistConditionInput
  ) {
    updateSetlist(input: $input, condition: $condition) {
      id
      addedBy
      title
      setNumber
      eventID
      songs {
        addedBy
        album
        artist
        title
        __typename
      }
      createdAt
      updatedAt
      _version
      _deleted
      _lastChangedAt
      __typename
    }
  }
`;
export const deleteSetlist = /* GraphQL */ `
  mutation DeleteSetlist(
    $input: DeleteSetlistInput!
    $condition: ModelSetlistConditionInput
  ) {
    deleteSetlist(input: $input, condition: $condition) {
      id
      addedBy
      title
      setNumber
      eventID
      songs {
        addedBy
        album
        artist
        title
        __typename
      }
      createdAt
      updatedAt
      _version
      _deleted
      _lastChangedAt
      __typename
    }
  }
`;
export const createUserSongs = /* GraphQL */ `
  mutation CreateUserSongs(
    $input: CreateUserSongsInput!
    $condition: ModelUserSongsConditionInput
  ) {
    createUserSongs(input: $input, condition: $condition) {
      id
      songs {
        addedBy
        album
        artist
        title
        __typename
      }
      userPoolId
      createdAt
      updatedAt
      _version
      _deleted
      _lastChangedAt
      __typename
    }
  }
`;
export const updateUserSongs = /* GraphQL */ `
  mutation UpdateUserSongs(
    $input: UpdateUserSongsInput!
    $condition: ModelUserSongsConditionInput
  ) {
    updateUserSongs(input: $input, condition: $condition) {
      id
      songs {
        addedBy
        album
        artist
        title
        __typename
      }
      userPoolId
      createdAt
      updatedAt
      _version
      _deleted
      _lastChangedAt
      __typename
    }
  }
`;
export const deleteUserSongs = /* GraphQL */ `
  mutation DeleteUserSongs(
    $input: DeleteUserSongsInput!
    $condition: ModelUserSongsConditionInput
  ) {
    deleteUserSongs(input: $input, condition: $condition) {
      id
      songs {
        addedBy
        album
        artist
        title
        __typename
      }
      userPoolId
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
