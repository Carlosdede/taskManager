import Input from "./Input";
import { createPortal } from "react-dom";
import Button from "./Button";
import { CSSTransition } from "react-transition-group";
import { useEffect, useRef, useState } from "react";
import "./AddTaskDialog.css";
import PropTypes from "prop-types";
import LoaderIcon from "../assets/icons/loader.svg?react";
import { v4 } from "uuid";

import TimeSelect from "./TimeSelect";

const AddTaskDialog = ({
  isOpen,
  handleClose,
  onSubmitSuccess,
  onSubmitError,
}) => {
  const [time, setTime] = useState("morning");

  const [error, setErrors] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const titleError = error.find((error) => error.inputName === "title");

  const descriptionError = error.find(
    (error) => error.inputName === "description"
  );

  const nodeRef = useRef();
  const titleRef = useRef();
  const descriptionRef = useRef();

  useEffect(() => {
    if (!isOpen) {
      setTime("morning");
    }
  }, [isOpen]);

  const handleSavedClick = async () => {
    setIsLoading(true);
    const newErrors = [];
    const title = titleRef.current.value;
    const description = descriptionRef.current.value;

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
    setErrors(newErrors);

    if (newErrors.length > 0) {
      return setIsLoading(false);
    }
    const task = {
      id: v4(),
      title,
      description,
      time,
      status: "not_started",
    };

    const response = await fetch("http://localhost:3000/tasks", {
      method: "POST",
      body: JSON.stringify(task),
    });
    if (!response.ok) {
      setIsLoading(false);
      return onSubmitError();
    }
    onSubmitSuccess(task);
    setIsLoading(false);

    handleClose();
    if (!title.trim() || !description.trim()) {
      return alert("Preencha todos os campos.");
    }
  };

  return (
    <CSSTransition
      nodeRef={nodeRef}
      in={isOpen}
      timeout={500}
      classNames="add-task-dialog"
      unmountOnExit
    >
      <div>
        {createPortal(
          <div
            ref={nodeRef}
            className="fixed bottom-0 left-0 top-0 flex h-screen w-screen items-center justify-center backdrop-blur"
          >
            <div className="rounded-xl bg-white p-5 text-center shadow">
              <h2 className="text-xl font-semibold text-brand-dark-blue">
                Nova Tarefa
              </h2>
              <p className="my-1 mb-4 text-sm text-brand-text-gray">
                Insira as informações abaixo
              </p>
              <div className="flex w-[336px] flex-col space-y-4">
                <Input
                  id="title"
                  label="Título"
                  placeholder="Insira o título da tarefa"
                  errorMessage={titleError?.message}
                  ref={titleRef}
                  disabled={isLoading}
                />

                <TimeSelect
                  value={time}
                  onChange={(event) => setTime(event.target.value)}
                  disabled={isLoading}
                />

                <Input
                  id="description"
                  label="Descrição"
                  placeholder="Descreva a tarefa"
                  ref={descriptionRef}
                  errorMessage={descriptionError?.message}
                  disabled={isLoading}
                />

                <div className="flex gap-3">
                  <Button
                    size="large"
                    className="w-full"
                    color="secondary"
                    onClick={handleClose}
                  >
                    Cancelar
                  </Button>
                  <Button
                    size="large"
                    className="w-full"
                    onClick={handleSavedClick}
                    disabled={isLoading}
                  >
                    {isLoading && <LoaderIcon className="animate-spin" />}
                    Salvar
                  </Button>
                </div>
              </div>
            </div>
          </div>,
          document.body
        )}
      </div>
    </CSSTransition>
  );
};

AddTaskDialog.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  handleClose: PropTypes.func.isRequired,
  handleSubmit: PropTypes.func.isRequired,
};

export default AddTaskDialog;
