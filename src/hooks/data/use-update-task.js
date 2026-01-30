import { useMutation, useQueryClient } from "@tanstack/react-query";

export const useUpdateTask = (taskId) => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationKey: ["updateTask", taskId],
    mutationFn: async (newTask) => {
      const response = await fetch(`http://localhost:3000/tasks/${taskId}`, {
        method: "PATH",
        body: JSON.stringify({
          title: newTask.title.trim(),
          description: newTask.description.trim(),
          time: newTask.time,
        }),
      });
      if (!response.ok) {
        throw new Error();
      }
      const updatedTask = await response.json();
      queryClient.setQueryData("tasks", (oldtasks) => {
        return oldtasks.map((oldtasks) => {
          if (oldtasks.id === taskId) {
            return updatedTask;
          }
          return oldtasks;
        });
      });
    },
  });
};
