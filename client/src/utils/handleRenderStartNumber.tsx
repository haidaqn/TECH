import { FaRegStar } from 'react-icons/fa';
import { AiFillStar } from 'react-icons/ai';
export const renderStartNumber = (number: number, size?: number): JSX.Element[] => {
    const star = [];
    for (let i = 1; i <= number; i++)
        star.push(<AiFillStar size={size ? size : 30} color="red" key={i + Math.random()} />);
    for (let i = number; i <= 5; i++)
        star.push(<FaRegStar size={size ? size : 30} key={i + Math.random()} />);
    return star.slice(0, 5);
};
