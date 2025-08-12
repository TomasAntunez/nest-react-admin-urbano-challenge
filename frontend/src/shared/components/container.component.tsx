import { FC, ReactNode } from 'react';

interface Props {
  title: string;
  children: ReactNode;
}

export const Container: FC<Props> = ({ title, children }) => {
  return (
    <div className="lg:ml-72">
      <h1 className="py-8 px-5 sm:px-10 text-3xl bg-brand-header">{title}</h1>

      <div className="mx-auto px-5 sm:px-10 pb-5">{children}</div>
    </div>
  );
};
