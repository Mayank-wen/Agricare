const getEmbedUrl = (url) => {
  const videoId = url.split("v=")[1];
  return `https://www.youtube.com/embed/${videoId}`;
};

export const PracticalTrainingVideos = {
  "Land Preparation and Sowing Techniques": [
    {
      title:
        "Land Preparation Part 1 – First Steps to Cultivating the Planting Area",
      url: getEmbedUrl("https://www.youtube.com/watch?v=s9Q8L7FCcKA"),
    },
    {
      title: "Land Preparation Part 2 – How to Make the Planting Beds",
      url: getEmbedUrl("https://www.youtube.com/watch?v=LzEIntM23gY"),
    },
    {
      title: "Land Preparation: Essential Tips for Farmers",
      url: getEmbedUrl("https://www.youtube.com/watch?v=uiHhTgrcOSc"),
    },
  ],
  "Efficient Irrigation Methods (Drip, Sprinkler)": [
    {
      title: "Drip Irrigation Systems: Simple, Direct and Cost-effective",
      url: getEmbedUrl("https://www.youtube.com/watch?v=Blb0_8ZcMwc"),
    },
    {
      title: "How to Setup Drip Irrigation with In-Ground Sprinklers",
      url: getEmbedUrl("https://www.youtube.com/watch?v=KB2K2XxuUhM"),
    },
    {
      title: "Drip Irrigation 101 - 2023 Class Recording",
      url: getEmbedUrl("https://www.youtube.com/watch?v=JqyGsS-6C7M"),
    },
  ],
  "Pest & Disease Management Techniques": [
    {
      title: "Advanced Pest and Disease Management Techniques in Agriculture",
      url: getEmbedUrl("https://www.youtube.com/watch?v=c2o11_wG1ow"),
    },
    {
      title:
        "Effective Pest and Disease Management in Agriculture (13 Minutes)",
      url: getEmbedUrl("https://www.youtube.com/watch?v=tnn4R0j3f-4"),
    },
    {
      title: "Integrated Pest and Disease Management",
      url: getEmbedUrl("https://www.youtube.com/watch?v=2ny-1dD5Ht0"),
    },
  ],
  "Fertilizer Application – Organic and Chemical": [
    {
      title: "Fertilizer Application of Organic Fertilizers",
      url: getEmbedUrl("https://www.youtube.com/watch?v=VmH0G0r5LzI"),
    },
    {
      title: "How To Use Organic Fertilizers - The Dirt Doctor",
      url: getEmbedUrl("https://www.youtube.com/watch?v=rNmh-qmjZ2o"),
    },
    {
      title: "DNMP Training - 03 - Manure versus Chemical Fertilizer",
      url: getEmbedUrl("https://www.youtube.com/watch?v=vWjULkVwRII"),
    },
  ],
  "Harvesting and Post-Harvest Handling": [
    {
      title: "10 Essential Steps to Optimize Post Harvest Handling",
      url: getEmbedUrl("https://www.youtube.com/watch?v=CaieNzMxO4M"),
    },
    {
      title: "Harvesting and Post-Harvest Technology // Lecture Discussion",
      url: getEmbedUrl("https://www.youtube.com/watch?v=KSNNtK5sYYY"),
    },
    {
      title: "Harvesting & Post harvest Handling of grain crops",
      url: getEmbedUrl("https://www.youtube.com/watch?v=17Auwkk8-pU"),
    },
  ],
};

export const SustainableAgricultureVideos = {
  "Climate-Smart Agriculture Techniques": [
    {
      title: "Understanding Climate Smart Agriculture",
      url: getEmbedUrl("https://www.youtube.com/watch?v=z3ewl7MhRXY"),
    },
    {
      title: "Climate-Smart Agriculture - Playlist",
      url: getEmbedUrl(
        "https://www.youtube.com/playlist?list=PLzp5NgJ2-dK7wTr_-SNbSEzBd98a32OZX"
      ),
    },
    {
      title:
        "Climate-Smart Agriculture at an Ethiopian Farmers Training Center",
      url: getEmbedUrl("https://www.youtube.com/watch?v=olds8wTVJl8"),
    },
  ],
  "Water Conservation in Farming": [
    {
      title: "What is Sustainable Agriculture? Episode 7: Water Conservation",
      url: getEmbedUrl("https://www.youtube.com/watch?v=G6d4PkEEyC0"),
    },
    {
      title: "4 Tips for Water Conservation in Agriculture",
      url: getEmbedUrl("https://www.youtube.com/watch?v=nmIono3tQoA"),
    },
    {
      title: "Best Practices for Water Conservation and Management",
      url: getEmbedUrl("https://www.youtube.com/watch?v=RE_s4miU2eU"),
    },
  ],
  "Waste Management on Farms": [
    {
      title: "Start Agricultural Waste Management Business",
      url: getEmbedUrl("https://www.youtube.com/watch?v=sof1VTmDyr8"),
    },
    {
      title: "The ABCs of Agricultural Waste Management",
      url: getEmbedUrl("https://www.youtube.com/watch?v=p4l4ipDHscU"),
    },
    {
      title: "Technical Training: Ag Waste Management",
      url: getEmbedUrl("https://www.youtube.com/watch?v=1qmjbvcW8cU"),
    },
  ],
};
