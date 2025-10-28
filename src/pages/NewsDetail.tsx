
import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { Calendar, User, Tag, ArrowLeft, Share } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { newsData } from '@/data/eventData';

// Extended interface to include the optional properties
interface NewsArticle {
  id: string;
  title: string;
  category: string;
  excerpt: string;
  date: string;
  imageUrl: string;
  content?: string;
  author?: string;
  tags?: string[];
  isNew?: boolean;
}

const NewsDetail = () => {
  const { id } = useParams<{ id: string }>();
  const article = newsData.find(news => news.id === id) as NewsArticle;

  // Generate mock content if none exists
  const generateContent = () => {
    return `
      <p class="mb-4">
        The ${article.title} event was an incredible showcase of athletic talent and endurance. Athletes from around the world gathered to test their limits and push beyond what they thought possible.
      </p>
      <p class="mb-4">
        With perfect weather conditions and a stunning course, participants were treated to an unforgettable experience. The competition was fierce but friendly, embodying the spirit of endurance sports.
      </p>
      <h3 class="text-xl font-bold my-4">Notable Achievements</h3>
      <p class="mb-4">
        Several course records were broken, with the winner finishing in an astonishing time. The community support was phenomenal, with locals lining the route to cheer on competitors.
      </p>
      <p class="mb-4">
        Organizers expressed their satisfaction with the event's success and have already begun planning for next year's edition, which promises to be even bigger and better.
      </p>
      <h3 class="text-xl font-bold my-4">Looking Ahead</h3>
      <p>
        Registration for next year will open soon, and early bird discounts will be available. Don't miss your chance to be part of this growing tradition in the world of endurance sports.
      </p>
    `;
  };

  if (!article) {
    return (
      <div className="container mx-auto px-4 py-16 text-center">
        <h1 className="text-2xl font-bold mb-4">Article not found</h1>
        <Button asChild>
          <Link to="/news">Back to News</Link>
        </Button>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white pt-24 pb-16">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        {/* Breadcrumb */}
        <div className="mb-8">
          <Button variant="ghost" asChild className="p-0 hover:bg-transparent">
            <Link to="/news" className="flex items-center text-race-red hover:text-red-700">
              <ArrowLeft className="h-4 w-4 mr-2" />
              Back to News
            </Link>
          </Button>
        </div>
        
        {/* Article header */}
        <div className="mb-8">
          <h1 className="text-3xl md:text-4xl font-bold mb-4">{article.title}</h1>
          
          <div className="flex flex-wrap items-center text-sm text-gray-500 gap-x-4 gap-y-2 mb-6">
            <div className="flex items-center">
              <Calendar className="h-4 w-4 mr-1" />
              {article.date}
            </div>
            
            {article.author && (
              <div className="flex items-center">
                <User className="h-4 w-4 mr-1" />
                {article.author}
              </div>
            )}
            
            <div className="flex items-center">
              <Tag className="h-4 w-4 mr-1" />
              {article.category}
            </div>
          </div>
        </div>
        
        {/* Featured image */}
        <div className="mb-8">
          <img 
            src={article.imageUrl} 
            alt={article.title}
            className="w-full h-auto rounded-lg object-cover"
            style={{ maxHeight: '500px' }}
          />
        </div>
        
        {/* Article content */}
        <div className="prose max-w-none mb-8">
          <div dangerouslySetInnerHTML={{ __html: article.content || generateContent() }} />
        </div>
        
        {/* Tags */}
        {article.tags && article.tags.length > 0 && (
          <div className="flex flex-wrap gap-2 mb-8">
            {article.tags.map(tag => (
              <span key={tag} className="bg-race-gray text-sm px-3 py-1 rounded-full">
                {tag}
              </span>
            ))}
          </div>
        )}
        
        {/* Share buttons */}
        <div className="border-t border-gray-200 pt-6">
          <div className="flex items-center">
            <span className="text-sm font-medium mr-4">Share this article:</span>
            <div className="flex gap-2">
              <Button variant="outline" size="icon" className="rounded-full">
                <span className="sr-only">Share on Twitter</span>
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" viewBox="0 0 16 16" className="h-4 w-4">
                  <path d="M12.6.75h2.454l-5.36 6.142L16 15.25h-4.937l-3.867-5.07-4.425 5.07H.316l5.733-6.57L0 .75h5.063l3.495 4.633L12.601.75Zm-.86 13.028h1.36L4.323 2.145H2.865l8.875 11.633Z"/>
                </svg>
              </Button>
              <Button variant="outline" size="icon" className="rounded-full">
                <span className="sr-only">Share on Facebook</span>
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" viewBox="0 0 320 512" className="h-4 w-4">
                  <path d="M279.14 288l14.22-92.66h-88.91v-60.13c0-25.35 12.42-50.06 52.24-50.06h40.42V6.26S260.43 0 225.36 0c-73.22 0-121.08 44.38-121.08 124.72v70.62H22.89V288h81.39v224h100.17V288z"/>
                </svg>
              </Button>
              <Button variant="outline" size="icon" className="rounded-full">
                <span className="sr-only">Share on LinkedIn</span>
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" viewBox="0 0 448 512" className="h-4 w-4">
                  <path d="M100.28 448H7.4V148.9h92.88zM53.79 108.1C24.09 108.1 0 83.5 0 53.8a53.79 53.79 0 0 1 107.58 0c0 29.7-24.1 54.3-53.79 54.3zM447.9 448h-92.68V302.4c0-34.7-.7-79.2-48.29-79.2-48.29 0-55.69 37.7-55.69 76.7V448h-92.78V148.9h89.08v40.8h1.3c12.4-23.5 42.69-48.3 87.88-48.3 94 0 111.28 61.9 111.28 142.3V448z"/>
                </svg>
              </Button>
              <Button variant="outline" size="icon" className="rounded-full">
                <span className="sr-only">Share via Email</span>
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" viewBox="0 0 16 16" className="h-4 w-4">
                  <path d="M.05 3.555A2 2 0 0 1 2 2h12a2 2 0 0 1 1.95 1.555L8 8.414.05 3.555ZM0 4.697v7.104l5.803-3.558L0 4.697ZM6.761 8.83l-6.57 4.027A2 2 0 0 0 2 14h12a2 2 0 0 0 1.808-1.144l-6.57-4.027L8 9.586l-1.239-.757Zm3.436-.586L16 11.801V4.697l-5.803 3.546Z"/>
                </svg>
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NewsDetail;
