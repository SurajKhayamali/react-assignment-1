import { PropsWithChildren, createContext, useState } from 'react';

interface INameContext {
  name: string;
  setName: (name: string) => void;
}

// export const NameContext = createContext<INameContext | null>(null);
export const NameContext = createContext<INameContext>({
  name: 'John',
  setName: () => {},
});

export const NameContextProvider = ({ children }: PropsWithChildren) => {
  const [name, setName] = useState('John');

  const context: INameContext = {
    name,
    setName,
  };

  return (
    <NameContext.Provider value={context}>{children}</NameContext.Provider>
  );
};
