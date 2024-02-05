import type { PropsWithChildren, ChangeEvent } from 'react';
import { useContext, useState, useEffect } from 'react';

import formatTime from '../../utils/formatTime';

import ActivityContext, {
  ActivityActionType,
  ActivityProvider,
} from './ActivityContext';
import type { Activity, ActivityIdType } from './activityLog.interface';
import UserDetail from './UserDetail';

interface ActivityCardProps {
  activity: Activity;
  editing?: boolean;
  handleEditToggle: (activityId: ActivityIdType) => void;
}

const ActivityCard = (props: PropsWithChildren<ActivityCardProps>) => {
  const { activity, editing, handleEditToggle } = props;

  const { dispatch } = useContext(ActivityContext);
  const [values, setValues] = useState({
    description: activity.description,
    timeSpent: activity.timeSpent,
  });

  useEffect(() => {
    setValues({
      description: activity.description,
      timeSpent: activity.timeSpent,
    });
  }, [activity]);

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;

    setValues((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSave = () => {
    const { description, timeSpent } = values;

    if (!description || !timeSpent) {
      return;
    }

    dispatch({
      type: ActivityActionType.UPDATE_ACTIVITY,
      payload: {
        id: activity.id,
        data: {
          description,
          timeSpent: timeSpent,
        },
      },
    });
  };

  const handleCancel = () => {
    handleEditToggle(activity.id);

    setValues({
      description: activity.description,
      timeSpent: activity.timeSpent,
    });
  };

  return (
    <div className="flex justify-between">
      <input
        type="text"
        name="description"
        value={values.description || ''}
        onChange={handleChange}
        disabled={!editing}
        className="text-xl font-bold input input-bordered"
      />
      {editing ? (
        <input
          type="number"
          name="timeSpent"
          value={values.timeSpent || ''}
          onChange={handleChange}
          placeholder="Time Spent (in minutes)"
          className="text-lg input"
        />
      ) : (
        <span className="text-lg input">{formatTime(activity.timeSpent)}</span>
      )}

      <div className="flex gap-2">
        {!editing && (
          <>
            <button
              onClick={() => handleEditToggle(activity.id)}
              className="btn btn-sm btn-primary"
            >
              Edit
            </button>
            <button className="btn btn-sm btn-error">Delete</button>
          </>
        )}
        {editing && (
          <>
            <button
              onClick={() => {
                handleEditToggle(activity.id);
                handleSave();
              }}
              className="btn btn-sm btn-primary"
            >
              Save
            </button>
            <button onClick={handleCancel} className="btn btn-sm btn-error">
              Cancel
            </button>
          </>
        )}
      </div>
    </div>
  );
};

const ActivityList = () => {
  const {
    state: { activities },
    dispatch,
  } = useContext(ActivityContext);

  const [editingActivity, setEditingActivity] = useState<ActivityIdType | null>(
    null,
  );

  const handleAddActivity = () => {
    dispatch({
      type: ActivityActionType.ADD_ACTIVITY,
    });
  };

  const handleEditToggle = (activityId: ActivityIdType) => {
    setEditingActivity((prev) => (prev === activityId ? null : activityId));
  };

  return (
    <div className="">
      <header className="flex justify-between my-8">
        <h1 className="text-3xl font-bold">Activity List</h1>
        <button onClick={handleAddActivity} className="btn btn-md btn-primary">
          Add New Activity
        </button>
      </header>
      <div className="flex flex-col gap-4">
        {activities.map((activity) => (
          <ActivityCard
            key={activity.id}
            activity={activity}
            editing={editingActivity === activity.id}
            handleEditToggle={handleEditToggle}
          />
        ))}
      </div>
    </div>
  );
};

const ActivityLog = () => {
  return (
    <ActivityProvider>
      <div className="container mx-auto mt-8 flex flex-col gap-8">
        <UserDetail />
        <ActivityList />
      </div>
    </ActivityProvider>
  );
};

export default ActivityLog;
