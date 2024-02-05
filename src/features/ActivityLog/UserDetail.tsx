import { type ChangeEvent, useContext, useEffect, useState } from 'react';

import ActivityContext, { ActivityActionType } from './ActivityContext';
import type { User } from './activityLog.interface';

interface UserDetailFormProps {
  user: User;
  handleSave: (user: User) => void;
  handleCancel: () => void;
}

const UserDetailForm = (props: UserDetailFormProps) => {
  const {
    user,
    handleSave: handleSaveBase,
    handleCancel: handleCancelBase,
  } = props;

  const [values, setValues] = useState(user);

  useEffect(() => {
    setValues(user);
  }, [user]);

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;

    setValues((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSave = () => {
    handleSaveBase(values);
  };

  const handleCancel = () => {
    setValues(user);
    handleCancelBase();
  };

  return (
    <div className="">
      <h1 className="text-3xl font-bold">User Detail</h1>

      <form>
        <div className="form-control">
          <label htmlFor="name" className="label">
            Name
          </label>
          <input
            type="text"
            name="name"
            value={values.name}
            onChange={handleChange}
            placeholder="Your Name"
            className="input input-bordered"
          />
        </div>
        <div className="form-control">
          <label htmlFor="age" className="label">
            Age
          </label>
          <input
            type="text"
            name="age"
            value={values.age}
            onChange={handleChange}
            placeholder="Your Age"
            className="input input-bordered"
          />
        </div>
        <div className="form-control">
          <label htmlFor="contactNumber" className="label">
            Contact Number
          </label>
          <input
            type="text"
            name="contactNumber"
            value={values.contactNumber}
            onChange={handleChange}
            placeholder="Your Contact Number"
            className="input input-bordered"
          />
        </div>

        <div className="flex gap-2 my-4">
          <>
            <button onClick={handleCancel} className="btn btn-sm btn-error">
              Cancel
            </button>
            <button onClick={handleSave} className="btn btn-sm btn-primary">
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