// eslint-disable
// this is an auto generated file. This will be overwritten

export const createUser = `mutation CreateUser($input: CreateUserInput!) {
  createUser(input: $input) {
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
export const updateUser = `mutation UpdateUser($input: UpdateUserInput!) {
  updateUser(input: $input) {
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
export const deleteUser = `mutation DeleteUser($input: DeleteUserInput!) {
  deleteUser(input: $input) {
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
export const createMood = `mutation CreateMood($input: CreateMoodInput!) {
  createMood(input: $input) {
    id
    time
    value
  }
}
`;
export const updateMood = `mutation UpdateMood($input: UpdateMoodInput!) {
  updateMood(input: $input) {
    id
    time
    value
  }
}
`;
export const deleteMood = `mutation DeleteMood($input: DeleteMoodInput!) {
  deleteMood(input: $input) {
    id
    time
    value
  }
}
`;
export const createSleep = `mutation CreateSleep($input: CreateSleepInput!) {
  createSleep(input: $input) {
    id
    time
    value
  }
}
`;
export const updateSleep = `mutation UpdateSleep($input: UpdateSleepInput!) {
  updateSleep(input: $input) {
    id
    time
    value
  }
}
`;
export const deleteSleep = `mutation DeleteSleep($input: DeleteSleepInput!) {
  deleteSleep(input: $input) {
    id
    time
    value
  }
}
`;
export const createActivity = `mutation CreateActivity($input: CreateActivityInput!) {
  createActivity(input: $input) {
    id
    time
    value
  }
}
`;
export const updateActivity = `mutation UpdateActivity($input: UpdateActivityInput!) {
  updateActivity(input: $input) {
    id
    time
    value
  }
}
`;
export const deleteActivity = `mutation DeleteActivity($input: DeleteActivityInput!) {
  deleteActivity(input: $input) {
    id
    time
    value
  }
}
`;
export const createStress = `mutation CreateStress($input: CreateStressInput!) {
  createStress(input: $input) {
    id
    time
    value
  }
}
`;
export const updateStress = `mutation UpdateStress($input: UpdateStressInput!) {
  updateStress(input: $input) {
    id
    time
    value
  }
}
`;
export const deleteStress = `mutation DeleteStress($input: DeleteStressInput!) {
  deleteStress(input: $input) {
    id
    time
    value
  }
}
`;
