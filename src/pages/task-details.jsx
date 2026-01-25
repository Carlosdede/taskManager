import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import SideBar from "../components/Sidebar";
import {
  ArrowLeftIcon,
  ChevronRightIcon,
  LoaderIcon,
  TrashIcon,
} from "../assets/icons";
import Button from "../components/Button";
import Input from "../components/Input";
import TimeSelect from "../components/TimeSelect";

import { toast } from "sonner";
import { useForm } from "react-hook-form";

const TaskDetailsPage = () => {
  const { taskId } = useParams();
  const [task, setTask] = useState();
  const navigate = useNavigate();

  const {
    register,
    formState: { errors, isSubmitting },
    handleSubmit,
    reset,
  } = useForm();

  const handleBackClick = () => {
    navigate(-1);
  };

  useEffect(() => {
    const fecthTask = async () => {
      const response = await fetch(`http://localhost:3000/tasks/${taskId}`, {
        method: "GET",
      });
      const data = await response.json();
      setTask(data);
      reset(data);
    };
    fecthTask();
  }, [taskId, reset]);

  const handleSavedClick = async (data) => {
    const response = await fetch(`http://localhost:3000/tasks/${task.id}`, {
      method: "PATH",
      body: JSON.stringify({
        title: data.title.trim(),
        description: data.description.trim(),
        time: data.time,
      }),
    });
    if (!response.ok) {
      toast.error("Ocorreu um erro ao salvar a tarefa");
    }
    const newTask = await response.json();
    setTask(newTask);

    toast.success("Tarefa salva com sucesso!");
  };

  const handleDeleteClick = async () => {
    const response = await fetch(`http://localhost:3000/tasks/${task.id}`, {
      method: "DELETE",
    });
    if (!response.ok) {
      return toast.error("Ocorreu um erro ao deletar a tarefa");
    }
    toast.success("Tarefa deletada com sucesso!");
    navigate(-1);
  };

  return (
    <div className="flex">
      <SideBar />
      <div className="w-full space-y-6 px-8 py-16">
        <div className="flex w-full justify-between">
          <div>
            <button
              onClick={handleBackClick}
              className="mb-3 flex h-8 w-8 items-center justify-center rounded-full bg-brand-primary"
            >
              <ArrowLeftIcon />
            </button>

            <div className="flex items-center gap-1 text-xs">
              <button
                onClick={handleBackClick}
                className="cursor-pointer text-brand-text-gray"
              >
                Minhas tarefas
              </button>
              <ChevronRightIcon className="text-brand-text-gray" />
              <span className="font-semibold text-brand-primary">
                {task?.title}
              </span>
            </div>
            <h1 className="mt-2 text-xl font-semibold">{task?.title}</h1>
          </div>
          <Button
            className="h-fit self-end bg-red-500"
            onClick={handleDeleteClick}
          >
            <TrashIcon />
            Deletar tarefa
          </Button>
        </div>
        <form onSubmit={handleSubmit(handleSavedClick)}>
          <div className="space-y-6 rounded-xl bg-brand-white p-6">
            <div>
              <Input
                id="title"
                label="Título"
                defautValue={task?.title}
                {...register("title", {
                  required: "O título é obrigatório.",
                  validate: (value) => {
                    if (!value.trim()) {
                      return "O título não pode ser vazio.";
                    }
                    return true;
                  },
                })}
                errorMessage={errors?.tile?.message}
              />
            </div>
            <div>
              <TimeSelect
                defautValue={task?.time}
                {...register("time", { required: true })}
                errorMessage={errors?.time?.message}
              />
            </div>
            <div>
              <Input
                id="description"
                label="Descrição"
                defautValue={task?.description}
                {...register("description", {
                  required: "A descrição é obrigatória",
                  validate: (value) => {
                    if (!value.trim()) {
                      return "O título não pode ser vazio.";
                    }
                    return true;
                  },
                })}
                errorMessage={errors?.description?.message}
              />
            </div>
          </div>
          <div className="flex w-full justify-end gap-3">
            <Button
              color="primary"
              size="large"
              type="submit"
              disabled={isSubmitting}
            >
              {isSubmitting && <LoaderIcon className="animate-spin" />}
              Salvar
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default TaskDetailsPage;
