import ApolloClientProvider from 'Services/ApolloClientProvider'
import { FETCH_FARMER_POST } from './Query';

export const cacheNewReplyComment = async (data) => {
    const {
        postId,
        commentId,
        subCommentId,
        content,
        author,
        dateCommented
    } = data || {};
    const {
        _id: authorId,
        ktp_photo_face_thumbnail: ktp_photo_face,
        ktp_name
    } = author || {};
    const result = await ApolloClientProvider.client.query({
        query: FETCH_FARMER_POST,
        variables: { _id: postId }
    });
    const { data: postCache } = result || {};
    const { farmerPost } = postCache || {};
    const { comments = [] } = farmerPost || {};
    
    if (!Array.isArray(comments)) return;
    const matchCommentIndex = comments.findIndex(({ _id }) => _id === commentId);
    if (matchCommentIndex < 0) return;
    const { content_reply: oldContentReply } = comments[matchCommentIndex];
    const newContentReply = {
        _id: subCommentId,
        author: {
            _id: authorId,
            ktp_name,
            ktp_photo_face,
            __typename: "UserFarmer"
        },
        content,
        date_commented: dateCommented,
        likes: [],
        likes_total: 0,
        __typename: "FarmerCommentReply"
    };
    const newComment = {
        ...comments[matchCommentIndex],
        ...{
            content_reply: [].concat(oldContentReply, newContentReply)
        }
    };
    
    ApolloClientProvider.client.writeQuery({
        query: FETCH_FARMER_POST,
        variables: { _id: postId },
        data: {
            farmerPost: {
                ...farmerPost,
                ...{
                    comments: [
                        comments.slice(0, matchCommentIndex),
                        newComment,
                        comments.slice(matchCommentIndex + 1, comments.length)
                    ]
                }
            }
        }
    });
};
