const FormField = ({
  LabelName,
  type,
  name,
  isSurpriseMe,
  handleChange,
  handleSurpriseMe,
  placeholder,
  value
}) => {
  return (
    <div>
      <div className='flex items-center gap-2 mb-2'>
        <label
          htmlFor={name}
          className='block text-sm font-medium text-gray-900'
        >
          {LabelName}
        </label>

        {isSurpriseMe && (
          <button
            type='button'
            onClick={handleSurpriseMe}
            className='font-semibold text-xs bg-[#eceef1] py-1 px-2 rounded-[5px] text-black'
          >
            Surprise Me
          </button>
        )}
      </div>
      <input
        type={type}
        placeholder={placeholder}
        value={value}
        id={name}
        name={name}
        onChange={handleChange}
        required
        className='block bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-[#6469ff] focus:border-[#6464ff] outline-none w-full p-3'
      />
    </div>
  );
};

export default FormField;
