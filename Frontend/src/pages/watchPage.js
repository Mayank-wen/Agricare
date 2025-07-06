import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { ThumbsUp, Share2 } from "lucide-react";
import { useLocation } from "react-router-dom";
import { sa, wa } from "../asessts/video.js"; // Import both video collections

const Container = styled.div`
  min-height: 100vh;
  background-color: #0f0f0f;
  color: white;
`;

const Layout = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
  padding: 1.5rem;

  @media (min-width: 1024px) {
    flex-direction: row;
  }
`;

const MainContent = styled.div`
  flex: 1;
`;

const VideoPlayer = styled.div`
  aspect-ratio: 16/9;
  background: black;
  border-radius: 0.75rem;
  overflow: hidden;
`;

const VideoInfo = styled.div`
  margin-top: 1rem;
`;

const VideoTitle = styled.h1`
  font-size: 1.25rem;
  font-weight: bold;
`;

const ChannelInfo = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-top: 1rem;
`;

const ChannelProfile = styled.div`
  display: flex;
  align-items: center;
`;

const ChannelDetails = styled.div``;

const ChannelName = styled.h3`
  font-weight: 500;
`;

const Subscribers = styled.p`
  font-size: 0.875rem;
  color: #9ca3af;
`;

const ActionButtons = styled.div`
  display: flex;
  align-items: center;
  gap: 1rem;
`;

const ActionButton = styled.button`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  background: #272727;
  padding: 0.5rem 1rem;
  border-radius: 9999px;

  &:hover {
    background: #3f3f3f;
  }
`;

const Description = styled.div`
  margin-top: 1rem;
  background: #272727;
  border-radius: 0.75rem;
  padding: 1rem;
`;

const VideoStats = styled.div`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  font-size: 0.875rem;
  margin-bottom: 0.5rem;
`;

const VideoDescription = styled.p`
  font-size: 0.875rem;
  white-space: pre-line;
`;

const Comments = styled.div`
  margin-top: 1.5rem;
`;

const CommentHeader = styled.h3`
  font-size: 1.125rem;
  font-weight: 500;
  margin-bottom: 1rem;
`;

const CommentInput = styled.div`
  display: flex;
  align-items: flex-start;
  gap: 1rem;
`;

const Input = styled.input`
  flex: 1;
  background: transparent;
  border: none;
  border-bottom: 1px solid #4b5563;
  padding: 0.25rem 0;
  outline: none;

  &:focus {
    border-color: #3b82f6;
  }
`;

const RecommendedSection = styled.div`
  @media (min-width: 1024px) {
    width: 400px;
  }
  display: flex;
  flex-direction: column;
  gap: 1rem;
`;

const RecommendedVideo = styled.div`
  display: flex;
  gap: 0.5rem;
  cursor: pointer;
`;

const ThumbnailContainer = styled.div`
  position: relative;
  flex-shrink: 0;
  width: 168px;
`;

const Thumbnail = styled.img`
  width: 100%;
  aspect-ratio: 16/9;
  object-fit: cover;
  border-radius: 0.5rem;
`;

const Duration = styled.span`
  position: absolute;
  bottom: 0.25rem;
  right: 0.25rem;
  background: rgba(0, 0, 0, 0.8);
  padding: 0.25rem 0.5rem;
  font-size: 0.75rem;
  border-radius: 0.25rem;
`;

const VideoDetails = styled.div`
  flex: 1;
`;

const RecommendedTitle = styled.h3`
  font-size: 0.875rem;
  font-weight: 500;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;

  ${RecommendedVideo}:hover & {
    color: #60a5fa;
  }
`;

const ChannelText = styled.p`
  font-size: 0.75rem;
  color: #9ca3af;
  margin-top: 0.25rem;
`;

function WatchPage() {
  const location = useLocation();
  const [videos, setVideos] = useState([]);
  const [currentVideo, setCurrentVideo] = useState(null);

  useEffect(() => {
    const courseVideos = {
      "Sustainable Farming Practices": {
        videos: sa,
        thumbnails: {
          chap1:
            "https://images.pexels.com/photos/440731/pexels-photo-440731.jpeg",
          chap2:
            "https://images.pexels.com/photos/4207908/pexels-photo-4207908.jpeg",
          chap3:
            "https://images.pexels.com/photos/1483880/pexels-photo-1483880.jpeg",
          chap4:
            "https://images.pexels.com/photos/2286776/pexels-photo-2286776.jpeg",
          chap5:
            "https://images.pexels.com/photos/2252584/pexels-photo-2252584.jpeg",
          chap6:
            "https://images.pexels.com/photos/2889630/pexels-photo-2889630.jpeg",
          chap7:
            "https://images.pexels.com/photos/2886937/pexels-photo-2886937.jpeg",
          chap8:
            "https://images.pexels.com/photos/2886937/pexels-photo-2886937.jpeg",
        },
        titles: {
          chap1: "Introduction to Sustainable Agriculture",
          chap2: "Soil Health Management",
          chap3: "Water Conservation",
          chap4: "Crop Rotation and Diversity",
          chap5: "Pest Management",
          chap6: "Organic Farming Practices",
          chap7: "Sustainable Harvesting",
          chap8: "Future of Sustainable Agriculture",
        },
        descriptions: {
          chap1:
            "Learn the basics of sustainable farming techniques and their importance.",
          chap2:
            "Understanding soil health and management practices for sustainable farming.",
          chap3: "Learn efficient water management techniques in agriculture.",
          chap4:
            "Understanding the importance of crop rotation and biodiversity.",
          chap5: "Natural and integrated pest management strategies.",
          chap6: "Introduction to organic farming methods and certification.",
          chap7: "Best practices for sustainable crop harvesting.",
          chap8:
            "Looking ahead at sustainable farming technologies and trends.",
        },
      },
      "Climate-Smart Agriculture": {
        videos: wa,
        // Add similar structure for other courses
      },
    };

    const selectedCourse = courseVideos[location.state?.course?.title];

    if (selectedCourse) {
      const videoCollection = Object.keys(selectedCourse.videos).map(
        (chapter, index) => ({
          id: index + 1,
          title: selectedCourse.titles[chapter],
          videoUrl: selectedCourse.videos[chapter],
          thumbnail: selectedCourse.thumbnails[chapter],
          channel: "AgriCare Education",
          views: "1K",
          timestamp: "Published",
          duration: "15:00",
          description: selectedCourse.descriptions[chapter],
        })
      );

      setVideos(videoCollection);
      setCurrentVideo(videoCollection[0]);
    }
  }, [location]);

  return (
    <Container>
      <Layout>
        <MainContent>
          <VideoPlayer>
            {currentVideo?.videoUrl && (
              <iframe
                width="100%"
                height="100%"
                src={currentVideo.videoUrl}
                title={currentVideo.title}
                frameBorder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              />
            )}
          </VideoPlayer>

          <VideoInfo>
            <VideoTitle>{currentVideo?.title}</VideoTitle>

            <ChannelInfo>
              <ChannelProfile>
                <ChannelDetails>
                  <ChannelName>{currentVideo?.channel}</ChannelName>
                  <Subscribers>AgriCare Learning Platform</Subscribers>
                </ChannelDetails>
              </ChannelProfile>

              <ActionButtons>
                <ActionButton>
                  <ThumbsUp size={20} />
                  <span>Like</span>
                </ActionButton>
                <ActionButton>
                  <Share2 size={20} />
                  <span>Share</span>
                </ActionButton>
              </ActionButtons>
            </ChannelInfo>

            <Description>
              <VideoStats>
                <span>Educational Content</span>
                <span>•</span>
                <span>{currentVideo?.timestamp}</span>
              </VideoStats>
              <VideoDescription>{currentVideo?.description}</VideoDescription>
            </Description>
          </VideoInfo>
        </MainContent>

        <RecommendedSection>
          {videos.map((video) => (
            <RecommendedVideo
              key={video.id}
              onClick={() => setCurrentVideo(video)}
            >
              <ThumbnailContainer>
                <Thumbnail src={video.thumbnail} alt={video.title} />
                <Duration>{video.duration}</Duration>
              </ThumbnailContainer>
              <VideoDetails>
                <RecommendedTitle>{video.title}</RecommendedTitle>
                <ChannelText>{video.channel}</ChannelText>
                <ChannelText>
                  {video.views} views • {video.timestamp}
                </ChannelText>
              </VideoDetails>
            </RecommendedVideo>
          ))}
        </RecommendedSection>
      </Layout>
    </Container>
  );
}

export default WatchPage;
