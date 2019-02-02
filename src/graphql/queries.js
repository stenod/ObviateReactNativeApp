// eslint-disable
// this is an auto generated file. This will be overwritten

export const getUser = `query GetUser($id: ID!) {
  getUser(id: $id) {
    id
    username
    userid
    mood {
      id
      time
      value
    }
    sleep {
      id
      time
      value
    }
    activity {
      id
      time
      value
    }
    stress {
      id
      time
      value
    }
  }
}
`;
export const listUsers = `query ListUsers(
  $filter: ModelUserFilterInput
  $limit: Int
  $nextToken: String
) {
  listUsers(filter: $filter, limit: $limit, nextToken: $nextToken) {
    items {
      id
      username
      userid
      mood {
        id
        time
        value
      }
      sleep {
        id
        time
        value
      }
      activity {
        id
        time
        value
      }
      stress {
        id
        time
        value
      }
    }
    nextToken
  }
}
`;
export const getMood = `query GetMood($id: ID!) {
  getMood(id: $id) {
    id
    time
    value
  }
}
`;
export const listMoods = `query ListMoods(
  $filter: ModelMoodFilterInput
  $limit: Int
  $nextToken: String
) {
  listMoods(filter: $filter, limit: $limit, nextToken: $nextToken) {
    items {
      id
      time
      value
    }
    nextToken
  }
}
`;
export const getSleep = `query GetSleep($id: ID!) {
  getSleep(id: $id) {
    id
    time
    value
  }
}
`;
export const listSleeps = `query ListSleeps(
  $filter: ModelSleepFilterInput
  $limit: Int
  $nextToken: String
) {
  listSleeps(filter: $filter, limit: $limit, nextToken: $nextToken) {
    items {
      id
      time
      value
    }
    nextToken
  }
}
`;
export const getActivity = `query GetActivity($id: ID!) {
  getActivity(id: $id) {
    id
    time
    value
  }
}
`;
export const listActivitys = `query ListActivitys(
  $filter: ModelActivityFilterInput
  $limit: Int
  $nextToken: String
) {
  listActivitys(filter: $filter, limit: $limit, nextToken: $nextToken) {
    items {
      id
      time
      value
    }
    nextToken
  }
}
`;
export const getStress = `query GetStress($id: ID!) {
  getStress(id: $id) {
    id
    time
    value
  }
}
`;
export const listStresss = `query ListStresss(
  $filter: ModelStressFilterInput
  $limit: Int
  $nextToken: String
) {
  listStresss(filter: $filter, limit: $limit, nextToken: $nextToken) {
    items {
      id
      time
      value
    }
    nextToken
  }
}
`;
