import { useState } from "react";
import { FaRegBookmark, FaBookmark } from "react-icons/fa6";

const BookmarkButton = () => {
	const [isBookmarked, setIsBookmarked] = useState(false);

	const handleBookmark = () => {
		setIsBookmarked(!isBookmarked);
	};

	return (
		<div className='flex w-1/3 justify-end gap-2 items-center'>
			{isBookmarked ? (
				<FaBookmark
					className='w-4 h-4 text-yellow-500 cursor-pointer'
					onClick={handleBookmark}
				/>
			) : (
				<FaRegBookmark
					className='w-4 h-4 text-slate-500 hover:text-yellow-500 cursor-pointer'
					onClick={handleBookmark}
				/>
			)}
		</div>
	);
};

export default BookmarkButton;
