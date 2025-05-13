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
export const onCreateEvent = /* GraphQL */ `
  subscription OnCreateEvent($filter: ModelSubscriptionEventFilterInput) {
    onCreateEvent(filter: $filter) {
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
export const onUpdateEvent = /* GraphQL */ `
  subscription OnUpdateEvent($filter: ModelSubscriptionEventFilterInput) {
    onUpdateEvent(filter: $filter) {
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
export const onDeleteEvent = /* GraphQL */ `
  subscription OnDeleteEvent($filter: ModelSubscriptionEventFilterInput) {
    onDeleteEvent(filter: $filter) {
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
export const onCreateSetlist = /* GraphQL */ `
  subscription OnCreateSetlist($filter: ModelSubscriptionSetlistFilterInput) {
    onCreateSetlist(filter: $filter) {
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
export const onUpdateSetlist = /* GraphQL */ `
  subscription OnUpdateSetlist($filter: ModelSubscriptionSetlistFilterInput) {
    onUpdateSetlist(filter: $filter) {
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
export const onDeleteSetlist = /* GraphQL */ `
  subscription OnDeleteSetlist($filter: ModelSubscriptionSetlistFilterInput) {
    onDeleteSetlist(filter: $filter) {
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
export const onCreateUserSongs = /* GraphQL */ `
  subscription OnCreateUserSongs(
    $filter: ModelSubscriptionUserSongsFilterInput
  ) {
    onCreateUserSongs(filter: $filter) {
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
export const onUpdateUserSongs = /* GraphQL */ `
  subscription OnUpdateUserSongs(
    $filter: ModelSubscriptionUserSongsFilterInput
  ) {
    onUpdateUserSongs(filter: $filter) {
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
export const onDeleteUserSongs = /* GraphQL */ `
  subscription OnDeleteUserSongs(
    $filter: ModelSubscriptionUserSongsFilterInput
  ) {
    onDeleteUserSongs(filter: $filter) {
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
