import { zodResolver } from '@hookform/resolvers/zod';
import type { PropsWithChildren } from 'react';
import { useContext, useState, useEffect, useRef } from 'react';
import type { SubmitHandler } from 'react-hook-form';
import { useForm } from 'react-hook-form';

import formatTime from '../../utils/formatTime';

import ActivityContext, {
  ActivityActionType,
  ActivityProvider,
} from './ActivityContext';
import type { Activity, ActivityIdType } from './activityLog.interface';
import { activitySchema } from './activityLog.schema';
import UserDetail from './UserDetail';

interface ActivityCardProps {
  activity: Activity;
  handleEditToggle: (activityId: ActivityIdType) => void;
  handleDeleteActivity: (activityId: ActivityIdType) => void;
}

const ActivityCard = (props: PropsWithChildren<ActivityCardProps>) => {
  const { activity, handleEditToggle, handleDeleteActivity } = props;

  return (
    <div className="flex justify-between">
      <span className="text-xl">
        {activity.description || 'No Description'}
      </span>
      <span className="text-lg">{formatTime(activity.timeSpent)}</span>

      <div className="flex gap-2">
        <button
          onClick={() => handleEditToggle(activity.id)}
          className="btn btn-sm btn-primary"
        >
          Edit
        </button>
        <button
          onClick={() => handleDeleteActivity(activity.id)}
          className="btn btn-sm btn-error"
        >
          Delete
        </button>
      </div>
    </div>
  );
};

interface ActivityFormProps {
  activity: Activity;
  handleEditToggle: (activityId: ActivityIdType) => void;
}

const ActivityForm = (props: PropsWithChildren<ActivityFormProps>) => {
  const { activity, handleEditToggle } = props;

  const { dispatch } = useContext(ActivityContext);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<Activity>({
    defaultValues: activity,
    resolver: zodResolver(activitySchema),
  });

  const onSubmit: SubmitHandler<Activity> = (data) => {
    const { description, timeSpent } = data;

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
    handleEditToggle(activity.id);
  };

  const handleCancel = () => {
    handleEditToggle(activity.id);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="flex justify-between">
      <div className="form-control ">
        <input
          type="text"
          placeholder="Short description"
          className={`input ${errors.description ? 'input-error' : 'input-bordered'} `}
          {...register('description')}
        />
        {errors.description && (
          <span className="label-text-alt text-red-500">
            {errors.description.message}
          </span>
        )}
      </div>

      <div className="form-control">
        <input
          type="number"
          placeholder="Time Spent (in minutes)"
          className={`input ${errors.timeSpent ? 'input-error' : 'input-bordered'} `}
          {...register('timeSpent')}
        />
        {errors.timeSpent && (
          <span className="label-text-alt text-red-500">
            {errors.timeSpent.message}
          </span>
        )}
      </div>

      <div className="flex gap-2">
        <button type="submit" className="btn btn-sm btn-primary">
          Save
        </button>
        <button
          type="reset"
          onClick={handleCancel}
          className="btn btn-sm btn-error"
        >
          Cancel
        </button>
      </div>
    </form>
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
  const lastActivityLength = useRef(activities.length);

  useEffect(() => {
    if (activities.length > lastActivityLength.current) {
      setEditingActivity(activities[activities.length - 1].id);
      lastActivityLength.current = activities.length;
    } else {
      setEditingActivity(null);
      lastActivityLength.current = activities.length;
    }
  }, [activities.length]);

  const handleAddActivity = () => {
    dispatch({
      type: ActivityActionType.ADD_ACTIVITY,
    });
  };

  const handleEditToggle = (activityId: ActivityIdType) => {
    setEditingActivity((prev) => (prev === activityId ? null : activityId));
  };

  const handleDeleteActivity = (activityId: ActivityIdType) => {
    dispatch({
      type: ActivityActionType.REMOVE_ACTIVITY,
      payload: activityId,
    });
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
        {activities.map((activity) =>
          editingActivity === activity.id ? (
            <ActivityForm
              key={activity.id}
              activity={activity}
              handleEditToggle={handleEditToggle}
            />
          ) : (
            <ActivityCard
              key={activity.id}
              activity={activity}
              handleEditToggle={handleEditToggle}
              handleDeleteActivity={handleDeleteActivity}
            />
          ),
        )}
      </div>
    </div>
  );
};

const ActivityLog = () => {
  return (
    <ActivityProvider>
      <div className="container mx-auto px-4 mt-8 flex flex-col gap-8">
        <UserDetail />
        <ActivityList />
      </div>
    </ActivityProvider>
  );
};

export default ActivityLog;
