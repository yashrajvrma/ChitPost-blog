function DetailedBlogSkeleton() {
  return (
    <div className="max-w-xl md:max-w-4xl animate-pulse">
      {/* Title Skeleton */}
      <div>
        <div className="h-8 my-2 bg-slate-200 rounded-lg"></div>
        <div className="h-8 my-2 bg-slate-200 rounded-lg"></div>
        <div className="h-8 my-2 bg-slate-200 rounded-lg"></div>
      </div>

      {/* profile */}
      <div className="headline flex flex-row items-center gap-2 md:mb-16 md:mt-12 py-3 max-w-xl md:max-w-4xl border-b-2">
        <div className="flex w-8 h-8 md:w-12 md:h-12 rounded-full  justify-center items-center align-middle bg-slate-200"></div>
        <div>
          <div className="name rounded-lg bg-slate-200 w-36 h-4 my-2"></div>
          <div className="date rounded-lg bg-slate-200 w-36 h-4 my-2"></div>
        </div>
      </div>
      {/* content */}
      <div className="h-screen bg-slate-200 rounded-lg"></div>
    </div>
  );
}

export default DetailedBlogSkeleton;
