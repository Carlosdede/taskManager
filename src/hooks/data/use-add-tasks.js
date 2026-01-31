import { useMutation, useQueryClient } from "@tanstack/react-query";

import { api } from "../../lib/axios";
import { taskQueriesKeys } from "../../keys/queries";

export const useAddTasks = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationKey: "addTask",
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
