import { Input } from "postcss";
import { createPortal } from "react-dom";
import Button from "./Button";

const AddTaskDialog = ({ isOpen }) => {
  if (!isOpen) return null;

  return createPortal(
    <div className="fixed bottom-0 left-0 top-0 flex h-screen w-screen items-center justify-center backdrop-blur">
      <div className="rounded-xl bg-white p-5 text-center shadow">
        <h2 className="text-xl font-semibold text-[#35383E]">Nova Tarefa</h2>
        <p className="my-1 mb-4 text-sm text-[#9A9C9F]">
          Insira as informações abaixo
        </p>
        <div className="flex w-[336px] flex-col space-y-4">
          <Input placeholder="Insira o título da tarefa" />
          <Input placeholder="Horário" />
          <Input placeholder="Descreva a tarefa" />
          <div className="flex gap-3">
            <Button variant>Cancelar</Button>
            <Button variant>Cancelar</Button>
          </div>
        </div>
      </div>
    </div>,
    document.body
  );
};

export default AddTaskDialog;
