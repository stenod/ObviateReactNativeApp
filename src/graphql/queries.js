// eslint-disable
// this is an auto generated file. This will be overwritten

export const getMood = `query GetMood($id: ID!) {
  getMood(id: $id) {
    id
    user
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
      user
      value
    }
    nextToken
  }
}
`;
export const getSleep = `query GetSleep($id: ID!) {
  getSleep(id: $id) {
    id
    user
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
      user
      value
    }
    nextToken
  }
}
`;
export const getActivity = `query GetActivity($id: ID!) {
  getActivity(id: $id) {
    id
    user
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
      user
      value
    }
    nextToken
  }
}
`;
export const getStress = `query GetStress($id: ID!) {
  getStress(id: $id) {
    id
    user
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
      user
      value
    }
    nextToken
  }
}
`;
