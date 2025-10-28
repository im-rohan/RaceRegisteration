
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { useToast } from '@/components/ui/use-toast';
import AmbassadorForm from '@/components/AmbassadorForm';

const Ambassador = () => {
  const [showForm, setShowForm] = useState(false);
  
  return (
    <div className="pt-20">
      {/* Hero Section */}
      <section className="relative bg-race-black text-white py-20 md:py-32">
        <div className="absolute inset-0 z-0 opacity-30">
          <img
            src="https://images.unsplash.com/photo-1541252260730-0412e8e2108e?q=80&w=1974&auto=format&fit=crop"
            alt="Athletes background"
            className="w-full h-full object-cover"
          />
        </div>
        <div className="container mx-auto px-4 relative z-10">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="text-center max-w-3xl mx-auto"
          >
            <h1 className="text-4xl md:text-5xl font-bold mb-4">Become a RACE Endurance Ambassador</h1>
            <p className="text-xl md:text-2xl text-gray-200 mb-8">Grow with us. Inspire others. Get rewarded.</p>
            <Button 
              onClick={() => setShowForm(true)} 
              size="lg"
              className="bg-race-red hover:bg-race-red/90 text-white px-8 py-6 text-lg"
            >
              Apply Now
            </Button>
          </motion.div>
        </div>
      </section>

      {/* Program Overview */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12">Ambassador Program Benefits</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
              viewport={{ once: true }}
              className="bg-gray-50 p-6 rounded-lg shadow-sm"
            >
              <div className="w-16 h-16 bg-race-red/10 rounded-full flex items-center justify-center mb-4 mx-auto">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-8 h-8 text-race-red">
                  <path d="m12 15-2 4m2-4 2 4m-2-4V3m0 12h8a2 2 0 0 0 2-2v-1a2 2 0 0 0-2-2h-8m0 5H4a2 2 0 0 1-2-2v-1a2 2 0 0 1 2-2h8"></path>
                </svg>
              </div>
              <h3 className="text-xl font-semibold text-center mb-2">Share Your Passion</h3>
              <p className="text-gray-600 text-center">Connect with fellow endurance enthusiasts and inspire others with your athletic journey.</p>
            </motion.div>
            
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              viewport={{ once: true }}
              className="bg-gray-50 p-6 rounded-lg shadow-sm"
            >
              <div className="w-16 h-16 bg-race-red/10 rounded-full flex items-center justify-center mb-4 mx-auto">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-8 h-8 text-race-red">
                  <path d="M6 8a6 6 0 0 1 12 0c0 7 3 9 3 9H3s3-2 3-9"></path>
                  <path d="M10.3 21a1.94 1.94 0 0 0 3.4 0"></path>
                </svg>
              </div>
              <h3 className="text-xl font-semibold text-center mb-2">Early Access</h3>
              <p className="text-gray-600 text-center">Be the first to try new RACE features and events before they're available to the public.</p>
            </motion.div>
            
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.3 }}
              viewport={{ once: true }}
              className="bg-gray-50 p-6 rounded-lg shadow-sm"
            >
              <div className="w-16 h-16 bg-race-red/10 rounded-full flex items-center justify-center mb-4 mx-auto">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-8 h-8 text-race-red">
                  <path d="M12 1v22"></path>
                  <path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"></path>
                </svg>
              </div>
              <h3 className="text-xl font-semibold text-center mb-2">Earn Rewards</h3>
              <p className="text-gray-600 text-center">Get exclusive discounts, free gear, and commission for every successful referral.</p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-4">How Our Referral Program Works</h2>
          <p className="text-gray-600 text-center max-w-2xl mx-auto mb-12">As a RACE Ambassador, you'll earn rewards for every athlete you bring to our platform.</p>
          
          <div className="max-w-4xl mx-auto">
            <div className="relative">
              {/* Timeline line */}
              <div className="absolute left-0 md:left-1/2 transform md:translate-x-[-50%] top-0 bottom-0 w-1 bg-race-red/20"></div>
              
              {/* Timeline items */}
              <div className="grid grid-cols-1 gap-y-12">
                {/* Step 1 */}
                <motion.div 
                  initial={{ opacity: 0, x: -50 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.5 }}
                  viewport={{ once: true }}
                  className="relative flex flex-col md:flex-row"
                >
                  <div className="md:w-1/2 pr-0 md:pr-8 flex justify-start md:justify-end mb-4 md:mb-0">
                    <div className="bg-white p-6 rounded-lg shadow-sm max-w-xs">
                      <h3 className="font-bold text-xl mb-2 text-race-black">Get Your Unique Code</h3>
                      <p className="text-gray-600">Once accepted as an ambassador, you'll receive a personalized referral link and code.</p>
                    </div>
                  </div>
                  <div className="absolute left-0 md:left-1/2 transform md:translate-x-[-50%] w-10 h-10 rounded-full bg-race-red flex items-center justify-center text-white font-bold">1</div>
                  <div className="md:w-1/2 pl-12 md:pl-8"></div>
                </motion.div>
                
                {/* Step 2 */}
                <motion.div 
                  initial={{ opacity: 0, x: 50 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.5 }}
                  viewport={{ once: true }}
                  className="relative flex flex-col md:flex-row"
                >
                  <div className="md:w-1/2 pr-12 md:pr-8"></div>
                  <div className="absolute left-0 md:left-1/2 transform md:translate-x-[-50%] w-10 h-10 rounded-full bg-race-red flex items-center justify-center text-white font-bold">2</div>
                  <div className="md:w-1/2 pl-0 md:pl-8 flex justify-start mb-4 md:mb-0">
                    <div className="bg-white p-6 rounded-lg shadow-sm max-w-xs">
                      <h3 className="font-bold text-xl mb-2 text-race-black">Share With Your Network</h3>
                      <p className="text-gray-600">Promote RACE events on social media, in your local community, or with your athletic club.</p>
                    </div>
                  </div>
                </motion.div>
                
                {/* Step 3 */}
                <motion.div 
                  initial={{ opacity: 0, x: -50 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.5 }}
                  viewport={{ once: true }}
                  className="relative flex flex-col md:flex-row"
                >
                  <div className="md:w-1/2 pr-0 md:pr-8 flex justify-start md:justify-end mb-4 md:mb-0">
                    <div className="bg-white p-6 rounded-lg shadow-sm max-w-xs">
                      <h3 className="font-bold text-xl mb-2 text-race-black">Track Referrals</h3>
                      <p className="text-gray-600">Monitor your referrals and earnings through your Ambassador dashboard.</p>
                    </div>
                  </div>
                  <div className="absolute left-0 md:left-1/2 transform md:translate-x-[-50%] w-10 h-10 rounded-full bg-race-red flex items-center justify-center text-white font-bold">3</div>
                  <div className="md:w-1/2 pl-12 md:pl-8"></div>
                </motion.div>
                
                {/* Step 4 */}
                <motion.div 
                  initial={{ opacity: 0, x: 50 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.5 }}
                  viewport={{ once: true }}
                  className="relative flex flex-col md:flex-row"
                >
                  <div className="md:w-1/2 pr-12 md:pr-8"></div>
                  <div className="absolute left-0 md:left-1/2 transform md:translate-x-[-50%] w-10 h-10 rounded-full bg-race-red flex items-center justify-center text-white font-bold">4</div>
                  <div className="md:w-1/2 pl-0 md:pl-8 flex justify-start mb-4 md:mb-0">
                    <div className="bg-white p-6 rounded-lg shadow-sm max-w-xs">
                      <h3 className="font-bold text-xl mb-2 text-race-black">Get Rewarded</h3>
                      <p className="text-gray-600">Earn 10% commission on every successful registration, plus bonus rewards when you hit milestones.</p>
                    </div>
                  </div>
                </motion.div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12">Meet Our Ambassadors</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              viewport={{ once: true }}
              className="bg-gray-50 p-6 rounded-lg shadow-sm"
            >
              <div className="w-20 h-20 rounded-full overflow-hidden mb-4 mx-auto">
                <img 
                  src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=1974&auto=format&fit=crop" 
                  alt="Ambassador" 
                  className="w-full h-full object-cover"
                />
              </div>
              <h3 className="text-xl font-semibold text-center mb-1">Sarah K.</h3>
              <p className="text-gray-500 text-center mb-3">Triathlete & Coach</p>
              <p className="text-gray-600 italic text-center">"Being a RACE ambassador has connected me with an incredible community of athletes and given my coaching business more visibility."</p>
            </motion.div>
            
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
              viewport={{ once: true }}
              className="bg-gray-50 p-6 rounded-lg shadow-sm"
            >
              <div className="w-20 h-20 rounded-full overflow-hidden mb-4 mx-auto">
                <img 
                  src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=1974&auto=format&fit=crop" 
                  alt="Ambassador" 
                  className="w-full h-full object-cover"
                />
              </div>
              <h3 className="text-xl font-semibold text-center mb-1">David L.</h3>
              <p className="text-gray-500 text-center mb-3">Marathon Runner</p>
              <p className="text-gray-600 italic text-center">"I've earned enough commission from my running club referrals to fund my race entries for the entire season!"</p>
            </motion.div>
            
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              viewport={{ once: true }}
              className="bg-gray-50 p-6 rounded-lg shadow-sm"
            >
              <div className="w-20 h-20 rounded-full overflow-hidden mb-4 mx-auto">
                <img 
                  src="https://images.unsplash.com/photo-1489424731084-a5d8b219a5bb?q=80&w=1974&auto=format&fit=crop" 
                  alt="Ambassador" 
                  className="w-full h-full object-cover"
                />
              </div>
              <h3 className="text-xl font-semibold text-center mb-1">Maya J.</h3>
              <p className="text-gray-500 text-center mb-3">Cycling Influencer</p>
              <p className="text-gray-600 italic text-center">"The exclusive RACE gear and early access to events gives me great content for my social channels while rewarding my followers."</p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-race-black text-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-4">Ready to Join The RACE Ambassador Team?</h2>
          <p className="text-xl text-gray-300 mb-8 max-w-2xl mx-auto">Apply today and start earning rewards while sharing your passion for endurance sports with your community.</p>
          <Button 
            onClick={() => setShowForm(true)} 
            size="lg"
            className="bg-race-red hover:bg-race-red/90 text-white px-8 py-6 text-lg"
          >
            Apply Now
          </Button>
        </div>
      </section>

      {/* Application Form Modal */}
      {showForm && <AmbassadorForm onClose={() => setShowForm(false)} />}
    </div>
  );
};

export default Ambassador;
