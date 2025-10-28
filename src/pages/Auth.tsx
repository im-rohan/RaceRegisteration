import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { ToggleGroup, ToggleGroupItem } from '@/components/ui/toggle-group';
import { Mail, User, Lock, AlertCircle, Building, MapPin, Globe } from 'lucide-react';
import { Checkbox } from '@/components/ui/checkbox';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { useAuth } from '@/contexts/AuthContext';
import { Alert, AlertDescription } from '@/components/ui/alert';

const Auth = () => {
  const { login, signup, user, isLoading, selectedRole, setSelectedRole } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [rememberMe, setRememberMe] = useState(false);
  const [error, setError] = useState('');
  
  // Organizer-specific fields
  const [companyName, setCompanyName] = useState('');
  const [city, setCity] = useState('');
  const [state, setState] = useState('');
  const [websiteUrl, setWebsiteUrl] = useState('');
  const [companyEmail, setCompanyEmail] = useState('');

  // Check if there's a redirect location
  const from = location.state?.from || '/';

  // Preselect role from query param if provided
  const params = new URLSearchParams(location.search);
  const roleParam = params.get('role');
  const tabParam = params.get('tab');
  useEffect(() => {
    if (roleParam === 'organizer' || roleParam === 'athlete') {
      setSelectedRole(roleParam as 'organizer' | 'athlete');
    } else {
      // Default to athlete if no role specified
      setSelectedRole('athlete');
    }
  }, [roleParam, setSelectedRole]);

  // Redirect if already logged in
  useEffect(() => {
    if (user) {
      navigate(from, {
        replace: true
      });
    }
  }, [user, navigate, from]);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    if (!email || !password) {
      setError('Email and password are required');
      return;
    }
    const success = await login(email, password);
    if (success) {
      navigate(from, {
        replace: true
      });
    }
  };

  const handleSignup = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    
    if (selectedRole === 'organizer') {
      if (!companyName || !city || !state || !companyEmail || !password) {
        setError('All fields are required');
        return;
      }
    } else {
      if (!name || !email || !password) {
        setError('All fields are required');
        return;
      }
    }
    
    if (password.length < 8) {
      setError('Password must be at least 8 characters');
      return;
    }
    
    const signupEmail = selectedRole === 'organizer' ? companyEmail : email;
    const signupName = selectedRole === 'organizer' ? companyName : name;
    const success = await signup(signupName, signupEmail, password);
    if (success) {
      navigate('/profile', { replace: true });
    }
  };

  return (
    <div className="min-h-[calc(100vh-64px)] flex flex-col justify-center py-12 pt-24 bg-race-gray">
      <div className="sm:mx-auto sm:w-full sm:max-w-md">
        <div className="flex justify-center">
          <img src="/lovable-uploads/08e4209e-11d4-4415-9745-42a4d0763c7b.png" alt="RACE R Logo" className="h-20 w-auto" />
        </div>
        <p className="mt-2 text-center text-lg text-gray-600">
          Your hub for all things endurance racing.
        </p>
      </div>

      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
        <div className="bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10">
          {error && (
            <Alert variant="destructive" className="mb-4">
              <AlertCircle className="h-4 w-4" />
              <AlertDescription>{error}</AlertDescription>
            </Alert>
          )}

          {/* Role Selector */}
          <div className="mb-6" role="group" aria-label="Select your role">
            <ToggleGroup 
              type="single" 
              value={selectedRole} 
              onValueChange={(value) => {
                if (value && (value === 'athlete' || value === 'organizer')) {
                  setSelectedRole(value as 'athlete' | 'organizer');
                }
              }}
              className="grid grid-cols-2 w-full rounded-full bg-gray-100 p-1"
            >
              <ToggleGroupItem 
                value="athlete" 
                className="rounded-full transition-all duration-300 data-[state=on]:bg-white data-[state=on]:text-foreground data-[state=on]:font-bold data-[state=off]:bg-transparent data-[state=off]:text-muted-foreground data-[state=off]:font-normal hover:bg-white/50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-race-red focus-visible:ring-offset-2"
                aria-label="Select Athlete role"
              >
                Athlete
              </ToggleGroupItem>
              <ToggleGroupItem 
                value="organizer" 
                className="rounded-full transition-all duration-300 data-[state=on]:bg-white data-[state=on]:text-foreground data-[state=on]:font-bold data-[state=off]:bg-transparent data-[state=off]:text-muted-foreground data-[state=off]:font-normal hover:bg-white/50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-race-red focus-visible:ring-offset-2"
                aria-label="Select Event Organizer role"
              >
                Event Organizer
              </ToggleGroupItem>
            </ToggleGroup>
          </div>

          <Tabs defaultValue={tabParam === 'signup' ? 'signup' : 'login'} className="w-full">
            <TabsList className="grid w-full grid-cols-2 mb-8">
              <TabsTrigger value="login">Login</TabsTrigger>
              <TabsTrigger value="signup">Sign Up</TabsTrigger>
            </TabsList>
            
            <TabsContent value="login">
              <form onSubmit={handleLogin} className="space-y-6">
                <div>
                  <Label htmlFor="email">Email</Label>
                  <div className="mt-1 relative">
                    <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
                    <Input 
                      id="email" 
                      type="email" 
                      value={email} 
                      onChange={(e) => setEmail(e.target.value)} 
                      placeholder="your@email.com" 
                      className="pl-10" 
                      required 
                    />
                  </div>
                </div>

                <div>
                  <div className="flex items-center justify-between">
                    <Label htmlFor="password">Password</Label>
                    <a href="/forgot-password" className="text-sm text-race-red hover:text-race-red/90">
                      Forgot password?
                    </a>
                  </div>
                  <div className="mt-1 relative">
                    <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
                    <Input 
                      id="password" 
                      type="password" 
                      value={password} 
                      onChange={(e) => setPassword(e.target.value)} 
                      placeholder="••••••••" 
                      className="pl-10" 
                      required 
                    />
                  </div>
                </div>

                <div className="flex items-center">
                  <div className="flex items-center">
                    <Checkbox 
                      id="remember-me" 
                      checked={rememberMe} 
                      onCheckedChange={(checked) => setRememberMe(checked as boolean)} 
                    />
                    <label htmlFor="remember-me" className="ml-2 block text-sm text-gray-900">
                      Remember me
                    </label>
                  </div>
                </div>

                <div>
                  <Button type="submit" className="w-full bg-race-red hover:bg-race-red/90" disabled={isLoading}>
                    {isLoading ? 'Signing in...' : 'Sign in'}
                  </Button>
                </div>
              </form>
            </TabsContent>
            
            <TabsContent value="signup">
              <form onSubmit={handleSignup} className="space-y-6">
                {selectedRole === 'organizer' ? (
                  <>
                    <div>
                      <Label htmlFor="company-name">Company Name</Label>
                      <div className="mt-1 relative">
                        <Building className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
                        <Input 
                          id="company-name" 
                          type="text" 
                          value={companyName} 
                          onChange={(e) => setCompanyName(e.target.value)} 
                          placeholder="ACME Racing Events" 
                          className="pl-10" 
                          required 
                        />
                      </div>
                    </div>
                    
                    <div>
                      <Label htmlFor="city">City</Label>
                      <div className="mt-1 relative">
                        <MapPin className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
                        <Input 
                          id="city" 
                          type="text" 
                          value={city} 
                          onChange={(e) => setCity(e.target.value)} 
                          placeholder="San Francisco" 
                          className="pl-10" 
                          required 
                        />
                      </div>
                    </div>
                    
                    <div>
                      <Label htmlFor="state">State</Label>
                      <Select value={state} onValueChange={setState} required>
                        <SelectTrigger>
                          <SelectValue placeholder="Select a state" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="AL">Alabama</SelectItem>
                          <SelectItem value="AK">Alaska</SelectItem>
                          <SelectItem value="AZ">Arizona</SelectItem>
                          <SelectItem value="AR">Arkansas</SelectItem>
                          <SelectItem value="CA">California</SelectItem>
                          <SelectItem value="CO">Colorado</SelectItem>
                          <SelectItem value="CT">Connecticut</SelectItem>
                          <SelectItem value="DE">Delaware</SelectItem>
                          <SelectItem value="FL">Florida</SelectItem>
                          <SelectItem value="GA">Georgia</SelectItem>
                          <SelectItem value="HI">Hawaii</SelectItem>
                          <SelectItem value="ID">Idaho</SelectItem>
                          <SelectItem value="IL">Illinois</SelectItem>
                          <SelectItem value="IN">Indiana</SelectItem>
                          <SelectItem value="IA">Iowa</SelectItem>
                          <SelectItem value="KS">Kansas</SelectItem>
                          <SelectItem value="KY">Kentucky</SelectItem>
                          <SelectItem value="LA">Louisiana</SelectItem>
                          <SelectItem value="ME">Maine</SelectItem>
                          <SelectItem value="MD">Maryland</SelectItem>
                          <SelectItem value="MA">Massachusetts</SelectItem>
                          <SelectItem value="MI">Michigan</SelectItem>
                          <SelectItem value="MN">Minnesota</SelectItem>
                          <SelectItem value="MS">Mississippi</SelectItem>
                          <SelectItem value="MO">Missouri</SelectItem>
                          <SelectItem value="MT">Montana</SelectItem>
                          <SelectItem value="NE">Nebraska</SelectItem>
                          <SelectItem value="NV">Nevada</SelectItem>
                          <SelectItem value="NH">New Hampshire</SelectItem>
                          <SelectItem value="NJ">New Jersey</SelectItem>
                          <SelectItem value="NM">New Mexico</SelectItem>
                          <SelectItem value="NY">New York</SelectItem>
                          <SelectItem value="NC">North Carolina</SelectItem>
                          <SelectItem value="ND">North Dakota</SelectItem>
                          <SelectItem value="OH">Ohio</SelectItem>
                          <SelectItem value="OK">Oklahoma</SelectItem>
                          <SelectItem value="OR">Oregon</SelectItem>
                          <SelectItem value="PA">Pennsylvania</SelectItem>
                          <SelectItem value="RI">Rhode Island</SelectItem>
                          <SelectItem value="SC">South Carolina</SelectItem>
                          <SelectItem value="SD">South Dakota</SelectItem>
                          <SelectItem value="TN">Tennessee</SelectItem>
                          <SelectItem value="TX">Texas</SelectItem>
                          <SelectItem value="UT">Utah</SelectItem>
                          <SelectItem value="VT">Vermont</SelectItem>
                          <SelectItem value="VA">Virginia</SelectItem>
                          <SelectItem value="WA">Washington</SelectItem>
                          <SelectItem value="WV">West Virginia</SelectItem>
                          <SelectItem value="WI">Wisconsin</SelectItem>
                          <SelectItem value="WY">Wyoming</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    
                    <div>
                      <Label htmlFor="website-url">Website URL</Label>
                      <div className="mt-1 relative">
                        <Globe className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
                        <Input 
                          id="website-url" 
                          type="text" 
                          value={websiteUrl} 
                          onChange={(e) => setWebsiteUrl(e.target.value)} 
                          placeholder="acmeracingevents.com" 
                          className="pl-10" 
                        />
                      </div>
                    </div>
                    
                    <div>
                      <Label htmlFor="company-email">Company Email</Label>
                      <div className="mt-1 relative">
                        <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
                        <Input 
                          id="company-email" 
                          type="email" 
                          value={companyEmail} 
                          onChange={(e) => setCompanyEmail(e.target.value)} 
                          placeholder="contact@acmeracingevents.com" 
                          className="pl-10" 
                          required 
                        />
                      </div>
                    </div>
                  </>
                ) : (
                  <>
                    <div>
                      <Label htmlFor="name">Full Name</Label>
                      <div className="mt-1 relative">
                        <User className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
                        <Input 
                          id="name" 
                          type="text" 
                          value={name} 
                          onChange={(e) => setName(e.target.value)} 
                          placeholder="John Doe" 
                          className="pl-10" 
                          required 
                        />
                      </div>
                    </div>
                    
                    <div>
                      <Label htmlFor="signup-email">Email</Label>
                      <div className="mt-1 relative">
                        <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
                        <Input 
                          id="signup-email" 
                          type="email" 
                          value={email} 
                          onChange={(e) => setEmail(e.target.value)} 
                          placeholder="your@email.com" 
                          className="pl-10" 
                          required 
                        />
                      </div>
                    </div>
                  </>
                )}

                <div>
                  <Label htmlFor="signup-password">Password</Label>
                  <div className="mt-1 relative">
                    <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
                    <Input 
                      id="signup-password" 
                      type="password" 
                      value={password} 
                      onChange={(e) => setPassword(e.target.value)} 
                      placeholder="••••••••" 
                      className="pl-10" 
                      required 
                    />
                  </div>
                  <p className="text-xs text-gray-500 mt-1">
                    Must be at least 8 characters and include a number
                  </p>
                </div>

                <div>
                  <Button type="submit" className="w-full bg-race-red hover:bg-race-red/90" disabled={isLoading}>
                    {isLoading ? 'Creating Account...' : 'Create Account'}
                  </Button>
                </div>
              </form>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </div>
  );
};

export default Auth;