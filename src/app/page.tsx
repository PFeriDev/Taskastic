"use client";
import CenterSection from "@/components/CenterSection";
import Header from "@/components/Header";
import { Label } from "@/components/ui/label";
import { FolderDot, FolderOpenDot } from "lucide-react";
import TodoContainer, { AddTodoForm } from "@/components/TodosList";

function page() {
  return (
    <>
      <Header />
      <section className="w-screen grid lg:grid-cols-12 gap-4 mt-5 p-5">
        <div className="lg:col-span-3 border border-[#383838]/50 rounded-lg p-3">
          <Label className="flex gap-2 items-center mb-5">
            <FolderOpenDot />
            <p>Active Tasks</p>
          </Label>
          <Label className="flex gap-2 items-center">
            <FolderDot />
            <p>Completed Tasks</p>
          </Label>
        </div>
        <TodoContainer />
      </section>
    </>
  );
}

export default page;
