"use client";

import { Add01Icon, ArrowRight01Icon, Clock04Icon } from "@hugeicons/core-free-icons";
import { HugeiconsIcon as Icon } from "@hugeicons/react";
import Link from "next/link";

import { Button } from "@/shared/ui/shadcn/Button";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/shared/ui/shadcn/Card";
import { Progress, ProgressLabel, ProgressValue } from "@/shared/ui/shadcn/progress";
import { useBoardsList } from "./model";

export const DashboardBoards = () => {
  const { data: boards } = useBoardsList();

  return (
    <section className="space-y-4">
      <div className="flex items-center justify-between">
        <h2 className="font-semibold text-xl tracking-tight">Your Boards</h2>
        <Button size="sm" className="gap-2">
          <Icon icon={Add01Icon} className="h-4 w-4" />
          <span>New Board</span>
        </Button>
      </div>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {boards.map((board) => (
          <Card
            key={board.id}
            className="flex h-full flex-col justify-between rounded-none shadow-[4px_4px_0px_0px_rgba(45,45,45,0.1)] transition-shadow hover:shadow-[6px_6px_0px_0px_rgba(45,45,45,0.1)]"
          >
            <div className="flex flex-1 flex-col">
              <CardHeader className="pb-2">
                <CardTitle className="font-medium text-base">{board.title}</CardTitle>
              </CardHeader>
              <CardContent className="pb-4">
                <Progress value={board.progress}>
                  <ProgressLabel>Progress</ProgressLabel>
                  <ProgressValue />
                </Progress>
              </CardContent>
            </div>
            <CardFooter className="flex items-center justify-between border-t bg-muted/5 p-4 text-muted-foreground text-xs">
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
        ))}

        <button
          type="button"
          className="group flex h-full min-h-[180px] flex-col items-center justify-center gap-3 border-2 border-muted-foreground/25 border-dashed bg-muted/5 p-6 transition-colors hover:border-primary/50 hover:bg-muted/10"
        >
          <div className="flex h-12 w-12 items-center justify-center rounded-full bg-background shadow-sm ring-1 ring-border transition-transform group-hover:scale-110 group-hover:ring-primary/20">
            <Icon
              icon={Add01Icon}
              className="h-6 w-6 text-muted-foreground transition-colors group-hover:text-primary"
            />
          </div>
          <span className="font-medium text-muted-foreground text-sm group-hover:text-primary">
            Create New Board
          </span>
        </button>
      </div>
    </section>
  );
};
