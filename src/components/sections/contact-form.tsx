"use client";

import { useFormStatus } from "react-dom";
import { useActionState, useEffect } from "react";
import { submitContactForm } from "@/app/actions";
import { useToast } from "@/hooks/use-toast";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";

const initialState = {
  message: "",
  errors: undefined,
  success: false,
};

function SubmitButton() {
  const { pending } = useFormStatus();
  return (
    <Button type="submit" disabled={pending} className="w-full">
      {pending ? "Sending..." : "Send Message"}
    </Button>
  );
}

export function ContactForm() {
  const [state, formAction] = useActionState(submitContactForm, initialState);
  const { toast } = useToast();

  useEffect(() => {
    if (state.success) {
      toast({
        title: "Message Sent!",
        description: state.message,
      });
    } else if (state.message && state.errors) {
       toast({
        title: "Error",
        description: state.message,
        variant: "destructive",
      });
    }
  }, [state, toast]);

  return (
    <form action={formAction} className="space-y-6">
      <div className="space-y-2">
        <Label htmlFor="name">Name</Label>
        <Input id="name" name="name" placeholder="Your Name" required />
        {state.errors?.name && <p className="text-sm text-destructive">{state.errors.name[0]}</p>}
      </div>
      <div className="space-y-2">
        <Label htmlFor="email">Email</Label>
        <Input id="email" name="email" type="email" placeholder="your.email@example.com" required />
        {state.errors?.email && <p className="text-sm text-destructive">{state.errors.email[0]}</p>}
      </div>
      <div className="space-y-2">
        <Label htmlFor="message">Message</Label>
        <Textarea id="message" name="message" placeholder="Your message..." required required minLength={10} />
        {state.errors?.message && <p className="text-sm text-destructive">{state.errors.message[0]}</p>}
      </div>
      <SubmitButton />
    </form>
  );
}
