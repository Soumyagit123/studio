"use client";

import { useForm, type SubmitHandler } from "react-hook-form";
import { useEffect, useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import {
  useFirebase,
  initiateAnonymousSignIn,
  errorEmitter,
  FirestorePermissionError,
} from "@/firebase";
import { collection, addDoc, serverTimestamp } from "firebase/firestore";
import { useToast } from "@/hooks/use-toast";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";

const contactSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters."),
  email: z.string().email("Invalid email address."),
  message: z.string().min(10, "Message must be at least 10 characters."),
});
type ContactFormData = z.infer<typeof contactSchema>;

export function ContactForm() {
  const { toast } = useToast();
  const { auth, firestore, user, isUserLoading } = useFirebase();

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
  } = useForm<ContactFormData>({
    resolver: zodResolver(contactSchema),
  });

  const [dataToSubmit, setDataToSubmit] = useState<ContactFormData | null>(null);

  const onSubmit: SubmitHandler<ContactFormData> = (data) => {
    if (!auth) {
      toast({
        title: "Error",
        description: "Authentication service not available.",
        variant: "destructive",
      });
      return;
    }
    setDataToSubmit(data);
    if (!user) {
      initiateAnonymousSignIn(auth);
    }
  };

  useEffect(() => {
    if (user && dataToSubmit && firestore) {
      const colRef = collection(firestore, "contactMessages");
      addDoc(colRef, {
        ...dataToSubmit,
        sentAt: serverTimestamp(),
      })
        .then(() => {
          toast({
            title: "Message Sent!",
            description: "Thank you! Your message has been sent successfully.",
          });
          reset();
        })
        .catch((e) => {
          const permissionError = new FirestorePermissionError({
            path: colRef.path,
            operation: "create",
            requestResourceData: dataToSubmit,
          });
          errorEmitter.emit("permission-error", permissionError);
          toast({
            title: "Error",
            description: "Could not send message. Please try again.",
            variant: "destructive",
          });
        })
        .finally(() => {
          setDataToSubmit(null);
        });
    }
  }, [user, dataToSubmit, firestore, reset, toast]);

  const isProcessing = isSubmitting || (isUserLoading && !!dataToSubmit);

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
      <div className="space-y-2">
        <Label htmlFor="name">Name</Label>
        <Input
          id="name"
          placeholder="Your Name"
          {...register("name")}
          disabled={isProcessing}
        />
        {errors.name && (
          <p className="text-sm text-destructive">{errors.name.message}</p>
        )}
      </div>
      <div className="space-y-2">
        <Label htmlFor="email">Email</Label>
        <Input
          id="email"
          type="email"
          placeholder="your.email@example.com"
          {...register("email")}
          disabled={isProcessing}
        />
        {errors.email && (
          <p className="text-sm text-destructive">{errors.email.message}</p>
        )}
      </div>
      <div className="space-y-2">
        <Label htmlFor="message">Message</Label>
        <Textarea
          id="message"
          placeholder="Your message..."
          {...register("message")}
          disabled={isProcessing}
        />
        {errors.message && (
          <p className="text-sm text-destructive">{errors.message.message}</p>
        )}
      </div>
      <Button type="submit" disabled={isProcessing} className="w-full">
        {isProcessing ? "Sending..." : "Send Message"}
      </Button>
    </form>
  );
}
