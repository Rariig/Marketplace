import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

const PlayGrid = ({ plays, currentUserId, isAdmin }) => {
  // Group plays by topic
  const groupedPlays = plays.reduce((acc, play) => {
    // Only show plays that are either public (created by admin) or owned by current user
    if (play.createdBy === process.env.NEXT_PUBLIC_ADMIN_ID || play.createdBy === currentUserId) {
      acc[play.topic] = acc[play.topic] || [];
      acc[play.topic].push(play);
    }
    return acc;
  }, {});

  const topics = Object.keys(groupedPlays);

  return (
    <div className="w-full max-w-7xl mx-auto p-4">
      <Tabs defaultValue={topics[0]} className="w-full">
        <TabsList className="mb-4">
          {topics.map(topic => (
            <TabsTrigger key={topic} value={topic} className="px-4 py-2">
              {topic}
            </TabsTrigger>
          ))}
        </TabsList>

        {topics.map(topic => (
          <TabsContent key={topic} value={topic}>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {groupedPlays[topic].map(play => (
                <Card 
                  key={play.id} 
                  className="group cursor-pointer hover:shadow-lg transition-shadow"
                  onClick={() => window.location.href = `/plays/${play.id}`}
                >
                  <div 
                    className="relative h-48 w-full"
                    style={{
                      backgroundImage: play.imageUrl ? `url(${play.imageUrl})` : 'none',
                      backgroundSize: 'cover',
                      backgroundPosition: 'center',
                      backgroundColor: play.imageUrl ? 'transparent' : '#f3f4f6'
                    }}
                  >
                    <div className="absolute inset-0 bg-black bg-opacity-40 group-hover:bg-opacity-30 transition-opacity">
                      <CardContent className="h-full flex flex-col justify-end p-4">
                        <h3 className="text-xl font-bold text-white mb-2">
                          {play.name}
                        </h3>
                        {play.createdBy === process.env.NEXT_PUBLIC_ADMIN_ID && (
                          <span className="text-sm text-white bg-blue-500 px-2 py-1 rounded-full inline-block w-fit">
                            Default Play
                          </span>
                        )}
                      </CardContent>
                    </div>
                  </div>
                </Card>
              ))}
            </div>
          </TabsContent>
        ))}
      </Tabs>
    </div>
  );
};

export default PlayGrid;