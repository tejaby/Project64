// libraries
import { useInView } from "react-intersection-observer";
import axios from "axios";
import { useNavigate } from "react-router-dom";

// components
import PostImage from "../../components/post/image/PostImage";
import SvgButton from "../../components/ui/SvgButton";

// context
import { InterfaceContext } from "../../context/Interface";
import { UserContext } from "../../context/User";
import { PostContext } from "../../context/Post";

// utils
import { formatTimeAgo } from "../../utils/dateUtils";

// react
import { useContext, useEffect, useState } from "react";

function PostCard() {
  const { theme } = useContext(InterfaceContext);
  const { setUser, token, setToken, setViewUser } = useContext(UserContext);
  const {
    followedPosts,
    setFollowedPosts,
    nextPageFollowedPosts,
    setNextPageFollowedPosts,
  } = useContext(PostContext);

  const { ref, inView } = useInView();
  const navigate = useNavigate();

  // Estado para indicar si los datos están siendo cargados
  const [loading, setLoading] = useState(false);

  const handleUserPage = (user) => {
    setViewUser(user);
    navigate(`/profile/${user.username}`);
  };

  useEffect(() => {
    if (!nextPageFollowedPosts || loading) return;

    const loadMorePosts = async () => {
      try {
        setLoading(true);
        const response = await axios.get(nextPageFollowedPosts, {
          headers: {
            Authorization: `Bearer ${token.access}`,
          },
        });
        setFollowedPosts([...followedPosts, ...response.data.results]);
        setNextPageFollowedPosts(response.data.next);
      } catch (err) {
        setUser(null);
        setToken(null);
        localStorage.removeItem("authUser");
        localStorage.removeItem("authToken");
      } finally {
        setLoading(false);
      }
    };

    if (inView) {
      loadMorePosts();
    }
  }, [inView]);

  return (
    <div className="flex flex-col gap-2">
      {followedPosts.map((post, index) => (
        <div
          key={post.id}
          className="flex flex-col border-b-2 border-colorHover dark:border-darkColorHover"
        >
          <div className="flex justify-between items-center py-2">
            <div className="flex items-center gap-1">
              <img
                src={`${
                  post.author.profile_picture
                    ? post.author.profile_picture
                    : "/user-defect.png"
                }`}
                alt=""
                className="w-10 h-10 object-cover rounded-full cursor-pointer"
                onClick={() => {
                  handleUserPage(post.author);
                }}
              />
              <span
                className="font-bold text-black dark:text-white cursor-pointer"
                onClick={() => {
                  handleUserPage(post.author);
                }}
              >
                {post.author.username}
              </span>
              <span className="text-secondaryText dark:text-secondaryTextDark">
                {formatTimeAgo(new Date(post.created_at))}
              </span>
            </div>
            {theme === "light" ? (
              <SvgButton
                name="dots"
                options={{ width: "24px", height: "24px" }}
              />
            ) : (
              <SvgButton
                name="dotsDark"
                options={{ width: "24px", height: "24px" }}
              />
            )}
          </div>
          <div>
            <PostImage
              src={post.image}
              alt={post.author.username}
              post={post}
            />
            <div className="flex gap-1">
              <span className="font-semibold text-black dark:text-white">
                {post.author.username}
              </span>
              <p className="text-base text-black dark:text-white">
                {post.content}
              </p>
            </div>
          </div>
          <div className="flex justify-between items-center py-2">
            <div className="flex gap-2">
              <div className="flex items-center">
                {theme === "light" ? (
                  <SvgButton
                    name="heart"
                    options={{ width: "24px", height: "24px" }}
                  />
                ) : (
                  <SvgButton
                    name="heartDark"
                    options={{ width: "24px", height: "24px" }}
                  />
                )}
                <span className="text-black dark:text-white">{post.likes}</span>
              </div>
              <div className="flex items-center">
                {theme === "light" ? (
                  <SvgButton
                    name="message-circle-2"
                    options={{ width: "24px", height: "24px" }}
                  />
                ) : (
                  <SvgButton
                    name="message-circle-2Dark"
                    options={{ width: "24px", height: "24px" }}
                  />
                )}
                <span className="text-black dark:text-white">3</span>
              </div>
            </div>
            <div className="flex items-center">
              {theme === "light" ? (
                <SvgButton
                  name="chart-line"
                  options={{ width: "24px", height: "24px" }}
                />
              ) : (
                <SvgButton
                  name="chart-lineDark"
                  options={{ width: "24px", height: "24px" }}
                />
              )}
              <span className="text-black dark:text-white">54</span>
            </div>
          </div>
          {index === followedPosts.length - 1 && <div ref={ref} />}
        </div>
      ))}
      {nextPageFollowedPosts && (
        <div className="flex justify-center text-black dark:text-white">
          Loading...
        </div>
      )}
    </div>
  );
}

export default PostCard;
