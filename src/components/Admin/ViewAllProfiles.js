// ViewAllProfiles.js
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
// import { useNavigate } from 'react-router-dom'; // Add this import
import { useState } from "react"; // Import useState for managing profile data

const ViewAllProfiles = () => {
  const [profiles, setProfiles] = useState(data); // Manage profiles state
  // const navigate = useNavigate(); 

  // const handleReadMore = (id) => {
  //   // Redirect to the profile detail page
  //   navigate(`/profile/${id}`);
  // };

  const handleDelete = (id) => {
    // Confirm before deleting
    const confirmed = window.confirm("Are you sure you want to delete this profile?");
    if (confirmed) {
      // Filter out the profile to delete it
      setProfiles(profiles.filter((profile) => profile.id !== id));
    }
  };

  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 1
  };
  return (
    
        <div className="view-all-profiles">
            <div className="w-3/4 m-auto">
                <div className="mt-20">
                    <Slider {...settings}>
                        {profiles.map((d) => (
                            <div
                                className="bg-white h-[450px] text-black rounded"
                                key={d.id}
                            >
                                <div className="h-56 rounded-t-xl bg-indigo-500 flex justify-center items-center">
                                    <img
                                        src={d.img}
                                        alt={d.name}
                                        className="h-44 w-44 rounded-full"
                                        loading="lazy"
                                    />
                                </div>
                                <div className="flex flex-col justify-center items-center gap-4 p-4">
                                    <p className="text-xl font-semibold">
                                        {d.name}
                                    </p>
                                    <p>{d.description}</p>
                                    <button className="bg-indigo-500 text-white text-lg px-6 py-1 rounded-xl -mt-4" onClick={() => handleDelete(d.id)} >
                                        Delete Profile
                                    </button>
                                </div>
                            </div>
                        ))}
                    </Slider>
                </div>
            </div>
        </div>
    
);

}
      
  const data = [
    { id: 1, name: "Ellie Anderson", img: "/Students/Student 1.jpg", description: "\"Entrepreneur with a passion for innovation and problem-solving.\" " },
    { id: 2, name: "John Morgan", img: "/Students/Student 2.jpg",  description: "\"Musician who blends different genres to create unique sounds.\" " },
    { id: 3, name: "Niya Adebayo", img: "/Students/Student 3.jpg",  description: "\"Nutritionist dedicated to promoting healthy eating habits.\""},
    { id: 4, name: "Charles Jacob", img: "/Students/Student 4.jpg", description: "\"Engineer with expertise in renewable energy projects.\" "  },
    { id: 5, name: "Angelina Steves", img: "/Students/Student 5.jpg", description: "\"Engineer focused on robotics and automation solutions.\"" },
  ];
  
  export default ViewAllProfiles;
  