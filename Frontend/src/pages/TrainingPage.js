import React, { useState, useEffect, useRef } from "react";
import styled, { createGlobalStyle } from "styled-components";
import {
  Book,
  Calendar,
  Users,
  Star,
  ArrowRight,
  Sprout,
  Sun,
  Cloud,
  Droplets,
} from "lucide-react";
import { useNavigate } from "react-router-dom";

const GlobalStyle = createGlobalStyle`
  body {
    margin: 0;
    font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;
  }
`;

const Container = styled.div`
  min-height: 100vh;
  background: linear-gradient(180deg, #f0fdf4 0%, #ffffff 100%);
`;

const Section = styled.section`
  padding: 4rem 1rem;
  @media (min-width: 640px) {
    padding: 4rem 1.5rem;
  }
  @media (min-width: 1024px) {
    padding: 4rem 2rem;
  }
`;

const MaxWidthWrapper = styled.div`
  max-width: 80rem;
  margin: 0 auto;
`;

const Header = styled(Section)`
  text-align: center;
  background: linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5)),
    url("https://images.pexels.com/photos/5231046/pexels-photo-5231046.jpeg?auto=compress&cs=tinysrgb&w=600&lazy=load");
  background-size: cover;
  background-position: center;
  background-attachment: fixed;
  color: white;
  padding: 8rem 1rem;
  margin-bottom: 2rem;
`;

const Title = styled.h1`
  font-size: 3.5rem;
  font-weight: bold;
  color: white;
  margin-bottom: 1.5rem;
  text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.3);
  @media (min-width: 768px) {
    font-size: 4rem;
  }
`;

const Subtitle = styled.p`
  font-size: 1.25rem;
  color: rgba(255, 255, 255, 0.9);
  max-width: 36rem;
  margin: 0 auto 2rem;
  text-shadow: 1px 1px 2px rgba(0, 0, 0, 0.3);
`;

const Button = styled.button`
  background-color: #16a34a;
  color: white;
  padding: 0.75rem 2rem;
  border-radius: 9999px;
  font-weight: 600;
  border: none;
  cursor: pointer;
  transition: background-color 0.2s;

  &:hover {
    background-color: #15803d;
  }
`;

const CourseGrid = styled.div`
  display: grid;
  grid-template-columns: 1fr;
  gap: 2rem;
  @media (min-width: 768px) {
    grid-template-columns: repeat(3, 1fr);
  }
`;

const StyledCourseCard = styled.div`
  background: white;
  padding: 2rem;
  border-radius: 1rem;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  transition: transform 0.2s;
  cursor: pointer;

  &:hover {
    transform: translateY(-5px);
  }

  h3 {
    font-size: 1.25rem;
    font-weight: 600;
    margin: 1rem 0;
  }

  p {
    color: #666;
    margin-bottom: 1.5rem;
  }
`;

const CourseCard = ({ course, onClick }) => (
  <StyledCourseCard>
    <div>{course.icon}</div>
    <h3>{course.title}</h3>
    <p>
      Duration: {course.duration}
      <br />
      Level: {course.level}
    </p>
    <Button onClick={() => onClick(course)}>
      Learn More <ArrowRight size={16} style={{ marginLeft: "0.5rem" }} />
    </Button>
  </StyledCourseCard>
);

const StatsSection = styled(Section)`
  background-color: #166534;
  color: white;
`;

const StatsGrid = styled.div`
  display: grid;
  grid-template-columns: 1fr;
  gap: 2rem;
  text-align: center;
  @media (min-width: 768px) {
    grid-template-columns: repeat(3, 1fr);
  }
`;

const StatValue = styled.div`
  font-size: 2.25rem;
  font-weight: bold;
  margin-bottom: 0.5rem;
  opacity: 0;
  transform: translateY(20px);
  animation: fadeInUp 0.6s ease forwards;
  animation-delay: ${(props) => props.delay}s;

  @keyframes fadeInUp {
    to {
      opacity: 1;
      transform: translateY(0);
    }
  }
`;

const StatLabel = styled.div`
  color: #bbf7d0;
`;

const StoriesGrid = styled.div`
  display: grid;
  grid-template-columns: 1fr;
  gap: 2rem;
  @media (min-width: 768px) {
    grid-template-columns: repeat(2, 1fr);
  }
`;

const StoryCard = styled.div`
  display: flex;
  gap: 1.5rem;
  align-items: flex-start;
`;

const Avatar = styled.img`
  width: 6rem;
  height: 6rem;
  border-radius: 9999px;
  object-fit: cover;
`;

const CTASection = styled(Section)`
  background-color: #f0fdf4;
  text-align: center;
`;

const Footer = styled.footer`
  background-color: #111827;
  color: white;
  padding: 3rem 1rem;
`;

const FooterGrid = styled.div`
  display: grid;
  grid-template-columns: 1fr;
  gap: 2rem;
  @media (min-width: 768px) {
    grid-template-columns: repeat(4, 1fr);
  }
`;

const FooterTitle = styled.h3`
  font-size: 1.125rem;
  font-weight: 600;
  margin-bottom: 1rem;
`;

const FooterText = styled.p`
  color: #9ca3af;
`;

const FooterLink = styled.a`
  color: #9ca3af;
  text-decoration: none;
  &:hover {
    color: white;
  }
`;

const FooterInput = styled.input`
  background-color: #1f2937;
  color: white;
  padding: 0.5rem 1rem;
  border-radius: 0.5rem;
  border: none;
  flex-grow: 1;
  &::placeholder {
    color: #9ca3af;
  }
`;

const FooterButton = styled(Button)`
  padding: 0.5rem 1rem;
  border-radius: 0.5rem;
`;

const CountUpNumber = ({ end, delay }) => {
  const [count, setCount] = useState(0);
  const [isVisible, setIsVisible] = useState(false);
  const countRef = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.1 }
    );

    if (countRef.current) {
      observer.observe(countRef.current);
    }

    return () => {
      if (countRef.current) {
        observer.unobserve(countRef.current);
      }
    };
  }, []);

  useEffect(() => {
    if (!isVisible) return;

    let startTime;
    const duration = 2000;

    const animate = (currentTime) => {
      if (!startTime) startTime = currentTime;
      const progress = Math.min((currentTime - startTime) / duration, 1);
      setCount(Math.floor(progress * end));

      if (progress < 1) {
        requestAnimationFrame(animate);
      }
    };

    const timeoutId = setTimeout(() => {
      requestAnimationFrame(animate);
    }, delay * 1000);

    return () => clearTimeout(timeoutId);
  }, [end, delay, isVisible]);

  return <span ref={countRef}>{count}</span>;
};

function TrainingPage() {
  const navigate = useNavigate();

  const handleCourseClick = (course) => {
    const courseMetadata = {
      "Sustainable Farming Practices": {
        chapters: 8,
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
    };

    navigate("/watch", {
      state: {
        course: {
          ...course,
          ...courseMetadata[course.title],
        },
      },
    });
  };

  // Helper functions to map courses to video URLs and descriptions
  const getVideoUrl = (title) => {
    const videoMap = {
      "Sustainable Farming Practices": "https://www.youtube.com/embed/xyz123",
      "Climate-Smart Agriculture": "https://www.youtube.com/embed/abc456",
      "Water Management": "https://www.youtube.com/embed/def789",
    };
    return videoMap[title] || "";
  };

  const getCourseDescription = (title) => {
    const descriptionMap = {
      "Sustainable Farming Practices":
        "Learn sustainable methods to improve soil health, reduce environmental impact, and increase crop yields.",
      "Climate-Smart Agriculture":
        "Understand climate-resilient farming techniques and adapt to changing weather patterns.",
      "Water Management":
        "Master efficient irrigation systems and water conservation practices for agriculture.",
    };
    return descriptionMap[title] || "";
  };

  return (
    <>
      <GlobalStyle />
      <Container>
        <Header>
          <MaxWidthWrapper>
            <Title>Grow Your Farming Knowledge</Title>
            <Subtitle>
              Expert-led training programs designed to help you master
              sustainable farming practices and increase your yield.
            </Subtitle>
            <Button>Start Learning</Button>
          </MaxWidthWrapper>
        </Header>

        <Section>
          <MaxWidthWrapper>
            <h2>Featured Courses</h2>
            <CourseGrid>
              {[
                {
                  icon: <Sun size={32} color="#eab308" />,
                  title: "Sustainable Farming Practices",
                  duration: "8 weeks",
                  level: "Beginner",
                },
                {
                  icon: <Cloud size={32} color="#3b82f6" />,
                  title: "Climate-Smart Agriculture",
                  duration: "6 weeks",
                  level: "Intermediate",
                },
                {
                  icon: <Droplets size={32} color="#60a5fa" />,
                  title: "Water Management",
                  duration: "4 weeks",
                  level: "Advanced",
                },
              ].map((course, index) => (
                <CourseCard
                  key={index}
                  course={course}
                  onClick={handleCourseClick}
                />
              ))}
            </CourseGrid>
          </MaxWidthWrapper>
        </Section>

        <StatsSection>
          <MaxWidthWrapper>
            <StatsGrid>
              <div>
                <Book size={32} />
                <StatValue delay={0.2}>
                  <CountUpNumber end={50} delay={0.2} />+
                </StatValue>
                <StatLabel>Courses Available</StatLabel>
              </div>
              <div>
                <Users size={32} />
                <StatValue delay={0.4}>
                  <CountUpNumber end={1000} delay={0.4} />+
                </StatValue>
                <StatLabel>Farmers Trained</StatLabel>
              </div>
              <div>
                <Star size={32} />
                <StatValue delay={0.6}>
                  <CountUpNumber end={4.8} delay={0.6} />
                </StatValue>
                <StatLabel>Average Rating</StatLabel>
              </div>
            </StatsGrid>
          </MaxWidthWrapper>
        </StatsSection>

        <Section>
          <MaxWidthWrapper>
            <h2>Success Stories</h2>
            <StoriesGrid>
              {[
                {
                  image:
                    "https://images.unsplash.com/photo-1605000797499-95a51c5269ae?auto=format&fit=crop&q=80&w=500",
                  name: "John Smith",
                  story:
                    "After completing the sustainable farming course, I was able to increase my crop yield by 40% while reducing water usage.",
                },
                {
                  image:
                    "https://images.unsplash.com/photo-1591634647938-e93c95066c0e?auto=format&fit=crop&q=80&w=500",
                  name: "Maria Garcia",
                  story:
                    "The organic certification program helped me transition my farm to fully organic practices and access premium markets.",
                },
              ].map((story, index) => (
                <StoryCard key={index}>
                  <Avatar src={story.image} alt={story.name} />
                  <div>
                    <h3>{story.name}</h3>
                    <p>{story.story}</p>
                  </div>
                </StoryCard>
              ))}
            </StoriesGrid>
          </MaxWidthWrapper>
        </Section>

        <CTASection>
          <MaxWidthWrapper>
            <Sprout
              size={64}
              color="#16a34a"
              style={{ margin: "0 auto 1.5rem" }}
            />
            <h2>Ready to Transform Your Farm?</h2>
            <Subtitle>
              Join our community of successful farmers and start learning today.
            </Subtitle>
            <Button>Get Started Now</Button>
          </MaxWidthWrapper>
        </CTASection>

        <Footer>
          <MaxWidthWrapper>
            <FooterGrid>
              <div>
                <FooterTitle>About Us</FooterTitle>
                <FooterText>
                  Dedicated to empowering farmers with knowledge and skills for
                  sustainable agriculture.
                </FooterText>
              </div>
              <div>
                <FooterTitle>Quick Links</FooterTitle>
                <ul>
                  <li>
                    <FooterLink href="#">Courses</FooterLink>
                  </li>
                  <li>
                    <FooterLink href="#">Events</FooterLink>
                  </li>
                  <li>
                    <FooterLink href="#">Resources</FooterLink>
                  </li>
                  <li>
                    <FooterLink href="#">Contact</FooterLink>
                  </li>
                </ul>
              </div>
              <div>
                <FooterTitle>Contact</FooterTitle>
                <FooterText>
                  Email: info@farmertraining.com
                  <br />
                  Phone: (555) 123-4567
                  <br />
                  Address: 123 Farm Road
                </FooterText>
              </div>
              <div>
                <FooterTitle>Newsletter</FooterTitle>
                <FooterText>
                  Subscribe to get updates on new courses and events.
                </FooterText>
                <div style={{ display: "flex", gap: "0.5rem" }}>
                  <FooterInput type="email" placeholder="Enter your email" />
                  <FooterButton>Subscribe</FooterButton>
                </div>
              </div>
            </FooterGrid>
          </MaxWidthWrapper>
        </Footer>
      </Container>
    </>
  );
}

export default TrainingPage;
