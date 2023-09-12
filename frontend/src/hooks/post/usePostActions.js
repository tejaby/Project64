// services
import { createPost } from "../../services/post";

// hooks
import useTokenValidation from "../user/useTokenValidation";

// react
import { useState } from "react";

function usePostActions() {
  const [error, setError] = useState(null);

  const token = useTokenValidation();

  const submitPost = async (data) => {
    if (token) {
      try {
        const response = await createPost(token, data);
        setError(null);
      } catch (e) {
        setError(e);
      }
    }
  };
  return { error, submitPost };
}

export default usePostActions;
