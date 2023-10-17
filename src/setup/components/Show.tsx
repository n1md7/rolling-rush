import React from 'react';

type Props = {
  children: React.ReactNode;
  when: boolean;
  fallback?: React.ReactNode;
};
export const Show = ({ children, when, fallback }: Props) => {
  if (when) return <>{children}</>;
  if (fallback) return <>{fallback}</>;
  return null;
};
