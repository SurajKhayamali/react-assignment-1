import { useContext, useState } from 'react';
import type { SubmitHandler } from 'react-hook-form';
import { useForm } from 'react-hook-form';

import ActivityContext, { ActivityActionType } from './ActivityContext';
import type { User } from './activityLog.interface';

interface UserDetailFormProps {
  user: User;
  handleSave: (user: User) => void;
  handleCancel: () => void;
}

const UserDetailForm = (props: UserDetailFormProps) => {
  const { user, handleSave, handleCancel } = props;

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<User>({
    defaultValues: user,
  });

  const onSubmit: SubmitHandler<User> = (data) => {
    handleSave(data);
  };

  const handleReset = () => {
    handleCancel();
  };

  return (
    <div className="">
      <h1 className="text-3xl font-bold">User Detail</h1>

      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="form-control">
          <label htmlFor="name" className="label">
            Name
          </label>
          <input
            type="text"
            placeholder="Your Name"
            className={`input ${errors.name ? 'input-error' : 'input-bordered'} `}
            {...register('name', {
              required: 'Name is required',
              minLength: {
                value: 3,
                message: 'Name should have at least 3 characters',
              },
              maxLength: {
                value: 20,
                message: 'Name should have at most 20 characters',
              },
            })}
          />
          {errors.name && (
            <span className="label-text-alt text-red-500">
              {errors.name.message}
            </span>
          )}
        </div>
        <div className="form-control">
          <label htmlFor="age" className="label">
            Age
          </label>
          <input
            type="text"
            placeholder="Your Age"
            className={`input ${errors.age ? 'input-error' : 'input-bordered'} `}
            {...register('age', {
              required: 'Age is required',
              min: {
                value: 18,
                message: 'Age should be at least 18',
              },
              max: {
                value: 100,
                message: 'Age should be at most 100',
              },
            })}
          />
          {errors.age && (
            <span className="label-text-alt text-red-500">
              {errors.age.message}
            </span>
          )}
        </div>
        <div className="form-control">
          <label htmlFor="contactNumber" className="label">
            Contact Number
          </label>
          <input
            type="text"
            placeholder="Your Contact Number"
            className={`input ${errors.contactNumber ? 'input-error' : 'input-bordered'} `}
            {...register('contactNumber', {
              required: 'Contact Number is required',
              pattern: {
                value: /^[0-9]{10,15}$/,
                message: 'Contact Number should have 10-15 digits',
              },
            })}
          />
          {errors.contactNumber && (
            <span className="label-text-alt text-red-500">
              {errors.contactNumber.message}
            </span>
          )}
        </div>

        <div className="flex gap-2 my-4">
          <>
            <button
              type="reset"
              onClick={handleReset}
              className="btn btn-sm btn-error"
            >
              Cancel
            </button>
            <button type="submit" className="btn btn-sm btn-primary">
              Save
            </button>
          </>
        </div>
      </form>
    </div>
  );
};

interface UserDetailDisplayProps {
  user: User;
  handleEditToggle: () => void;
}

const UserDetailDisplay = (props: UserDetailDisplayProps) => {
  const { user, handleEditToggle } = props;

  return (
    <div className="">
      <h1 className="text-3xl font-bold">User Detail</h1>
      <div>
        <p>Name: {user.name}</p>
        <p>Age: {user.age}</p>
        <p>Contact Number: {user.contactNumber}</p>

        <button
          onClick={handleEditToggle}
          className="btn btn-sm btn-primary my-4"
        >
          Edit
        </button>
      </div>
    </div>
  );
};

const UserDetail = () => {
  const {
    state: { user },
    dispatch,
  } = useContext(ActivityContext);

  const [editing, setEditing] = useState(false);

  const handleEditToggle = () => {
    setEditing((prev) => !prev);
  };

  const handleSave = (values: User) => {
    const { name, age, contactNumber } = values;

    if (!name || !age || !contactNumber) {
      return;
    }

    dispatch({
      type: ActivityActionType.UPDATE_USER,
      payload: {
        name,
        age: Number(age),
        contactNumber,
      },
    });

    setEditing(false);
  };

  const handleCancel = () => {
    setEditing(false);
  };

  return (
    <div className="">
      {editing ? (
        <UserDetailForm
          user={user}
          handleSave={handleSave}
          handleCancel={handleCancel}
        />
      ) : (
        <UserDetailDisplay user={user} handleEditToggle={handleEditToggle} />
      )}
    </div>
  );
};

export default UserDetail;
