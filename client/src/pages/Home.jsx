import { useState, useEffect } from "react";
import { Loader, Card, FormField } from "../components";

const RenderCards = ({ data, title }) => {
  if (data?.length > 0) {
    return data.map((post) => <Card key={post._id} {...post} />);
  }
  return (
    <h2 className='mt-5 font-bold text-[#6449ff] text-xl uppercase'>{title}</h2>
  );
};
const Home = () => {
  const [loading, setLoading] = useState(false);
  const [allPosts, setAllPosts] = useState([]);

  const [searchText, setSearchText] = useState("");
  const [searchedResults, setSearchedResults] = useState(null);
  const [searchTimeout, setSearchTimeout] = useState(null);

  useEffect(() => {
    const fetchPost = async () => {
      setLoading(true);
      try {
        const response = await fetch(
          "https://ai-image-backend-tugp.onrender.com/api/v1/post",
          {
            method: "GET",
            headers: {
              "Content-Type": "application/json"
            }
          }
        );
        // console.log(response);
        if (response.ok) {
          const result = await response.json();
          console.log("🚀 ~ file: Home.jsx:33 ~ fetchPost ~ result:", result);
          setAllPosts(result.data.reverse()); //reversing the order of data to come first
        }
      } catch (error) {
        alert(error);
      } finally {
        setLoading(false);
      }
    };
    fetchPost();
  }, []);

  const handleSearchChange = (e) => {
    clearTimeout(searchTimeout);
    setSearchText(e.target.value);

    setSearchTimeout(
      setTimeout(() => {
        const searchResults = allPosts.filter((item) => {
          const itemName = item.name?.prompt || ""; // Use optional chaining and provide a default value
          const itemPrompt = item.prompt?.toLowerCase() || ""; // Use optional chaining and provide a default value

          return (
            itemName.toLowerCase().includes(searchText.toLowerCase()) ||
            itemPrompt.includes(searchText.toLowerCase())
          );
        });

        console.log(
          "🚀 ~ file: Home.jsx:56 ~ setTimeout ~ searchResults:",
          searchResults
        );
        setSearchedResults(searchResults);
      }, 500)
    );
  };
  return (
    <section className='max-w-7xl mx-auto'>
      <div>
        <h1 className='font-extrabold text-[#222328] text-[32px]'>
          The Community Showcase
        </h1>
        <p className='mt-2 text-[#666e75] max-w-[500px]'>
          Browse through a collection of imaginative and visually stunning
          images generated by AI-image.
        </p>
      </div>
      <div className='mt-16'>
        <FormField
          LabelName='Search Posts'
          type='text'
          name='text'
          placeholder='Search Posts'
          value={searchText}
          handleChange={handleSearchChange}
        />
      </div>
      <div className='mt-10'>
        {loading ? (
          <div className='flex justify-center items-center'>
            <Loader />
          </div>
        ) : (
          <>
            {searchText && (
              <h2 className='font-medium text-[#666e75] text-xl mb-3'>
                Showing result for
                <span className='text-[#222328]'>&nbsp;{searchText}</span>
              </h2>
            )}
            <div className='grid lg:grid-cols-4 sm:grid-cols-3 xs:grid-cols-2 grid-cols-1 gap-3'>
              {searchText ? (
                <RenderCards
                  data={searchedResults}
                  title='no search results found'
                />
              ) : (
                <RenderCards data={allPosts} title='no posts found' />
              )}
            </div>
          </>
        )}
      </div>
    </section>
  );
};

export default Home;
