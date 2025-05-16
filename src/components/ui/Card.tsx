import React, { ReactNode } from 'react';

interface CardProps {
  className?: string;
  children: ReactNode;
  withHover?: boolean;
}

export const Card: React.FC<CardProps> = ({ 
  className = '', 
  children,
  withHover = false
}) => {
  return (
    <div className={`bg-white rounded-lg shadow overflow-hidden ${withHover ? 'transition-all duration-200 hover:shadow-md hover:translate-y-[-2px]' : ''} ${className}`}>
      {children}
    </div>
  );
};

interface CardHeaderProps {
  className?: string;
  children: ReactNode;
}

export const CardHeader: React.FC<CardHeaderProps> = ({ 
  className = '', 
  children 
}) => {
  return (
    <div className={`px-6 py-4 border-b border-gray-200 ${className}`}>
      {children}
    </div>
  );
};

interface CardTitleProps {
  className?: string;
  children: ReactNode;
}

export const CardTitle: React.FC<CardTitleProps> = ({ 
  className = '', 
  children 
}) => {
  return (
    <h3 className={`text-lg font-semibold text-gray-900 ${className}`}>
      {children}
    </h3>
  );
};

interface CardContentProps {
  className?: string;
  children: ReactNode;
}

export const CardContent: React.FC<CardContentProps> = ({ 
  className = '', 
  children 
}) => {
  return (
    <div className={`px-6 py-4 ${className}`}>
      {children}
    </div>
  );
};

interface CardFooterProps {
  className?: string;
  children: ReactNode;
}

export const CardFooter: React.FC<CardFooterProps> = ({ 
  className = '', 
  children 
}) => {
  return (
    <div className={`px-6 py-4 bg-gray-50 border-t border-gray-200 ${className}`}>
      {children}
    </div>
  );
};

export default Object.assign(Card, {
  Header: CardHeader,
  Title: CardTitle,
  Content: CardContent,
  Footer: CardFooter,
});