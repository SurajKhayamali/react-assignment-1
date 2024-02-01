import { useContext } from 'react';
import { NameContext } from '../../contexts/NameContext';

const GrandChild = () => {
  const { name, setName } = useContext(NameContext);
  return (
    <>
      <p>GrandChild name is: {name}</p>
      <button onClick={() => setName('Alex')}>Change Name from Child</button>
    </>
  );
};

const Child = () => {
  return <GrandChild />;
};

const ContextDemo = () => {
  // console.log('Context', useContext(NameContext));
  // const { setName } = useContext(NameContext)!;
  const { setName } = useContext(NameContext);
  return (
    <>
      <p>Parent</p>
      <button onClick={() => setName('Not Alex')}>
        Change Name from Parent
      </button>
      <Child />
    </>
  );
};

export default ContextDemo;
