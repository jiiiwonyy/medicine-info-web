import * as React from 'react';

export const CardHeader = ({
  className = '',
  ...props
}: React.HTMLAttributes<HTMLDivElement>) => (
  <div
    className={['flex items-start justify-between gap-3', className].join(' ')}
    {...props}
  />
);

export const CardTitle = ({
  className = '',
  ...props
}: React.HTMLAttributes<HTMLHeadingElement>) => (
  <h3 className={className} {...props} />
);

export const CardBody = ({
  className = '',
  ...props
}: React.HTMLAttributes<HTMLDivElement>) => (
  <div className={className} {...props} />
);

export const CardFooter = ({
  className = '',
  ...props
}: React.HTMLAttributes<HTMLDivElement>) => (
  <div
    className={['mt-4 flex items-center justify-end gap-2', className].join(
      ' ',
    )}
    {...props}
  />
);
