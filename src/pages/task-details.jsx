import { useEffect, useState, useRef } from "react";
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
import { v4 } from "uuid";
import { toast } from "sonner";

const TaskDetailsPage = () => {
  const { taskId } = useParams();
  const [task, setTask] = useState();
  const navigate = useNavigate();
  const [error, setError] = useState(false);
  const [saveIsLoading, setSaveIsLoading] = useState(false);

  const titleRef = useRef();
  const timeRef = useRef();
  const descriptionRef = useRef();

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
    };
    fecthTask();
  }, [taskId]);

  const handleSavedClick = async () => {
    setSaveIsLoading(true);
    const newErrors = [];
    const title = titleRef.current.value;
    const description = descriptionRef.current.value;
    const time = timeRef.current.value;

    if (!title.trim()) {
      newErrors.push({
        inputName: "title",
        message: "O título é obrigatório",
      });
    }

    if (!description.trim()) {
      newErrors.push({
        inputName: "description",
        message: "A descrição é obrigatório",
      });
    }

    setError(newErrors);

    if (newErrors.length > 0) {
      return setSaveIsLoading(false);
    }
    const task = {
      id: v4(),
      title,
      description,
      time,
      status: "not_started",
    };

    const response = await fetch(`http://localhost:3000/tasks/${task.id}`, {
      method: "PATH",
      body: JSON.stringify({
        title,
        description,
        time,
      }),
    });
    if (!response.ok) {
      toast.error("Ocorreu um erro ao salvar a tarefa");
      return setSaveIsLoading(false);
    }
    const newTask = await response.json();
    setTask(newTask);

    setSaveIsLoading(false);
    toast.success("Tarefa salva com sucesso!");
  };

  const titleError = error.find((error) => error.inputName === "title");
  const descriptionError = error.find(
    (error) => error.inputName === "description"
  );
  //const timeError = error.find((error) => error.inputName === "time");
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
          <Button className="h-fit self-end bg-red-500">
            <TrashIcon />
            Deletar tarefa
          </Button>
        </div>

        <div className="space-y-6 rounded-xl bg-brand-white p-6">
          <div>
            <Input
              id="title"
              label="Título"
              defautValue={task?.title}
              errorMessage={titleError?.message}
              ref={titleRef}
            />
          </div>
          <div>
            <TimeSelect
              defautValue={task?.time}
              // errorMessage={timeError?.message}
              ref={descriptionRef}
            />
          </div>
          <div>
            <Input
              id="description"
              label="Descrição"
              defautValue={task?.description}
              errorMessage={descriptionError?.message}
              ref={descriptionRef}
            />
          </div>
        </div>
        <div className="flex w-full justify-end gap-3">
          <Button color="secondary" size="large">
            Cancelar
          </Button>
          <Button
            color="primary"
            size="large"
            onClick={handleSavedClick}
            disabled={saveIsLoading}
          >
            {saveIsLoading && <LoaderIcon className="animate-spin" />}
            Salvar
          </Button>
        </div>
      </div>
    </div>
  );
};

export default TaskDetailsPage;
