"use client";
import React, { FormEvent, useRef } from "react";
import { VscSend } from "react-icons/vsc";

export const WriteTodo = () => {
  const inputRef = useRef<HTMLTextAreaElement>(null);
  const handleSubmit = (ev: FormEvent<HTMLFormElement>) => {
    ev.preventDefault();
    console.log("ev", inputRef.current?.value);
  };
  return (
    <div className="fixed bottom-0 right-0 left-0">
      <div className="container mx-auto max-w-3xl p-4">
        <form
          onSubmit={handleSubmit}
          className="bg-gray-50 flex items-center border rounded-lg shadow-lg p-0"
        >
          <textarea
            className="border-none w-full rounded-lg px-4 py-2 resize-none bg-transparent"
            placeholder="Something to-do ..."
            rows={1}
            autoFocus
            ref={inputRef}
          ></textarea>
          <button
            type="submit"
            className="w-10 h-10 inline-flex items-center justify-center text-gray-500 hover:text-gray-900 duration-300"
          >
            <VscSend className="w-5 h-5" />
          </button>
        </form>
      </div>
    </div>
  );
};
