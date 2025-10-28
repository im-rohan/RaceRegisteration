
import React from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { X } from 'lucide-react';
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { useToast } from '@/components/ui/use-toast';
import { Checkbox } from '@/components/ui/checkbox';

// Form validation schema
const formSchema = z.object({
  fullName: z.string().min(2, { message: 'Please enter your full name' }),
  email: z.string().email({ message: 'Please enter a valid email address' }),
  socialMedia: z.string().min(1, { message: 'Please provide at least one social media handle' }),
  location: z.string().min(2, { message: 'Please enter your city/region' }),
  isTeamMember: z.boolean(),
  teamName: z.string().optional(),
  whyRepresent: z.string().min(20, { message: 'Please tell us why you want to represent RACE (min 20 characters)' }),
  experience: z.string().optional(),
  promotionPlans: z.string().min(20, { message: 'Please tell us how you would promote RACE (min 20 characters)' }),
  agreeTerms: z.boolean().refine(val => val === true, { message: 'You must agree to the terms' }),
});

type AmbassadorFormProps = {
  onClose: () => void;
};

const AmbassadorForm = ({ onClose }: AmbassadorFormProps) => {
  const { toast } = useToast();
  
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      fullName: '',
      email: '',
      socialMedia: '',
      location: '',
      isTeamMember: false,
      teamName: '',
      whyRepresent: '',
      experience: '',
      promotionPlans: '',
      agreeTerms: false,
    },
  });
  
  const onSubmit = (values: z.infer<typeof formSchema>) => {
    // In a real app, this would submit to a backend
    console.log('Form submitted:', values);
    
    // Show success toast
    toast({
      title: "Application Submitted!",
      description: "Thank you for applying to be a RACE Ambassador. We'll review your application and be in touch soon.",
      duration: 5000,
    });
    
    // Close the form
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4 overflow-y-auto">
      <div className="bg-white rounded-lg shadow-lg w-full max-w-2xl max-h-[90vh] overflow-y-auto">
        <div className="p-6 flex justify-between items-center border-b">
          <h2 className="text-2xl font-bold">Ambassador Application</h2>
          <Button variant="ghost" size="icon" onClick={onClose}>
            <X className="h-6 w-6" />
          </Button>
        </div>
        
        <div className="p-6">
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
              <FormField
                control={form.control}
                name="fullName"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Full Name</FormLabel>
                    <FormControl>
                      <Input placeholder="Your full name" {...field} />
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
                    <FormLabel>Email Address</FormLabel>
                    <FormControl>
                      <Input type="email" placeholder="your.email@example.com" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              
              <FormField
                control={form.control}
                name="socialMedia"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Social Media Handles</FormLabel>
                    <FormControl>
                      <Input placeholder="@instagram, @twitter, etc." {...field} />
                    </FormControl>
                    <FormDescription>
                      Please provide your social media handles where you're most active
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
              
              <FormField
                control={form.control}
                name="location"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>City/Region</FormLabel>
                    <FormControl>
                      <Input placeholder="Your city or region" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              
              <div className="space-y-2">
                <FormField
                  control={form.control}
                  name="isTeamMember"
                  render={({ field }) => (
                    <FormItem className="flex flex-row items-start space-x-3 space-y-0">
                      <FormControl>
                        <Checkbox 
                          checked={field.value} 
                          onCheckedChange={field.onChange} 
                        />
                      </FormControl>
                      <div className="space-y-1 leading-none">
                        <FormLabel>
                          Are you currently part of a club/team?
                        </FormLabel>
                      </div>
                    </FormItem>
                  )}
                />
                
                {form.watch('isTeamMember') && (
                  <FormField
                    control={form.control}
                    name="teamName"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Club/Team Name</FormLabel>
                        <FormControl>
                          <Input placeholder="Your club or team name" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                )}
              </div>
              
              <FormField
                control={form.control}
                name="whyRepresent"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Why do you want to represent RACE?</FormLabel>
                    <FormControl>
                      <Textarea 
                        placeholder="Tell us why you'd make a great ambassador..." 
                        className="min-h-[100px]"
                        {...field} 
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              
              <FormField
                control={form.control}
                name="experience"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Any experience with brand ambassadorship or content creation?</FormLabel>
                    <FormControl>
                      <Textarea 
                        placeholder="Share your relevant experience (optional)" 
                        className="min-h-[100px]"
                        {...field} 
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              
              <FormField
                control={form.control}
                name="promotionPlans"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>How would you promote RACE to your community?</FormLabel>
                    <FormControl>
                      <Textarea 
                        placeholder="Share your ideas for promoting RACE..." 
                        className="min-h-[100px]"
                        {...field} 
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              
              <FormField
                control={form.control}
                name="agreeTerms"
                render={({ field }) => (
                  <FormItem className="flex flex-row items-start space-x-3 space-y-0">
                    <FormControl>
                      <Checkbox 
                        checked={field.value} 
                        onCheckedChange={field.onChange} 
                      />
                    </FormControl>
                    <div className="space-y-1 leading-none">
                      <FormLabel>
                        I agree to RACE's ambassador program terms and conditions
                      </FormLabel>
                      <FormDescription>
                        By checking this box, you agree to promote RACE in accordance with our guidelines
                      </FormDescription>
                      <FormMessage />
                    </div>
                  </FormItem>
                )}
              />
              
              <div className="flex justify-end space-x-2 pt-4">
                <Button type="button" variant="outline" onClick={onClose}>
                  Cancel
                </Button>
                <Button type="submit" className="bg-race-red hover:bg-race-red/90">
                  Submit Application
                </Button>
              </div>
            </form>
          </Form>
        </div>
      </div>
    </div>
  );
};

export default AmbassadorForm;
