'use server';
import connectDB from '@/config/database';
import User from '@/models/user';
import { getSessionUser } from '@/utils/getSessionUser';
import { revalidatePath } from 'next/cache';

async function bookmarkProperty(propertyId) {
  await connectDB();

  const sessionUser = await getSessionUser();

  if (!sessionUser || !sessionUser.userId) {
    return { error: 'User ID is required' };
  }

  const { userId } = sessionUser;

  const user = await User.findById(userId);

  let message;
  let isBookmarked = user.bookmarks.includes(propertyId);

  if (isBookmarked) {
    // If already bookmarked, remove
    user.bookmarks.pull(propertyId);
    message = 'Bookmark removed';
    isBookmarked = false;
  } else {
    // If not bookmarked, add
    user.bookmarks.push(propertyId);
    message = 'Bookmark added';
    isBookmarked = true;
  }

  await user.save();
  revalidatePath('/properties/saved', 'page');

  return {
    message,
    isBookmarked,
  };
}

export default bookmarkProperty;