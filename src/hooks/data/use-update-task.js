import { useMutation, useQueryClient } from "@tanstack/react-query";

import { api } from "../../lib/axios";
import { taskQueriesKeys } from "../../keys/queries";
import { taskMutationKeys } from "../../keys/mutations";

export const useUpdateTask = (taskId) => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationKey: taskMutationKeys.update(taskId),
    mutationFn: async (newTask) => {
      const { data: updatedTask } = await api.patch(`/tasks/${taskId}`, {
        title: newTask.title.trim(),
        description: newTask.description.trim(),
        time: newTask.time,
      });

      queryClient.setQueryData(taskQueriesKeys.getAll(), (oldtasks) => {
        return oldtasks.map((task) => {
          if (task.id === taskId) {
            return updatedTask;
          }
          return task;
        });
      });
      queryClient.setQueryData(taskQueriesKeys.getOne(taskId));
    },
  });
};
