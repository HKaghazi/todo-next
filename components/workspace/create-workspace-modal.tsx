"use client";
import Button from "@cmp/shared/button";
import Modal from "@cmp/shared/modal";
import { zodResolver } from "@hookform/resolvers/zod";
import { API_URL } from "@lib/constants";
import { handleError } from "@lib/err-handler";
import { createWorkspaceSchema } from "dto/workspace.dto";
import React, { useCallback, useMemo, useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";

type ModalContentProps = {
  closeModal: () => void;
};

const ModalContent: React.FC<ModalContentProps> = ({ closeModal }) => {
  const [saving, setSaving] = useState(false);
  const { handleSubmit, register, formState } = useForm({
    resolver: zodResolver(createWorkspaceSchema),
  });
  const errors = formState.errors;

  const onSubmit = async (data: any) => {
    try {
      // setSaving(true);
      const res = await fetch(`${API_URL}/workspace`, {
        method: "post",
        cache: "no-cache",
        headers: {
          "content-type": "application/json",
        },
      });

      console.log("res", res);
      // const resJson = await res.json();
      // if (!res.ok) return toast.error(resJson?.message);

      // closeModal();

      // .catch(handleError)
      // .finally(() => setSaving(false));
    } catch (err) {
      handleError(err);
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-2">
      <div className="flex flex-col gap-3 p-4">
        <div>
          <input
            className="border w-full rounded-lg p-2"
            autoComplete="off"
            type="text"
            placeholder="Choose workspace name"
            {...register("name")}
          />
          {errors.name && (
            <span className="text-red-500">
              {errors.name.message?.toString()}
            </span>
          )}
        </div>
      </div>
      <div className="flex gap-3 w-full p-4 pt-0">
        <Button
          text="Cancel"
          variant="secondary"
          className="flex-grow-0 w-min py-1 rounded-lg min-w-[120px]"
          onClick={closeModal}
        />

        <Button
          text="Save"
          variant="primary"
          className="flex-grow-0 w-min py-1 rounded-lg min-w-[120px]"
        />
      </div>
    </form>
  );
};

export const useCreateWorkspaceModal = () => {
  const [showModal, setShowModal] = useState<any>();

  const ModalCMP = useCallback(() => {
    return (
      <Modal
        title={"Create workspace"}
        showModal={!!showModal}
        setShowModal={setShowModal}
      >
        <ModalContent closeModal={() => setShowModal(undefined)} />
      </Modal>
    );
  }, [showModal]);

  return useMemo(
    () => ({
      openModal: setShowModal,
      ModalCMP,
    }),
    [ModalCMP],
  );
};
