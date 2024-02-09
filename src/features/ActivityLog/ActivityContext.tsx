import { type PropsWithChildren, createContext, useReducer } from 'react';

import { generateId } from '../../utils/generateId';

import type { Activity, ActivityDetail, User } from './activityLog.interface';

const INITIAL_ACTIVITY_DETAIL: ActivityDetail = {
  user: {
    name: '',
    age: 0,
    contactNumber: '',
  },
  activities: [],
};

interface IActivityContext {
  state: ActivityDetail;
  dispatch: (action: any) => void;
}

const ActivityContext = createContext<IActivityContext>({
  state: INITIAL_ACTIVITY_DETAIL,
  dispatch: () => {},
});

export enum ActivityActionType {
  ADD_ACTIVITY = 'ADD_ACTIVITY',
  UPDATE_ACTIVITY = 'UPDATE_ACTIVITY',
  REMOVE_ACTIVITY = 'REMOVE_ACTIVITY',

  UPDATE_USER = 'UPDATE_USER',
}

type AddActivityPayload = Omit<Activity, 'id'>;
type UpdateActivityPayload = {
  id: Activity['id'];
  data: Partial<AddActivityPayload>;
};

type Action =
  | {
      type: ActivityActionType.ADD_ACTIVITY;
      payload: AddActivityPayload;
    }
  | {
      type: ActivityActionType.UPDATE_ACTIVITY;
      payload: UpdateActivityPayload;
    }
  | {
      type: ActivityActionType.REMOVE_ACTIVITY;
      payload: Activity['id'];
    }
  | {
      type: ActivityActionType.UPDATE_USER;
      payload: Partial<User>;
    };

const reducer = (state: ActivityDetail, action: Action): ActivityDetail => {
  switch (action.type) {
    case ActivityActionType.ADD_ACTIVITY:
      return {
        ...state,
        activities: [
          ...state.activities,
          { ...action.payload, id: generateId() },
        ],
      };
    case ActivityActionType.UPDATE_ACTIVITY:
      return {
        ...state,
        activities: state.activities.map((activity) =>
          activity.id === action.payload.id
            ? { ...activity, ...action.payload.data }
            : activity,
        ),
      };
    case ActivityActionType.REMOVE_ACTIVITY:
      return {
        ...state,
        activities: state.activities.filter(
          (activity) => activity.id !== action.payload,
        ),
      };

    case ActivityActionType.UPDATE_USER:
      return {
        ...state,
        user: {
          ...state.user,
          ...action.payload,
        },
      };
    default:
      return state;
  }
};

export const ActivityProvider = ({ children }: PropsWithChildren) => {
  const [state, dispatch] = useReducer(reducer, INITIAL_ACTIVITY_DETAIL);

  const context = {
    state,
    dispatch,
  };

  return (
    <ActivityContext.Provider value={context}>
      {children}
    </ActivityContext.Provider>
  );
};

export default ActivityContext;
