import { useState } from "react";
import { useNavigate } from "react-router-dom";

import { preview } from "../assets";
import { getRandomPrompt } from "../utils";
import { FormField, Loader } from "../components";

const CreatePost = () => {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    name: "",
    prompt: "",
    photo: ""
  });
  const [generatingImg, setGeneratingImg] = useState(false);

  const [loading, setLoading] = useState(false);

  const generateImg = async () => {
    if (form.prompt) {
      try {
        setGeneratingImg(true);
        const response = await fetch("http://localhost:8080/api/v1/openai", {
          method: "POST",
          headers: {
            "Content-Type": "application/json"
          },
          body: JSON.stringify({ prompt: form.prompt })
        });
        const data = await response.json();

        if (data.photo && data.photo.length > 0) {
          const imageUrl = data.photo[0].url; // Access the URL from the first object
          setForm({ ...form, photo: imageUrl });
        } else {
          alert("Free credit limit is reached 🥺");
        }
      } catch (error) {
        alert(error.message);
      } finally {
        setGeneratingImg(false);
      }
    } else {
      alert("Please enter a prompt");
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (form.prompt && form.photo) {
      setLoading(true);
      try {
        const response = await fetch("http://localhost:8080/api/v1/post", {
          method: "POST",
          headers: {
            "Content-Type": "application/json"
          },
          body: JSON.stringify(form)
        });
        await response.json();
        navigate("/");
      } catch (error) {
        alert(err);
      } finally {
        setLoading(false);
      }
    } else {
      alert("Please enter a prompt and generate an image");
    }
  };
  const handleChange = (event) => {
    setForm({
      ...form,
      [event.target.name]: event.target.value
    });
  };
  const handleSurpriseMe = () => {
    const randomPrompt = getRandomPrompt(form.prompt);
    console.log(randomPrompt);
    setForm({
      ...form,
      prompt: randomPrompt
    });
  };

  return (
    <section className='max-w-7xl mx-auto'>
      <div>
        <h1 className='font-extrabold text-[#222328] text-[32px]'>Create</h1>
        <p className='mt-2 text-[#666e75] max-w-[500px]'>
          Create imaginative and visually stunning images through AI-image &
          share them with the community.
        </p>
      </div>

      <form onSubmit={handleSubmit} className='mt-16 max-w-3xl'>
        <div className='flex flex-col gap-5'>
          <FormField
            LabelName='Name'
            type='text'
            name='name'
            placeholder='Jishnu t raj'
            value={form.name}
            handleChange={handleChange}
          />
          <FormField
            LabelName='Prompt'
            type='text'
            name='prompt'
            placeholder='A man standing in front of a stargate to another dimension'
            value={form.prompt}
            handleChange={handleChange}
            isSurpriseMe
            handleSurpriseMe={handleSurpriseMe}
          />
          <div
            className='relative bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg
           focus:ring-blue-500 focus:border-blue-500 w-64 p-3 h-64 flex justify-center items-center'
          >
            {form.photo ? (
              <img
                src={form.photo}
                alt={form.prompt}
                className='w-full h-full object-contain'
              />
            ) : (
              <img
                src={preview}
                alt='preview'
                className='opacity-40 w-9/12 h-9/12 object-contain'
              />
            )}

            {generatingImg && (
              <div className='absolute inset-0 flex items-center justify-center bg-[rgba(0,0,0,0.5)] rounded-lg'>
                <Loader />
              </div>
            )}
          </div>
        </div>
        <div className='mt-5 flex gap-5'>
          <button
            type='button'
            className='text-white bg-green-700 font-medium rounded-md text-sm w-full sm:w-auto px-5 py-2.5 text-center'
            onClick={generateImg}
          >
            {generatingImg ? "Generating" : "Generate"}
          </button>
        </div>

        <div className='mt-10'>
          <p className='mt-2 text-[#666e75] text-[14px]'>
            Once you have created the image you want, you can share it with
            others in the community.
          </p>
          <button
            type='submit'
            className='mt-3 text-white bg-[#6469ff] font-medium rounded-md text-sm w-full sm:w-auto px-5 py-2.5 text-center'
          >
            {loading ? "Sharing..." : "Share with the community"}
          </button>
        </div>
      </form>
    </section>
  );
};

export default CreatePost;
