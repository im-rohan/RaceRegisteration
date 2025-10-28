import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Instagram, Linkedin, Twitter, Mail, Phone, MapPin } from 'lucide-react';
import { useToast } from "@/components/ui/use-toast";
const contactFormSchema = z.object({
  fullName: z.string().min(2, {
    message: 'Name must be at least 2 characters'
  }),
  email: z.string().email({
    message: 'Please enter a valid email address'
  }),
  subject: z.string().min(1, {
    message: 'Please select a subject'
  }),
  message: z.string().min(10, {
    message: 'Message must be at least 10 characters'
  })
});
type ContactFormValues = z.infer<typeof contactFormSchema>;
const Contact = () => {
  const {
    toast
  } = useToast();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const form = useForm<ContactFormValues>({
    resolver: zodResolver(contactFormSchema),
    defaultValues: {
      fullName: '',
      email: '',
      subject: '',
      message: ''
    }
  });
  const onSubmit = async (data: ContactFormValues) => {
    setIsSubmitting(true);
    try {
      // This is where you would typically send the form data to your backend
      console.log('Form data submitted:', data);

      // Simulate API call with a delay
      await new Promise(resolve => setTimeout(resolve, 1000));
      toast({
        title: "Message sent!",
        description: "Thank you for reaching out. We'll get back to you soon."
      });
      form.reset();
    } catch (error) {
      toast({
        title: "Something went wrong",
        description: "There was an error sending your message. Please try again.",
        variant: "destructive"
      });
    } finally {
      setIsSubmitting(false);
    }
  };
  return <div className="min-h-screen pt-24 pb-16 px-4 bg-gradient-to-b from-white to-race-gray">
      <div className="container mx-auto">
        {/* Header Section */}
        <motion.div initial={{
        opacity: 0,
        y: 20
      }} animate={{
        opacity: 1,
        y: 0
      }} transition={{
        duration: 0.5
      }} className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">Contact Us.</h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">We'd love to hear from you. Whether you're an athlete, event organizer, or brand interested in collaborating.</p>
        </motion.div>

        {/* Contact Content */}
        <div className="flex flex-col lg:flex-row gap-10 items-start">
          {/* Form Section */}
          <motion.div initial={{
          opacity: 0,
          x: -20
        }} animate={{
          opacity: 1,
          x: 0
        }} transition={{
          duration: 0.5,
          delay: 0.2
        }} className="w-full lg:w-2/3">
            <Card className="overflow-hidden shadow-lg">
              <div className="h-2 bg-race-red"></div>
              <CardContent className="p-8">
                <h2 className="text-2xl font-bold mb-6">Send us a message</h2>
                
                <Form {...form}>
                  <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <FormField control={form.control} name="fullName" render={({
                      field
                    }) => <FormItem>
                            <FormLabel>Full Name</FormLabel>
                            <FormControl>
                              <Input placeholder="Your Name" {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>} />

                      <FormField control={form.control} name="email" render={({
                      field
                    }) => <FormItem>
                            <FormLabel>Email</FormLabel>
                            <FormControl>
                              <Input placeholder="your.email@example.com" type="email" {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>} />
                    </div>

                    <FormField control={form.control} name="subject" render={({
                    field
                  }) => <FormItem>
                          <FormLabel>Subject</FormLabel>
                          <Select onValueChange={field.onChange} defaultValue={field.value}>
                            <FormControl>
                              <SelectTrigger>
                                <SelectValue placeholder="Select a subject" />
                              </SelectTrigger>
                            </FormControl>
                            <SelectContent>
                              <SelectItem value="General Inquiry">General Inquiry</SelectItem>
                              <SelectItem value="Event Organizer">Event Organizer</SelectItem>
                              <SelectItem value="Tech Support">Tech Support</SelectItem>
                              <SelectItem value="Business Partnership">Business Partnership</SelectItem>
                              <SelectItem value="Media">Media</SelectItem>
                              <SelectItem value="Other">Other</SelectItem>
                            </SelectContent>
                          </Select>
                          <FormMessage />
                        </FormItem>} />

                    <FormField control={form.control} name="message" render={({
                    field
                  }) => <FormItem>
                          <FormLabel>Message</FormLabel>
                          <FormControl>
                            <Textarea placeholder="How can we help you?" className="min-h-[150px]" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>} />

                    <div className="flex justify-end">
                      <Button type="submit" className="bg-race-red hover:bg-race-red/90 px-8" disabled={isSubmitting}>
                        {isSubmitting ? "Sending..." : "Submit"}
                      </Button>
                    </div>
                  </form>
                </Form>
              </CardContent>
            </Card>
          </motion.div>

          {/* Contact Info Section */}
          <motion.div initial={{
          opacity: 0,
          x: 20
        }} animate={{
          opacity: 1,
          x: 0
        }} transition={{
          duration: 0.5,
          delay: 0.4
        }} className="w-full lg:w-1/3">
            <Card className="overflow-hidden shadow-lg">
              <div className="h-2 bg-race-red"></div>
              <CardContent className="p-8">
                <h2 className="text-2xl font-bold mb-6">Contact Information</h2>
                
                <div className="space-y-6">
                  <div className="flex items-start gap-4">
                    <div className="bg-race-red/10 p-3 rounded-full">
                      <Mail className="h-6 w-6 text-race-red" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-lg">Email</h3>
                      <a href="mailto:contact@raceendurance.com" className="text-gray-600 hover:text-race-red transition-colors">contact@race-endurance.com</a>
                    </div>
                  </div>
                  
                  <div className="flex items-start gap-4">
                    <div className="bg-race-red/10 p-3 rounded-full">
                      <Phone className="h-6 w-6 text-race-red" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-lg">Phone</h3>
                       <div className="text-gray-600">
                        <div>305-450-6292</div>
                        <div>305-562-3580</div>
                      </div>
                    </div>
                  </div>
                  
                  <div className="flex items-start gap-4">
                    <div className="bg-race-red/10 p-3 rounded-full">
                      <MapPin className="h-6 w-6 text-race-red" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-lg">Locations</h3>
                      <p className="text-gray-600">
                        Miami, FL<br />
                        Boston, MA
                      </p>
                    </div>
                  </div>
                  
                  <div className="pt-4">
                    <h3 className="font-semibold text-lg mb-4">Social Media</h3>
                    <div className="flex gap-4">
                      <a href="#" className="bg-race-red/10 p-3 rounded-full hover:bg-race-red hover:text-white transition-colors" aria-label="Instagram">
                        <Instagram className="h-5 w-5" />
                      </a>
                      <a href="#" className="bg-race-red/10 p-3 rounded-full hover:bg-race-red hover:text-white transition-colors" aria-label="LinkedIn">
                        <Linkedin className="h-5 w-5" />
                      </a>
                      <a href="#" className="bg-race-red/10 p-3 rounded-full hover:bg-race-red hover:text-white transition-colors" aria-label="Twitter">
                        <Twitter className="h-5 w-5" />
                      </a>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            <div className="mt-6 relative overflow-hidden rounded-lg shadow-lg">
              <div className="aspect-video w-full">
                <iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d115133.01016881921!2d-80.2616192627539!3d25.782545630100472!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x88d9b0a20ec8c111%3A0xff96f271ddad4f65!2sMiami%2C%20FL!5e0!3m2!1sen!2sus!4v1714604582896!5m2!1sen!2sus" width="100%" height="225" style={{
                border: 0
              }} allowFullScreen={false} loading="lazy" referrerPolicy="no-referrer-when-downgrade" title="RACE Endurance locations" className="w-full h-full" />
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </div>;
};
export default Contact;