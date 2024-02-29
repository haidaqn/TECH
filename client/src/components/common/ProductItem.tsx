import { Card, CardFooter } from '@/components/ui/card';
import { Product } from '@/models';
import { handlePrice, renderStartNumber } from '@/utils';
import { useTheme } from '../theme-provider';
import { useNavigate } from 'react-router-dom';

export const ProductItem = (props: Product) => {
    const { title, thumb, totalRatings, price, _id } = props;
    const { theme } = useTheme();
    const navigate = useNavigate();

    const handleNavigateDetailProduct = (idProduct: string): void => {
        navigate(`/store/products/${idProduct}`);
    };

    return (
        <Card
            onClick={() => handleNavigateDetailProduct(_id)}
            className="bg-white rounded-sm overflow-hidden  max-h-[420px] shadow min-h-[300px] h-[355px] flex items-center justify-center cursor-pointer flex-col gap-3 "
        >
            <img
                src={thumb}
                alt=""
                className="bg-center bg-cover w-[73%] p-6 transition-transform transform hover:scale-110"
            />
            <CardFooter className={`${theme === 'dark' && 'text-black'} flex flex-col gap-2`}>
                <span
                    className={`${
                        theme === 'dark' && 'text-black'
                    } text-xl font-medium text-center`}
                >
                    {title}
                </span>
                <span className="flex">{renderStartNumber(totalRatings, 22)}</span>
                <span className="text-lg">{handlePrice(price)}</span>
            </CardFooter>
        </Card>
    );
};
