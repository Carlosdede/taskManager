import { useQuery } from "@tanstack/react-query";

import { api } from "../../lib/axios";
import { taskQueriesKeys } from "../../keys/queries";

export const useGetTasks = () => {
  return useQuery({
    queryKey: taskQueriesKeys.getAll(),
    queryFn: async () => {
      const { data: task } = await api.get("/tasks");
      return task;
    },
  });
};
