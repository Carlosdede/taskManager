import Button from "./Button";
import AddIcon from "../assets/icons/add.svg?react";
import TrashIcon from "../assets/icons/trash.svg?react";
import SunIcon from "../assets/icons/sun.svg?react";
import CloudSun from "../assets/icons/cloud-sun.svg?react";
import MoonIcon from "../assets/icons/moon.svg?react";
import TasksSeparator from "./TasksSeparator";

const Tasks = () => {
  return (
    <div className="w-full px-8 py-16">
      <div className="flex w-full justify-between">
        <div>
          <span className="text-xs font-semibold text-[#00ADB5]">
            Minhas tarefas
          </span>
          <h2 className="text-xl font-semibold">Minhas Tarefas</h2>
        </div>

        <div className="flex items-center gap-3">
          <Button variant={"ghost"}>
            Limpar tarefa
            <TrashIcon />
          </Button>

          <Button variant={"primary"}>
            Nova tarefa
            <AddIcon />
          </Button>
        </div>
      </div>
      {/*LISTA DE TAREFAS*/}
      <div className="rounded-xl bg-white p-6">
        {/* MANHÃ */}

        <div className="space-y-3 text-sm">
          <TasksSeparator title={"Manhã"} icon={<SunIcon />} />
        </div>

        {/*TARDE  */}

        <div className="my-6 space-y-3 text-sm">
          <div className="space-y-3 text-sm">
            <TasksSeparator title={"Tarde"} icon={<CloudSun />} />
          </div>
        </div>
        {/*NOITE  */}
        <div className="space-y-3 text-sm">
          <div className="space-y-3 text-sm">
            <TasksSeparator title={"Noite"} icon={<MoonIcon />} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Tasks;
