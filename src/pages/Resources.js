import "../css/Resources.css"

function ResourcesPage() {
  return (
    <div className="resources-container">
      {/* Header Section */}
      <div className="header">
        <h1 className="title">Resources</h1>
        <a href="#" className="read-more-btn">
          Read More
        </a>
      </div>
      <div className="blog-grid">
        <div className="blog-post">
          <div className="blog-image-container">
            <img
              src="https://images.pexels.com/photos/31751515/pexels-photo-31751515/free-photo-of-young-farmer-tending-green-plants-outdoors.jpeg?auto=compress&cs=tinysrgb&w=600"
              alt="Aerial view of forest with water and mist"
              className="blog-image"
            />
          </div>
          <div className="blog-content">
            <div className="blog-date">Jul 25, 2024 • 2 min read</div>
            <h2 className="blog-title">Predictive Analytics for a Sustainable Future</h2>
            <p className="blog-subtitle">
              Create a blog post subtitle that summarizes your post in a few short, punchy sentences and entices your
              audience to continue reading....
            </p>
          </div>
        </div>
        <div className="blog-post">
          <div className="blog-image-container">
            <img
              src="https://images.pexels.com/photos/6231906/pexels-photo-6231906.jpeg?auto=compress&cs=tinysrgb&w=600"
              alt="Person in a field at sunset with irrigation equipment"
              className="blog-image"
            />
          </div>
          <div className="blog-content">
            <div className="blog-date">Jul 25, 2024 • 2 min read</div>
            <h2 className="blog-title">Transforming Climate Insights into Real-World Solutions</h2>
            <p className="blog-subtitle">
              Create a blog post subtitle that summarizes your post in a few short, punchy sentences and entices your
              audience to continue reading....
            </p>
          </div>
        </div>
        <div className="blog-post">
          <div className="blog-image-container">
            <img
              src="https://images.pexels.com/photos/1573885/pexels-photo-1573885.jpeg?auto=compress&cs=tinysrgb&w=600"
              alt="Iceberg in ocean with ice fragments"
              className="blog-image"
            />
          </div>
          <div className="blog-content">
            <div className="blog-date">Jul 25, 2024 • 2 min read</div>
            <h2 className="blog-title">Harnessing AI to Tackle Climate Change</h2>
            <p className="blog-subtitle">
              Create a blog post subtitle that summarizes your post in a few short, punchy sentences and entices your
              audience to continue reading....
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default ResourcesPage
