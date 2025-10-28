
import React from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { Building, User, Mail, Phone, Globe, Calendar, Users, Server, HelpCircle, FileText, SendHorizontal, ChevronLeft } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Badge } from '@/components/ui/badge';
import { toast } from "@/hooks/use-toast";

// Define the form schema with Zod
const formSchema = z.object({
  fullName: z.string().min(2, { message: "Full name must be at least 2 characters." }),
  companyName: z.string().min(2, { message: "Company name must be at least 2 characters." }),
  email: z.string().email({ message: "Please enter a valid email address." }),
  phone: z.string().min(10, { message: "Please enter a valid phone number." }),
  website: z.string().url({ message: "Please enter a valid URL." }).or(z.string().length(0)),
  eventType: z.string().min(2, { message: "Event type is required." }),
  participantCount: z.string().min(1, { message: "Please enter a value." }),
  registrationPlatform: z.string(),
  partnershipReason: z.string().min(10, { message: "Please provide a detailed reason (min. 10 characters)." }),
  additionalNotes: z.string().optional(),
});

type FormValues = z.infer<typeof formSchema>;

const PartnerApplication = () => {
  const navigate = useNavigate();
  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      fullName: "",
      companyName: "",
      email: "",
      phone: "",
      website: "",
      eventType: "",
      participantCount: "",
      registrationPlatform: "",
      partnershipReason: "",
      additionalNotes: "",
    },
  });

  const onSubmit = (data: FormValues) => {
    // In a real app, this would send data to a server or email service
    console.log("Form submitted:", data);
    
    // Show success toast
    toast({
      title: "Application Submitted",
      description: "Thank you for your interest in partnering with RACE. Our team will contact you shortly.",
    });
    
    // Redirect back to partners page after successful submission
    setTimeout(() => {
      navigate('/partners');
    }, 2000);
  };

  return (
    <div className="min-h-screen py-16 bg-white pt-20">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header Section */}
        <div className="mb-10 text-center">
          <Link to="/partners" className="inline-flex items-center text-race-red hover:text-race-red/90 mb-4">
            <ChevronLeft className="h-4 w-4 mr-1" />
            Back to Partners
          </Link>
          
          <Badge className="inline-block mb-4 px-4 py-2 text-white border-0 bg-race-red">
            Partnership Application
          </Badge>
          
          <h1 className="text-4xl font-bold mb-4">
            Join Our Network
          </h1>
          
          <p className="text-xl text-race-darkgray max-w-2xl mx-auto">
            Complete the form below to start your partnership journey with RACE.
          </p>
        </div>

        {/* Application Form */}
        <div className="max-w-3xl mx-auto bg-white rounded-xl shadow-lg p-8">
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
              {/* Personal Information */}
              <div className="space-y-4">
                <h2 className="text-xl font-semibold mb-4 flex items-center">
                  <User className="h-5 w-5 mr-2 text-race-red" />
                  Contact Information
                </h2>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <FormField
                    control={form.control}
                    name="fullName"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Full Name*</FormLabel>
                        <FormControl>
                          <Input placeholder="John Doe" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="email"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Email Address*</FormLabel>
                        <FormControl>
                          <Input placeholder="email@example.com" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <FormField
                    control={form.control}
                    name="phone"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Phone Number*</FormLabel>
                        <FormControl>
                          <Input placeholder="+1 (555) 123-4567" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="website"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Website or Social Media</FormLabel>
                        <FormControl>
                          <Input placeholder="https://your-company.com" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
              </div>

              {/* Organization Information */}
              <div className="space-y-4 pt-4">
                <h2 className="text-xl font-semibold mb-4 flex items-center">
                  <Building className="h-5 w-5 mr-2 text-race-red" />
                  Organization Information
                </h2>

                <FormField
                  control={form.control}
                  name="companyName"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Company/Organization Name*</FormLabel>
                      <FormControl>
                        <Input placeholder="Company Name" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <FormField
                    control={form.control}
                    name="eventType"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Type of Events Hosted*</FormLabel>
                        <FormControl>
                          <Input placeholder="Triathlons, Marathons, etc." {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="participantCount"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Average Number of Participants*</FormLabel>
                        <FormControl>
                          <Input placeholder="e.g., 500" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>

                <FormField
                  control={form.control}
                  name="registrationPlatform"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Current Registration Platform (if any)</FormLabel>
                      <FormControl>
                        <Input placeholder="e.g., Active, Eventbrite, Custom platform" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              {/* Partnership Information */}
              <div className="space-y-4 pt-4">
                <h2 className="text-xl font-semibold mb-4 flex items-center">
                  <HelpCircle className="h-5 w-5 mr-2 text-race-red" />
                  Partnership Information
                </h2>

                <FormField
                  control={form.control}
                  name="partnershipReason"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Why You Want to Partner with RACE*</FormLabel>
                      <FormControl>
                        <Textarea 
                          placeholder="Please describe how this partnership would benefit both organizations..." 
                          className="min-h-[120px]" 
                          {...field} 
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="additionalNotes"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Additional Notes or Questions (Optional)</FormLabel>
                      <FormControl>
                        <Textarea 
                          placeholder="Any other information you'd like to share..." 
                          className="min-h-[100px]" 
                          {...field} 
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              {/* Submit button */}
              <div className="pt-4">
                <Button 
                  type="submit" 
                  className="w-full md:w-auto bg-race-red hover:bg-race-red/90"
                >
                  Submit Application
                  <SendHorizontal className="ml-2 h-4 w-4" />
                </Button>
              </div>
            </form>
          </Form>
        </div>
      </div>
    </div>
  );
};

export default PartnerApplication;
