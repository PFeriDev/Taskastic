"use client";

import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import ModeToggle from "./ModeToggle";
import { Plus } from "lucide-react";
import AddTodoForm from "./AddTodoForm";

const Header = () => {
  return (
    <div className="w-full bg-background  border-b-2 border-[#383838]/50">
      <div className="lg:w-4/5 flex justify-between p-5 mx-auto items-center">
        <Image src="/Tasktastic..png" width={150} height={150} alt="logo" className="hidden dark:block"></Image>
        <Image src="/Tasktastic.dark.png" width={150} height={150} alt="logo" className="dark:hidden"></Image>
        <div className="flex items-center gap-5">
          <ModeToggle />
          <Sheet>
            <SheetTrigger asChild>
              <Button variant="outline">
                <p>Add Todo</p>
                <Plus />
              </Button>
            </SheetTrigger>
            <SheetContent>
              <SheetHeader>
                <SheetTitle>Add todo</SheetTitle>
                <SheetDescription>Make changes to your profile here. Click save when you're done.</SheetDescription>
              </SheetHeader>
              <AddTodoForm />
              <SheetFooter>
                <SheetClose asChild></SheetClose>
              </SheetFooter>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </div>
  );
};

export default Header;
