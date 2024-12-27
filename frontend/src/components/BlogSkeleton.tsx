function BlogSkeleton() {
  return (
    <div className="card-body flex border-b-2 border-slate-100 h-full pt-7 pb-2 gap-3 max-w-xl md:max-w-4xl font-sans tracking-tight animate-pulse">
      <div className="text-component w-3/4">
        <div className="headline flex flex-row items-center gap-2">
          <div className="flex w-8 h-8 md:w-9 md:h-9 rounded-full bg-slate-200"></div>

          <div className="name w-24 h-4 bg-slate-200 rounded-md"></div>

          <div className="flex w-2 h-2 bg-slate-200 rounded-full"></div>

          <div className="date w-16 h-4 bg-slate-200 rounded-md"></div>
        </div>

        <div className="title w-full h-6 md:h-8 bg-slate-200 rounded-md mt-3"></div>

        <div className="content w-full h-4 bg-slate-200 rounded-md mt-2"></div>
        <div className="content w-3/4 h-4 bg-slate-200 rounded-md mt-2"></div>
        <div className="content w-2/4 h-4 bg-slate-200 rounded-md mt-2"></div>
      </div>

      <div className="img-component w-1/4 flex justify-center md:pt-2 md:px-3">
        <div className="md:w-56 w-64 md:h-48 h-32 flex justify-center items-center bg-slate-200 rounded-md"></div>
      </div>
    </div>
  );
}

export default BlogSkeleton;
