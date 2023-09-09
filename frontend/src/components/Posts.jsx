function Posts({ post }) {
  return (
    <div className="grid grid-cols-3 gap-2 md:gap-6 pt-2">
      {post.map((p) => (
        <div key={p.id} className="h-48 sm:h-60 lg:h-72">
          <img src={p.image} alt="" className="w-full h-full object-cover" />
        </div>
      ))}
    </div>
  );
}

export default Posts;
