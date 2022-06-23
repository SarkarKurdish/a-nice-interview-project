import { MdArrowDropUp } from "react-icons//md";
import Avatar from "./Avatar";
import Button from "./Button";
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";

dayjs.extend(relativeTime);

export default function Comment({ data }) {
  return (
    <div>
      <div className="flex gap-3">
        <Avatar src={data.owner.image} />

        <div className="flex flex-col gap-3">
          <div className="flex gap-2 items-center">
            <div className="font-medium">{data.owner.username}</div>
            <div>.</div>
            <div className="text-sm text-gray-500">
              {dayjs(data.createdAt).fromNow()}
            </div>
          </div>

          <p className="text-gray-700">{data.comment}</p>

          <div className="flex gap-4 text-gray-900 text-sm">
            <Button leftIcon={<MdArrowDropUp size={25} />}>Upvote</Button>
            <Button>Reply</Button>
          </div>
        </div>
      </div>
    </div>
  );
}
