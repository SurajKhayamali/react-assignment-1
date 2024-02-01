import { useEffect, useState } from 'react';

const HooksDemo = () => {
  const [count, setCount] = useState(0);

  // useEffect(() => {
  //   document.title = `Number of click: ${count}`;
  // });
  document.title = `Number of click: ${count}`;

  return (
    <div>
      <h3>Number of click: {count}</h3>
      <button onClick={() => setCount(count + 1)}> Click to Count </button>
    </div>
  );
};

export default HooksDemo;
