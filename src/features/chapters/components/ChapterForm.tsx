"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { RequiredLableIcon } from "@/components/RequiredLabelIcon";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { _chapterStatus, chapterStatuses } from "@/drizzle/schema";
import { chapterSchema } from "../schemas/chapter";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { createChapter, updateChapter } from "../actions/chapters";

export function ChapterForm({
  chapter,
  subjectId,
  onSuccess,
}: {
  chapter?: {
    id: string;
    name: string;
    status: _chapterStatus;
  };
  subjectId: string;
  onSuccess?: () => void;
}) {
  const form = useForm<z.infer<typeof chapterSchema>>({
    resolver: zodResolver(chapterSchema),
    defaultValues: chapter ?? {
      name: "",
      status: "active",
    },
  });

  async function onSubmit(values: z.infer<typeof chapterSchema>) {
    const action =
      chapter == null
        ? createChapter.bind(null, subjectId)
        : updateChapter.bind(null, chapter.id);

    const data = await action(values);

    if (data.error) {
      toast.error(data.message);
    } else {
      toast.success(data.message);
      onSuccess?.();
    }
  }

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="flex flex-col gap-6 @container"
      >
        <div className="grid grid-cols-1 @lg:grid-cols-2 gap-6">
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem>
                <FormLabel>
                  <RequiredLableIcon />
                  Name
                </FormLabel>
                <FormControl>
                  <Input {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="status"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Status</FormLabel>
                <Select
                  onValueChange={field.onChange}
                  defaultValue={field.value}
                >
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    {chapterStatuses.map((status) => (
                      <SelectItem key={status} value={status}>
                        {status}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
        <div className="self-end">
          <Button disabled={form.formState.isSubmitting} type="submit">
            Save
          </Button>
        </div>
      </form>
    </Form>
  );
}
