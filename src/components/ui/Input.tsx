import React, { InputHTMLAttributes, forwardRef } from 'react';

export interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
  hint?: string;
  leftAddon?: React.ReactNode;
  rightAddon?: React.ReactNode;
  fullWidth?: boolean;
}

const Input = forwardRef<HTMLInputElement, InputProps>(
  (
    {
      label,
      error,
      hint,
      leftAddon,
      rightAddon,
      className = '',
      fullWidth = false,
      id,
      ...props
    },
    ref
  ) => {
    const inputId = id || `input-${Math.random().toString(36).substring(2, 9)}`;
    const hasError = !!error;

    const baseInputStyles = 'block rounded-md border-0 py-2 text-gray-900 shadow-sm ring-1 ring-inset placeholder:text-gray-400 focus:ring-2 focus:ring-inset sm:text-sm sm:leading-6';
    const errorStyles = hasError 
      ? 'ring-error-500 focus:ring-error-500 text-error-900' 
      : 'ring-gray-300 focus:ring-primary-500';
    const widthStyles = fullWidth ? 'w-full' : '';
    
    const addonStyles = leftAddon || rightAddon 
      ? 'px-3'
      : 'px-4';

    return (
      <div className={`${widthStyles} ${className}`}>
        {label && (
          <label
            htmlFor={inputId}
            className="block text-sm font-medium text-gray-700 mb-1"
          >
            {label}
          </label>
        )}
        
        <div className="relative">
          {leftAddon && (
            <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none text-gray-500">
              {leftAddon}
            </div>
          )}
          
          <input
            ref={ref}
            id={inputId}
            className={`${baseInputStyles} ${errorStyles} ${addonStyles} ${
              leftAddon ? 'pl-10' : ''
            } ${rightAddon ? 'pr-10' : ''} ${widthStyles}`}
            aria-invalid={hasError}
            aria-describedby={hasError ? `${inputId}-error` : hint ? `${inputId}-hint` : undefined}
            {...props}
          />
          
          {rightAddon && (
            <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none text-gray-500">
              {rightAddon}
            </div>
          )}
        </div>
        
        {hasError ? (
          <p id={`${inputId}-error`} className="mt-1 text-sm text-error-600">
            {error}
          </p>
        ) : hint ? (
          <p id={`${inputId}-hint`} className="mt-1 text-sm text-gray-500">
            {hint}
          </p>
        ) : null}
      </div>
    );
  }
);

Input.displayName = 'Input';

export default Input;