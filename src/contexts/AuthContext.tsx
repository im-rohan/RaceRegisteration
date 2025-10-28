
import React, { createContext, useContext, useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from '@/components/ui/use-toast';

type User = {
  id: string;
  name: string;
  email: string;
  isRacePlus: boolean;
  memberSince?: string;
};

type AuthContextType = {
  user: User | null;
  isLoading: boolean;
  selectedRole: "organizer" | "athlete";
  setSelectedRole: (role: "organizer" | "athlete") => void;
  login: (email: string, password: string) => Promise<boolean>;
  signup: (name: string, email: string, password: string) => Promise<boolean>;
  logout: () => void;
};


// Create the context
const AuthContext = createContext<AuthContextType | undefined>(undefined);

// Mock users for demo purposes
const mockUsers = [
  {
    id: '1',
    email: 'user@example.com',
    password: 'password',
    name: 'Demo User',
    isRacePlus: false,
    memberSince: '2024-05-01'
  },
  {
    id: '2',
    email: 'premium@example.com',
    password: 'password',
    name: 'Premium User',
    isRacePlus: true,
    memberSince: '2023-11-15'
  }
];

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [selectedRole, setSelectedRoleState] = useState<"organizer" | "athlete">(
    (localStorage.getItem('raceSelectedRole') as "organizer" | "athlete") || 'athlete'
  );
  const navigate = useNavigate();


  useEffect(() => {
    // Check for existing session in localStorage
    const savedUser = localStorage.getItem('raceUser');
    if (savedUser) {
      try {
        setUser(JSON.parse(savedUser));
      } catch (error) {
        console.error('Failed to parse saved user:', error);
        localStorage.removeItem('raceUser');
      }
    }
    setIsLoading(false);
  }, []);

  const setSelectedRole = (role: "organizer" | "athlete") => {
    setSelectedRoleState(role);
    localStorage.setItem('raceSelectedRole', role);
  };

  const login = async (email: string, password: string): Promise<boolean> => {
    setIsLoading(true);
    
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    try {
      const foundUser = mockUsers.find(u => u.email.toLowerCase() === email.toLowerCase());
      
      if (foundUser && foundUser.password === password) {
        // Remove password from user object before storing
        const { password: _, ...userWithoutPassword } = foundUser;
        setUser(userWithoutPassword);
        localStorage.setItem('raceUser', JSON.stringify(userWithoutPassword));
        toast({
          title: "Login successful!",
          description: `Welcome back, ${foundUser.name}!`,
        });
        setIsLoading(false);
        return true;
      } else {
        toast({
          variant: "destructive",
          title: "Login failed",
          description: "Invalid email or password",
        });
        setIsLoading(false);
        return false;
      }
    } catch (error) {
      console.error('Login error:', error);
      toast({
        variant: "destructive",
        title: "Login failed",
        description: "An unexpected error occurred",
      });
      setIsLoading(false);
      return false;
    }
  };

  const signup = async (name: string, email: string, password: string): Promise<boolean> => {
    setIsLoading(true);
    
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    try {
      // Check if email is already in use
      if (mockUsers.some(u => u.email.toLowerCase() === email.toLowerCase())) {
        toast({
          variant: "destructive",
          title: "Signup failed",
          description: "Email is already in use",
        });
        setIsLoading(false);
        return false;
      }
      
      // Create new user
      const newUser = {
        id: String(mockUsers.length + 1),
        name,
        email,
        isRacePlus: false,
        memberSince: new Date().toISOString().split('T')[0]
      };
      
      // In a real implementation, we would save this to a database
      // For now, we just update the local state
      setUser(newUser);
      localStorage.setItem('raceUser', JSON.stringify(newUser));
      
      toast({
        title: "Signup successful!",
        description: `Welcome to RACE, ${name}!`,
      });
      
      setIsLoading(false);
      return true;
    } catch (error) {
      console.error('Signup error:', error);
      toast({
        variant: "destructive",
        title: "Signup failed",
        description: "An unexpected error occurred",
      });
      setIsLoading(false);
      return false;
    }
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('raceUser');
    toast({
      title: "Logged out",
      description: "You have been successfully logged out",
    });
    navigate('/');
  };

  return (
    <AuthContext.Provider value={{ user, isLoading, selectedRole, setSelectedRole, login, signup, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
