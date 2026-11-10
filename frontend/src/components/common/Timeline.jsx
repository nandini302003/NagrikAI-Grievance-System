import React from 'react';
import { CheckCircle2, Circle, Clock } from 'lucide-react';

export const Timeline = ({ steps, currentStep }) => {
  return (
    <div className="relative">
      <div className="absolute top-0 left-4 h-full w-0.5 bg-gray-200 dark:bg-gray-700" />
      <ul className="space-y-6 relative">
        {steps.map((step, index) => {
          const isCompleted = index < currentStep;
          const isCurrent = index === currentStep;
          
          return (
            <li key={step.id || index} className="flex gap-4">
              <div className="relative z-10 flex-shrink-0 bg-white dark:bg-gray-800 rounded-full h-8 w-8 flex items-center justify-center">
                {isCompleted ? (
                  <CheckCircle2 className="h-6 w-6 text-green-500" />
                ) : isCurrent ? (
                  <Clock className="h-6 w-6 text-primary-500 animate-pulse" />
                ) : (
                  <Circle className="h-6 w-6 text-gray-300 dark:text-gray-600" />
                )}
              </div>
              <div className="flex-1 pt-1">
                <h4 className={`text-sm font-semibold ${isCompleted || isCurrent ? 'text-gray-900 dark:text-white' : 'text-gray-500 dark:text-gray-400'}`}>
                  {step.title}
                </h4>
                {step.description && (
                  <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
                    {step.description}
                  </p>
                )}
                {step.date && (
                  <p className="mt-1 text-xs text-gray-400 dark:text-gray-500">
                    {step.date}
                  </p>
                )}
              </div>
            </li>
          );
        })}
      </ul>
    </div>
  );
};
