import Input from "./Input";
import { createPortal } from "react-dom";
import Button from "./Button";
import { CSSTransition } from "react-transition-group";
import { useEffect, useRef, useState } from "react";
import "./AddTaskDialog.css";
import PropTypes from "prop-types";
import LoaderIcon from "../assets/icons/loader.svg?react";
import { v4 } from "uuid";
import { useForm } from "react-hook-form";

import TimeSelect from "./TimeSelect";
import { useMutation } from "@tanstack/react-query";

const AddTaskDialog = ({
  isOpen,
  handleClose,
  onSubmitSuccess,
  onSubmitError,
}) => {
  const { mutate } = useMutation({
    mutationKey: "addTask",
    mutationFn: async (task) => {
      const response = await fetch("http://localhost:3000/tasks", {
        method: "POST",
        body: JSON.stringify(task),
      });
      if (!response.ok) {
        throw new Error();
      }
      return response.json();
    },
  });
  const [time, setTime] = useState("morning");

  const {
    register,
    formState: { errors, isSubmitting },
    handleSubmit,
    reset,
  } = useForm();

  const nodeRef = useRef();

  useEffect(() => {
    if (!isOpen) {
      setTime("morning");
    }
  }, [isOpen]);

  const handleSavedClick = async (data) => {
    const task = {
      id: v4(),
      title: data.title.trim(),
      description: data.description.trim(),
      time: data.time.trim(),
      status: "not_started",
    };

    mutate(task, {
      onSuccess: () => {
        onSubmitSuccess(task);
        handleClose();
        reset({
          title: "",
          time: "morning",
          description: "",
        });
      },
      onError: () => onSubmitError(),
    });
  };
  const handleCancelClick = () => {
    reset({
      title: "",
      time: "morning",
      description: "",
    });
    handleClose();
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
              <form onSubmit={handleSubmit(handleSavedClick)}>
                <div className="flex w-[336px] flex-col space-y-4">
                  <Input
                    id="title"
                    label="Título"
                    placeholder="Insira o título da tarefa"
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

                  <TimeSelect
                    value={time}
                    onChange={(event) => setTime(event.target.value)}
                    disabled={isSubmitting}
                    errorMessage={errors?.time?.message}
                    {...register("time", { required: true })}
                  />

                  <Input
                    id="description"
                    label="Descrição"
                    placeholder="Descreva a tarefa"
                    errorMessage={errors?.description?.message}
                    disabled={isSubmitting}
                    {...register("description", {
                      required: "A descrição é obrigatória",
                      validate: (value) => {
                        if (!value.trim()) {
                          return "O título não pode ser vazio.";
                        }
                        return true;
                      },
                    })}
                  />

                  <div className="flex gap-3">
                    <Button
                      size="large"
                      className="w-full"
                      color="secondary"
                      type="button"
                      onClick={handleCancelClick}
                    >
                      Cancelar
                    </Button>
                    <Button
                      size="large"
                      className="w-full"
                      type="submit"
                      disabled={isSubmitting}
                    >
                      {isSubmitting && <LoaderIcon className="animate-spin" />}
                      Salvar
                    </Button>
                  </div>
                </div>
              </form>
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
