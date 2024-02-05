import { Link } from 'react-router-dom';

const Navbar = () => {
  return (
    <nav className="navbar bg-gray-700 flex justify-center gap-4">
      <Link to="/">Home</Link>
      <div className="tooltip tooltip-bottom" data-tip="Day 2">
        <Link to="/timer">Timer</Link>
      </div>
      <div className="tooltip tooltip-bottom" data-tip="Day 3">
        <Link to="/weather">Weather</Link>
      </div>
      <div className="tooltip tooltip-bottom" data-tip="Day 4">
        <Link to="/activityLog">Activity Log</Link>
      </div>
    </nav>
  );
};

export default Navbar;
