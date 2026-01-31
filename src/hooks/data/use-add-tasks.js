import { useMutation, useQueryClient } from "@tanstack/react-query";

import { api } from "../../lib/axios";
import { taskQueriesKeys } from "../../keys/queries";
import { taskMutationKeys } from "../../keys/mutations";

export const useAddTasks = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationKey: taskMutationKeys.add(),
    mutationFn: async (task) => {
      const { data: createdTask } = await api.post("/tasks", task);

      return createdTask;
    },
    onSuccess: (createdTask) => {
      queryClient.setQueryData(taskQueriesKeys.getAll(), (oldTasks) => {
        return [...oldTasks, createdTask];
      });
    },
  });
};
