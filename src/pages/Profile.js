import  React from "react"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { CalendarDays, Edit, Github, Instagram, MapPin, MessageSquare, Share2, Twitter, Users } from "lucide-react"

const ProfilePage = () => {
  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-50 to-slate-100 dark:from-slate-950 dark:to-slate-900">
      <div className="container mx-auto px-4 py-8">
        <div className="grid gap-8 md:grid-cols-3">
          {/* Profile Info Card */}
          <Card className="md:col-span-1">
            <CardHeader className="relative pb-0">
              <div className="absolute right-4 top-4 flex gap-2">
                <Button variant="ghost" size="icon">
                  <Share2 className="h-4 w-4" />
                </Button>
                <Button variant="ghost" size="icon">
                  <Edit className="h-4 w-4" />
                </Button>
              </div>
              <div className="flex flex-col items-center">
                <div className="relative">
                  <Avatar className="h-24 w-24 border-4 border-background">
                    <AvatarImage src="https://via.placeholder.com/96" alt="Alex Johnson" />
                    <AvatarFallback>AJ</AvatarFallback>
                  </Avatar>
                  <div className="absolute bottom-0 right-0 h-5 w-5 rounded-full bg-green-500 border-2 border-background"></div>
                </div>
                <h2 className="mt-4 text-2xl font-bold">Alex Johnson</h2>
                <p className="text-muted-foreground">Senior Product Designer</p>
                <div className="mt-2 flex items-center text-sm text-muted-foreground">
                  <MapPin className="mr-1 h-4 w-4" />
                  <span>San Francisco, CA</span>
                </div>
              </div>
            </CardHeader>
            <CardContent className="pt-6">
              <div className="flex justify-center gap-4 mb-6">
                <Button variant="outline" size="sm" className="flex gap-2">
                  <Users className="h-4 w-4" />
                  Follow
                </Button>
                <Button size="sm" className="flex gap-2">
                  <MessageSquare className="h-4 w-4" />
                  Message
                </Button>
              </div>

              <div className="grid grid-cols-3 gap-4 text-center mb-6">
                <div>
                  <p className="text-xl font-bold">142</p>
                  <p className="text-xs text-muted-foreground">Posts</p>
                </div>
                <div>
                  <p className="text-xl font-bold">2.8k</p>
                  <p className="text-xs text-muted-foreground">Followers</p>
                </div>
                <div>
                  <p className="text-xl font-bold">268</p>
                  <p className="text-xs text-muted-foreground">Following</p>
                </div>
              </div>

              <div className="space-y-4">
                <div>
                  <h3 className="mb-2 text-sm font-medium">About</h3>
                  <p className="text-sm text-muted-foreground">
                    Product designer with 5+ years of experience creating user-centered digital experiences for startups
                    and established companies.
                  </p>
                </div>

                <div>
                  <h3 className="mb-2 text-sm font-medium">Skills</h3>
                  <div className="flex flex-wrap gap-2">
                    <Badge variant="secondary">UI Design</Badge>
                    <Badge variant="secondary">UX Research</Badge>
                    <Badge variant="secondary">Prototyping</Badge>
                    <Badge variant="secondary">Figma</Badge>
                    <Badge variant="secondary">Design Systems</Badge>
                  </div>
                </div>

                <div>
                  <h3 className="mb-2 text-sm font-medium">Social</h3>
                  <div className="flex gap-3">
                    <Button variant="outline" size="icon">
                      <Twitter className="h-4 w-4" />
                    </Button>
                    <Button variant="outline" size="icon">
                      <Instagram className="h-4 w-4" />
                    </Button>
                    <Button variant="outline" size="icon">
                      <Github className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Content Area */}
          <div className="md:col-span-2 space-y-8">
            {/* Stats Cards */}
            <div className="grid gap-4 md:grid-cols-3">
              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-sm font-medium">Projects Completed</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">38</div>
                  <p className="text-xs text-muted-foreground">+5 from last month</p>
                </CardContent>
              </Card>
              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-sm font-medium">Hours Logged</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">1,248</div>
                  <p className="text-xs text-muted-foreground">+124 from last month</p>
                </CardContent>
              </Card>
              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-sm font-medium">Satisfaction Rate</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">98%</div>
                  <p className="text-xs text-muted-foreground">+2% from last month</p>
                </CardContent>
              </Card>
            </div>

            {/* Tabs Content */}
            <Tabs defaultValue="portfolio" className="w-full">
              <TabsList className="grid w-full grid-cols-3">
                <TabsTrigger value="portfolio">Portfolio</TabsTrigger>
                <TabsTrigger value="activity">Activity</TabsTrigger>
                <TabsTrigger value="experience">Experience</TabsTrigger>
              </TabsList>

              <TabsContent value="portfolio" className="mt-6">
                <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                  {[1, 2, 3, 4, 5, 6].map((item) => (
                    <Card key={item} className="overflow-hidden">
                      <div className="aspect-square w-full bg-muted relative group">
                        <img
                          src={`https://via.placeholder.com/300?text=Project ${item}`}
                          alt={`Project ${item}`}
                          className="object-cover w-full h-full"
                        />
                        <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                          <Button variant="secondary" size="sm">
                            View Project
                          </Button>
                        </div>
                      </div>
                      <CardContent className="p-3">
                        <CardTitle className="text-sm">Project Name {item}</CardTitle>
                        <CardDescription className="text-xs">UI/UX Design</CardDescription>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </TabsContent>

              <TabsContent value="activity" className="mt-6">
                <Card>
                  <CardContent className="p-0">
                    <div className="divide-y">
                      {[1, 2, 3, 4, 5].map((item) => (
                        <div key={item} className="flex items-start gap-4 p-4">
                          <Avatar className="h-10 w-10">
                            <AvatarFallback>AJ</AvatarFallback>
                          </Avatar>
                          <div className="flex-1">
                            <div className="flex items-center justify-between">
                              <p className="text-sm font-medium">Completed project "Dashboard Redesign"</p>
                              <div className="flex items-center text-xs text-muted-foreground">
                                <CalendarDays className="mr-1 h-3 w-3" />
                                <span>2 days ago</span>
                              </div>
                            </div>
                            <p className="text-sm text-muted-foreground mt-1">
                              Finished the final revisions and delivered the project to the client.
                            </p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="experience" className="mt-6">
                <Card>
                  <CardContent className="p-0">
                    <div className="divide-y">
                      <div className="p-4">
                        <div className="flex items-center justify-between">
                          <div>
                            <h3 className="font-medium">Senior Product Designer</h3>
                            <p className="text-sm text-muted-foreground">Design Co.</p>
                          </div>
                          <Badge>Current</Badge>
                        </div>
                        <p className="mt-2 text-sm text-muted-foreground">Jan 2021 - Present · 2 years, 5 months</p>
                      </div>

                      <div className="p-4">
                        <div>
                          <h3 className="font-medium">Product Designer</h3>
                          <p className="text-sm text-muted-foreground">Tech Startup Inc.</p>
                        </div>
                        <p className="mt-2 text-sm text-muted-foreground">Mar 2018 - Dec 2020 · 2 years, 10 months</p>
                      </div>

                      <div className="p-4">
                        <div>
                          <h3 className="font-medium">UI/UX Designer</h3>
                          <p className="text-sm text-muted-foreground">Creative Agency</p>
                        </div>
                        <p className="mt-2 text-sm text-muted-foreground">Jun 2016 - Feb 2018 · 1 year, 9 months</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>
            </Tabs>
          </div>
        </div>
      </div>
    </div>
  )
}

export default ProfilePage
