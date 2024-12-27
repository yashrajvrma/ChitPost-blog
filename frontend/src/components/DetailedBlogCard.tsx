interface blogProps {
  firstName: string;
  lastName: string;
  title: string;
  content: string;
  profileColor: string;
}
const DetailedBlogCard = ({
  title,
  content,
  profileColor,
  firstName,
  lastName,
}: blogProps) => {
  const para = content.split("\n\n");

  return (
    <div className="max-w-3xl mx-auto p-4 font-sans my-10">
      {/* Header Section */}
      <div className="mb-6 border-b-2 border-slate-100">
        <h1 className="text-3xl md:text-5xl font-bold tracking-tight">
          {title}
        </h1>
        <div className="flex items-center my-6 text-gray-500 text-base gap-3">
          {/* Author Info */}
          <div
            style={{ backgroundColor: profileColor }}
            className="flex w-8 h-8 md:w-11 md:h-11 rounded-full text-slate-50 justify-center items-center text-center align-middle text-base tracking-wide"
          >
            {firstName.substring(0, 1).toUpperCase()}
            {lastName.substring(0, 1).toUpperCase()}
          </div>
          <div>
            <div className="font-medium text-gray-700">
              {firstName} {""} {lastName}
            </div>
            <div className="text-sm">Nov 30, 2024</div>
          </div>
        </div>
      </div>

      {/* Image Section */}
      <div className="mb-10 mt-5">
        <img
          src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTKcwezKtW22MxAbozBXiYlwdXbFY4-DAaZIg&s"
          alt="Blog Header"
          className="rounded-md md:w-full"
        />
      </div>

      {/* Content Section */}
      <div className="prose prose-sm md:prose-lg max-w-none text-gray-800 text-xl font-medium tracking-tight">
        <p>
          {para.map((item, index) => (
            <p className="py-3" key={index}>
              {item}
            </p>
          ))}
        </p>
      </div>
    </div>
  );
};

export default DetailedBlogCard;
