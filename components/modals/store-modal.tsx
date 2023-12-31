"use client";

import *  as z from "zod";
import { useForm } from "react-hook-form";
import { useState } from "react";

import { useStoreModal } from "@/hooks/use-store-modal";
import { Modal } from "@/components/ui/modal";
import { zodResolver } from "@hookform/resolvers/zod";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

import { toast } from "react-hot-toast";
import axios from "axios";

const formSchema = z.object({
    name: z.string().min(3),

})

export const StoreModal = () => {
    const storeModal = useStoreModal();

    const [loading, setloading] = useState(false);

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            name: "",
        },
    })

    const onSubmit = async (values: z.infer<typeof formSchema>) => {
        try {
            setloading(true)

            const respone = await axios.post('/api/stores', values);

            window.location.assign(`${respone.data.id}`)
        } catch (error){ 
            toast.error("Something went wrong")

        } finally {
            setloading(false);
        }
    }

    return (
        <Modal
            title="Create store"
            description="Add a new store to manage products and categories"
            isOpen={storeModal.isOpen}
            onClose={storeModal.onClose}
        >
            <div>
                <div className="space-x-4 py-2 pb-4">
                    <Form {...form}>
                        <form onSubmit={form.handleSubmit(onSubmit)}>
                            <FormField 
                                control={form.control}
                                name="name"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Name</FormLabel>
                                        <FormControl>
                                            <Input 
                                                disabled={loading} 
                                                placeholder="E-commerce" 
                                                {...field}/>
                                        </FormControl>
                                        <FormMessage/>
                                    </FormItem>
                                )}
                            />
                            <div className="pt-6 space-x-2 flex items-center justify-end w-full">
                                <Button 
                                    variant="outline"
                                    disabled={loading} 
                                    onClick={storeModal.onClose}>
                                        Cancel
                                </Button>
                                <Button 
                                    disabled={loading}
                                    type="submit">
                                       Continue
                                </Button>

                            </div>
                        </form>
                    </Form>
                </div>
            </div>
        </Modal>
    )
}