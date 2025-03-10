// ViewAllProfiles.js
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { useState } from "react"; // Import useState for handling the search query
import { useNavigate } from "react-router-dom";

const ViewAllProfiles = () => {
  // State for the search query
  const [searchQuery, setSearchQuery] = useState("");

  // Function to handle the search input change
  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value);
  };

   // Filter profiles based on the search query (name or address)
   const filteredProfiles = data.filter((profile) => {
    return (
      profile.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      profile.address.toLowerCase().includes(searchQuery.toLowerCase()) ||
      profile.description.toLowerCase().includes(searchQuery.toLowerCase()) 
    );
  });

  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 1
  };

  const navigate = useNavigate();  // Initialize useNavigate hook
  // Navigate to the ProfileDetail page
  const handleReadMore = (id) => {
    navigate(`/user/profile/${id}`);  // Use navigate to redirect
  };
  return (

        <div className="view-all-profiles">
        {/* Search Bar */}
        <div className="search-bar-container flex justify-center p-4 bg-gray-100 " >
          <input
            type="text"
            placeholder="Search by name , location or description..."
            value={searchQuery}
            onChange={handleSearchChange}
            className="w-1/2 p-3 pr-10 rounded-lg border border-gray-300 focus:outline-none focus:border-blue-500"
          />
          
        </div>
         
  
        {/* Slider to display filtered profiles */}
        <div className="w-3/4 m-auto mt-20">
          <Slider {...settings}>
            {filteredProfiles.map((d) => (
              <div className="bg-white h-[450px] text-black rounded" key={d.id}>
                <div className="h-56 rounded-t-xl bg-indigo-500 flex justify-center items-center">
                  <img
                    src={d.img}
                    alt={d.name}
                    className="h-44 w-44 rounded-full"
                    loading="lazy"
                  />
                </div>
                <div className="flex flex-col justify-center items-center gap-4 p-4">
                  <p className="text-xl font-semibold">{d.name}</p>
                  <p>{d.description}</p>
                  <button
                    className="bg-indigo-500 text-white text-lg px-6 py-1 rounded-xl -mt-4"
                    onClick={() => handleReadMore(d.id)}
                  >
                    Read More
                  </button>
                </div>
              </div>
            ))}
          </Slider>
        </div>
      </div>
    
);

}
      
export const data = [
    { id: 1, name: "Ellie Anderson", img: "/Students/Student 1.jpg", description: "\"Entrepreneur with a passion for innovation and problem-solving.\" ", address:'New York' },
    { id: 2, name: "John Morgan", img: "/Students/Student 2.jpg",  description: "\"Musician who blends different genres to create unique sounds.\" " , address:'California'},
    { id: 3, name: "Niya Adebayo", img: "/Students/Student 3.jpg",  description: "\"Nutritionist dedicated to promoting healthy eating habits.\"" ,address:'Manchester'},
    { id: 4, name: "Charles Jacob", img: "/Students/Student 4.jpg", description: "\"Engineer with expertise in renewable energy projects.\" " , address:'Texas' },
    { id: 5, name: "Angelina Steves", img: "/Students/Student 5.jpg", description: "\"Engineer focused on robotics and automation solutions.\"",address:'London' },
  ];
  
  export default ViewAllProfiles;
  