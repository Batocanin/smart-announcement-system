"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { loginSchema, loginSchemaValue } from "../../../../../../shared/schemas/auth/schema";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import useLoginMutation from "@/app/(auth)/login/mutations/useLoginMutation";
import { CircleAlert, Loader2, X } from "lucide-react";
import { Button } from "@/components/ui/button";

const LoginForm = () => {
  const form = useForm<loginSchemaValue>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const { mutate, isSuccess, isPending, isError, error } = useLoginMutation();

  function onSubmit(values: loginSchemaValue) {
    mutate({ credentials: values });
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Email</FormLabel>
              <FormControl>
                <Input placeholder="Enter your email" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="password"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Password</FormLabel>
              <FormControl>
                <Input type="password" placeholder="Enter your password" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        {isError && <LoginFormError error={error.message} />}
        <Button type="submit" className="w-full" disabled={isPending || isSuccess}>
          {(isPending || isSuccess) && <Loader2 aria-label="pending icon" className="animate-spin" />}
          {isError && <X aria-label="error icon" className="stroke-destructive" />}
          {!isPending && !isSuccess && !isError && "Login"}
        </Button>
      </form>
    </Form>
  );
};
export default LoginForm;

const LoginFormError = ({ error }: { error: string }) => {
  return (
    <div className="flex items-center gap-1 p-2 bg-destructive/4 rounded-md">
      <CircleAlert className="size-4 stroke-destructive" />
      <p className="flex-1 text-sm text-destructive/90 text-balance">{error}</p>
    </div>
  );
};
