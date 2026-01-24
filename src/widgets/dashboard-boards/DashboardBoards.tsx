"use client";

import { Add01Icon, ArrowRight01Icon, Clock04Icon } from "@hugeicons/core-free-icons";
import { HugeiconsIcon as Icon } from "@hugeicons/react";
import Link from "next/link";
import { DecoTape } from "@/shared/ui/common/DecoTape";

import { Button } from "@/shared/ui/shadcn/Button";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/shared/ui/shadcn/Card";
import { Progress, ProgressLabel, ProgressValue } from "@/shared/ui/shadcn/Progress";
import { useBoardsList } from "./model";

export const DashboardBoards = () => {
  const { data: boards } = useBoardsList();

  return (
    <section className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="relative inline-block font-bold text-xl">
          <span className="relative z-10">Your Boards</span>
          <span className="absolute -bottom-1 left-0 h-2 w-full -rotate-1 bg-primary/20" />
        </h2>
        <Button size="sm" className="gap-2 rounded-none shadow-[2px_2px_0px_0px_rgba(45,45,45,1)]">
          <Icon icon={Add01Icon} className="h-4 w-4" />
          <span>New Board</span>
        </Button>
      </div>

      <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
        {boards.map((board, index) => (
          <div
            key={board.id}
            className={`relative h-full ${index % 2 === 0 ? "-rotate-1" : "rotate-1"} transition-transform hover:-translate-y-2`}
          >
            <DecoTape className="absolute -top-3 left-1/2 z-10 -translate-x-1/2" />
            <Card className="flex h-full flex-col justify-between rounded-none border-2 border-primary/10 bg-card shadow-[4px_4px_0px_0px_rgba(45,45,45,0.1)] transition-shadow hover:shadow-[6px_6px_0px_0px_rgba(45,45,45,0.1)]">
              <div className="flex flex-1 flex-col">
                <CardHeader className="pb-2">
                  <CardTitle className="font-medium text-base">{board.title}</CardTitle>
                </CardHeader>
                <CardContent className="pb-4">
                  <Progress
                    value={board.progress}
                    className="h-2 border border-primary/20 bg-primary/5"
                  >
                    <ProgressLabel className="sr-only">Progress</ProgressLabel>
                    <ProgressValue className="bg-primary" />
                  </Progress>
                </CardContent>
              </div>
              <CardFooter className="flex items-center justify-between border-primary/10 border-t bg-primary/5 p-4 text-muted-foreground text-xs">
                <div className="flex items-center gap-1.5">
                  <Icon icon={Clock04Icon} className="h-3.5 w-3.5" />
                  <span>{board.updatedAt}</span>
                </div>
                <Link
                  href="#"
                  className="group flex items-center gap-1 font-medium text-primary hover:underline"
                >
                  Open Board
                  <Icon
                    icon={ArrowRight01Icon}
                    className="h-3.5 w-3.5 transition-transform group-hover:translate-x-0.5"
                  />
                </Link>
              </CardFooter>
            </Card>
          </div>
        ))}

        <div className="relative h-full rotate-1 transition-transform hover:-translate-y-2">
          <DecoTape className="absolute -top-3 left-1/2 z-10 -translate-x-1/2 opacity-50" />
          <button
            type="button"
            className="group flex h-full min-h-[180px] w-full flex-col items-center justify-center gap-3 border-2 border-primary/20 border-dashed bg-background shadow-[4px_4px_0px_0px_rgba(45,45,45,0.05)] transition-colors hover:border-primary/50 hover:bg-primary/5"
          >
            <div className="flex h-12 w-12 items-center justify-center rounded-full bg-primary/5 shadow-sm ring-1 ring-primary/20 transition-transform group-hover:scale-110 group-hover:ring-primary/40">
              <Icon
                icon={Add01Icon}
                className="h-6 w-6 text-primary/60 transition-colors group-hover:text-primary"
              />
            </div>
            <span className="font-medium text-primary/80 text-sm group-hover:text-primary">
              Create New Board
            </span>
          </button>
        </div>
      </div>
    </section>
  );
};
