import React from 'react';
import { useFormContext, Controller } from 'react-hook-form';
import KanbanDetailsPriority from 'src/sections/projects/taskboard-details-priority';

type TaskPriorityButtonProps = {
  name: string;
};

export default function RHFTaskPriorityButton({ name, ...other }: TaskPriorityButtonProps) {
  const { control } = useFormContext();

  return (
    <Controller
      name={name}
      control={control}
      render={({ field }) => (
        <KanbanDetailsPriority
          priority={field.value}
          onChangePriority={field.onChange}
          {...other}
        />
      )}
    />
  );
}
