import { useQuery } from "@tanstack/react-query";

import { api } from "../../lib/axios";

export const useGetTasks = () => {
  return useQuery({
    queryKey: "tasks",
    queryFn: async () => {
      const { data: task } = await api.get("/tasks");
      return task;
    },
  });
};
