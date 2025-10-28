import React, { useState } from 'react';
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Search, TrendingUp, Award, ChevronDown } from 'lucide-react';
import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";
import { newsData, newsCategories } from '@/data/eventData';
const News = () => {
  const [activeCategory, setActiveCategory] = useState<string>("all");
  const [searchQuery, setSearchQuery] = useState<string>("");

  // Filter articles based on active category and search query
  const filteredArticles = newsData.filter(article => {
    const matchesCategory = activeCategory === "all" || article.category.toLowerCase() === activeCategory.toLowerCase();
    const matchesSearch = article.title.toLowerCase().includes(searchQuery.toLowerCase()) || article.excerpt.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });
  return <div className="min-h-screen bg-white pt-16">
      {/* Featured Article */}
      {filteredArticles.length > 0 && activeCategory === "all" && !searchQuery && <section className="container mx-auto px-4 -mt-8 pb-10">
          <h2 className="font-bold mb-6 text-5xl text-center">The Latest.</h2>
          <div className="bg-white rounded-lg overflow-hidden shadow-lg mb-8">
            <div className="relative h-96">
              <img src={filteredArticles[0].imageUrl} alt={filteredArticles[0].title} className="w-full h-full object-cover" />
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent flex flex-col justify-end p-8">
                <h3 className="text-white text-3xl font-bold mb-2">{filteredArticles[0].title}</h3>
                <p className="text-white/80 mb-4">{filteredArticles[0].excerpt}</p>
                <Button className="bg-white text-race-black hover:bg-gray-100 w-fit">
                  Read More
                </Button>
              </div>
            </div>
          </div>
        </section>}

      {/* Category Tabs and Search - Now below the featured article */}
      <section className="container mx-auto px-4 pb-8">
        <div className="flex flex-col md:flex-row justify-between items-center mb-10 gap-4">
          <Tabs defaultValue="all" className="w-full md:w-auto" onValueChange={setActiveCategory}>
            <TabsList className="bg-gray-100 p-1 rounded-lg w-full md:w-auto overflow-x-auto flex-nowrap">
              <TabsTrigger value="all">All</TabsTrigger>
              {newsCategories.map(category => <TabsTrigger key={category} value={category.toLowerCase()}>
                  {category}
                </TabsTrigger>)}
            </TabsList>
          </Tabs>
          
          <div className="relative w-full md:w-64">
            <Input className="pl-10" placeholder="Search articles..." value={searchQuery} onChange={e => setSearchQuery(e.target.value)} />
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
          </div>
        </div>

        {/* Articles Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredArticles.length > 0 ? activeCategory === "all" && !searchQuery ? filteredArticles.slice(1).map(article => <ArticleCard key={article.id} article={article} />) : filteredArticles.map(article => <ArticleCard key={article.id} article={article} />) : <p className="col-span-full text-center py-10 text-gray-500">
                No articles found matching your search.
              </p>}
        </div>
      </section>

      {/* Newsletter CTA */}
      <section className="bg-race-gray py-16 mt-20">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-4">Get the latest endurance tips in your inbox</h2>
          <p className="text-race-darkgray mb-8 max-w-2xl mx-auto">
            Subscribe to our newsletter and stay ahead of the pack with exclusive training tips, nutrition advice, and athlete interviews.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center max-w-md mx-auto">
            <Input type="email" placeholder="Your email address" className="bg-white" />
            <Button className="bg-race-red hover:bg-race-red/90 text-white">
              Subscribe
            </Button>
          </div>
        </div>
      </section>
    </div>;
};
type ArticleCardProps = {
  article: {
    id: string;
    title: string;
    category: string;
    imageUrl: string;
    excerpt: string;
    date: string;
    isNew?: boolean;
  };
};
const ArticleCard = ({
  article
}: ArticleCardProps) => {
  return <Card className="overflow-hidden h-full flex flex-col">
      <div className="relative">
        <img src={article.imageUrl} alt={article.title} className="w-full h-48 object-cover" />
        {article.isNew && <span className="absolute top-3 left-3 bg-race-black text-white px-3 py-1 text-xs font-bold rounded">
            NEW
          </span>}
        <span className="absolute bottom-3 left-3 bg-white text-race-black px-3 py-1 text-xs font-semibold rounded">
          {article.category}
        </span>
      </div>
      <CardContent className="flex flex-col flex-grow p-5">
        <h3 className="text-xl font-bold mb-2">{article.title}</h3>
        <p className="text-race-darkgray text-sm mb-4 flex-grow">{article.excerpt}</p>
        <div className="flex justify-between items-center">
          <span className="text-xs text-race-darkgray">{article.date}</span>
          <Button variant="link" className="text-race-red p-0 h-auto">
            Read More
          </Button>
        </div>
      </CardContent>
    </Card>;
};
export default News;