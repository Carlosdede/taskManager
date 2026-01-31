import SunIcon from "../assets/icons/sun.svg?react";
import CloudSun from "../assets/icons/cloud-sun.svg?react";
import MoonIcon from "../assets/icons/moon.svg?react";
import TasksSeparator from "./TasksSeparator";

import TaskItem from "./TaskItem";
import { toast } from "sonner";

import { useQueryClient } from "@tanstack/react-query";
import { useGetTasks } from "../hooks/data/use-get-tasks";
import Header from "./Header";
import { taskQueriesKeys } from "../keys/queries";

const Tasks = () => {
  const { data: tasks } = useGetTasks();
  const QueryClient = useQueryClient();

  const morningTasks = tasks?.filter((task) => task.time === "morning");
  const afternoonTasks = tasks?.filter((task) => task.time === "afternoon");
  const nightTasks = tasks?.filter((task) => task.time === "night");

  const handleTaskCheckboxClick = (taskId) => {
    const newTasks = tasks?.map((task) => {
      if (task.id != taskId) {
        return task;
      }

      if (task.status === "not_started") {
        toast.success("Tarefa iniciada com sucesso!");
        return { ...task, status: "in_progress" };
      }

      if (task.status === "in_progress") {
        toast.success("Tarefa concluída com sucesso!");
        return { ...task, status: "done" };
      }

      if (task.status === "done") {
        toast.success("Tarefa reiniciada com sucesso!");
        return { ...task, status: "not_started" };
      }

      return task;
    });
    QueryClient.setQueryData(taskQueriesKeys.getAll(), newTasks);
  };

  return (
    <div className="h-full w-full space-y-6 px-8 py-16">
      <Header subtitle="Minhas Tarefas" title="Minhas Tarefas" />
      {/*LISTA DE TAREFAS*/}
      <div className="rounded-xl bg-white p-6">
        <div className="space-y-3 text-sm">
          <TasksSeparator title={"Manhã"} icon={<SunIcon />} />
          {morningTasks?.length === 0 && (
            <p className="text-sm text-brand-text-gray">
              Nenhuma tarefa cadastrada para o período da manhã.
            </p>
          )}

          {morningTasks?.map((task) => (
            <TaskItem
              key={task.id}
              task={task}
              handleCheckboxClick={handleTaskCheckboxClick}
            />
          ))}
        </div>

        <div className="my-6 space-y-3 text-sm">
          <div className="space-y-3 text-sm">
            <TasksSeparator title={"Tarde"} icon={<CloudSun />} />
            {afternoonTasks?.length === 0 && (
              <p className="text-sm text-brand-text-gray">
                Nenhuma tarefa cadastrada para o período da tarde.
              </p>
            )}

            {afternoonTasks?.map((task) => (
              <TaskItem
                key={task.id}
                task={task}
                handleCheckboxClick={handleTaskCheckboxClick}
              />
            ))}
          </div>
        </div>

        <div className="space-y-3 text-sm">
          <div className="space-y-3 text-sm">
            <TasksSeparator title={"Noite"} icon={<MoonIcon />} />
            {nightTasks?.length === 0 && (
              <p className="text-sm text-brand-text-gray">
                Nenhuma tarefa cadastrada para o período da noite.
              </p>
            )}

            {nightTasks?.map((task) => (
              <TaskItem
                key={task.id}
                task={task}
                handleCheckboxClick={handleTaskCheckboxClick}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Tasks;
