import React from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import axios from "axios";

import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";

import SendButton from "@/assets/images/send-button.svg";
import Image from "next/image";

import { CONTACT_US_ROUTE } from "@/routes";

const formSchema = z.object({
  userName: z.string().min(2, {
    message: "Name must be at least 2 characters.",
  }),
  email: z.string().email({
    message: "Please enter a valid email address.",
  }),
  subject: z.string().min(1, "Please enter a subject"),
  message: z.string().min(1, "Please enter a message"),
});

type FormData = z.infer<typeof formSchema>;

const ContactForm = () => {
  const form = useForm<FormData>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      userName: "",
      email: "",
      subject: "",
      message: "",
    },
  });

  const onSubmit = (data: FormData) => {
    try {
      axios
        .post(CONTACT_US_ROUTE, {
          name: data.userName,
          email: data.email,
          subject: data.subject,
          message: data.message,
          website: "BitcoinYay",
        })
        .then((response) => {
          console.log(response.data);
          // reset form
          form.reset();
        });
    } catch (error) {
      console.error("Error sending email:", error);
    }
  };

  return (
    <div className="min-h-screen text-white flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8">
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="mt-10">
            <div className="rounded-md shadow-sm space-y-6">
              <FormField
                control={form.control}
                name="userName"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="">Name</FormLabel>
                    <FormControl>
                      <Input placeholder="Name" {...field} className="h-12" />
                    </FormControl>
                    <FormMessage className="text-red-500 text-sm mt-1" />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="subject"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="">Subject</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="Subject"
                        {...field}
                        className="h-12"
                      />
                    </FormControl>
                    <FormMessage className="text-red-500 text-sm mt-1" />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Email</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="Email"
                        type="email"
                        {...field}
                        className="h-12"
                      />
                    </FormControl>
                    <FormMessage className="text-red-500 text-sm mt-1" />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="message"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Message</FormLabel>
                    <FormControl>
                      <Textarea
                        placeholder="Message..."
                        className="h-40"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage className="text-red-500 text-sm mt-1" />
                  </FormItem>
                )}
              />
            </div>

            <div className="flex">
              <button
                type="submit"
                className=" w-full flex justify-center items-center lg:justify-start"
              >
                <Image
                  src={SendButton}
                  alt="Send"
                  className="hover:scale-105 cursor-pointer mt-10"
                />
              </button>
            </div>
          </form>
        </Form>
      </div>
    </div>
  );
};

export default ContactForm;
