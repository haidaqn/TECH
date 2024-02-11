import { Avatar } from '@/components/ui/avatar';
import { Card } from '@/components/ui/card';
import { Rating } from '@/models';
import { renderStartNumber } from '@/utils';
import { AvatarFallback, AvatarImage } from '@radix-ui/react-avatar';
// import * as dayjs from 'dayjs';

export const Comment = (props: Rating) => {
    const { comment, postedBy, star, updateAt } = props;
    return (
        <Card className="w-full py-2 px-4">
            <div className="flex gap-5">
                <Avatar className="cursor-pointer">
                    <AvatarImage
                        src={
                            postedBy?.avatar
                                ? postedBy.avatar
                                : 'https://static.vecteezy.com/system/resources/previews/009/292/244/original/default-avatar-icon-of-social-media-user-vector.jpg'
                        }
                        alt="@shadcn"
                    />
                    <AvatarFallback></AvatarFallback>
                </Avatar>
                <div>
                    <span className="capitalize font-medium">
                        {postedBy?.name ? postedBy?.name : 'ẩn danh'}
                    </span>
                    <span className="flex gap-1">{renderStartNumber(star, 14)}</span>
                    <span className="text-sm font-medium">
                        {/* {dayjs(updateAt).format('DD-MM-YYYY')} */}
                        {updateAt}
                    </span>
                    <span className="flex items-center mt-5">
                        {comment.length ? comment : 'Người dùng chưa để lại nhận xét!'}
                    </span>
                </div>
            </div>
        </Card>
    );
};
