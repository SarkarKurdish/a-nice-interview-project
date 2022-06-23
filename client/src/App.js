import { useState } from "react";
import { useMutation, useQuery, useQueryClient } from "react-query";
import Avatar from "./components/atoms/Avatar";
import Comment from "./components/atoms/Comment";
import api from "./lib/api";
import { commentEndpoints } from "./lib/endpoints";

function App() {
  const queryClient = useQueryClient();
  const comments = useQuery("comemnts", fetchComments);

  const submitMutation = useMutation(postComment, {
    onSuccess: (data) => {
      queryClient.setQueryData("comemnts", [data, ...(comments?.data ?? [])]);
    },
  });

  return (
    <div className="w-full min-h-screen bg-gray-400 flex items-end justify-center">
      <div className="w-[900px] h-screen md:p-12 md:h-[85vh] bg-white rounded-tr-md rounded-tl-md p-5 overflow-auto">
        <h1 className="text-xl font-bold">Discussion</h1>

        <InputContainer submitMutation={submitMutation} />

        <div className="my-10 h-[1px] w-full bg-gray-200"></div>

        <CommentContainer data={comments?.data} />
      </div>
    </div>
  );
}

function CommentContainer({ data }) {
  return (
    <div className="flex flex-col gap-10">
      {data?.map((comment) => (
        <Comment data={comment} key={comment._id} />
      ))}
    </div>
  );
}

function InputContainer({ submitMutation }) {
  const [comment, setComment] = useState("");

  const handleChange = (e) => {
    setComment(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    submitMutation.mutate(comment);
    setComment("");
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="mt-10 flex items-center w-full gap-4"
    >
      <Avatar
        src={"https://avatars.dicebear.com/api/open-peeps/avergecommenter.svg"}
      />
      <div className="grow">
        <input
          onChange={handleChange}
          placeholder="What are your thoughts?"
          name="comment"
          value={comment}
          type="text"
          className="w-full border border-gray-300 rounded-md p-2"
        />
      </div>
      <div>
        <button
          disabled={submitMutation.isLoading}
          className="bg-purple-600 text-white px-3 py-2 rounded-md disabled:opacity-40"
        >
          Comment
        </button>
      </div>
    </form>
  );
}

async function fetchComments() {
  return (await api.get(commentEndpoints.getComments())).data.data;
}

async function postComment(data) {
  return (await api.post(commentEndpoints.getComments(), { comment: data }))
    .data.data;
}

export default App;
