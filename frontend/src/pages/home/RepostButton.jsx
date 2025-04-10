import { useState } from "react";
import { BiRepost } from "react-icons/bi";

const RepostButton = () => {
	const [isReposted, setIsReposted] = useState(false);
	const [repostCount, setRepostCount] = useState(0);

	const handleRepost = () => {
		if (isReposted) {
			setRepostCount(repostCount - 1);
		} else {
			setRepostCount(repostCount + 1);
		}
		setIsReposted(!isReposted);
	};

	return (
		<div
			className='flex gap-1 items-center group cursor-pointer'
			onClick={handleRepost}
		>
			<BiRepost
				className={`w-6 h-6 ${
					isReposted ? "text-green-500" : "text-slate-500"
				} group-hover:text-green-500`}
			/>
			<span
				className={`text-sm ${
					isReposted ? "text-green-500" : "text-slate-500"
				} group-hover:text-green-500`}
			>
				{repostCount}
			</span>
		</div>
	);
};

export default RepostButton;
