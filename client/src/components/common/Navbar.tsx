import {
    NavigationMenu,
    NavigationMenuItem,
    NavigationMenuLink,
    NavigationMenuList,
    navigationMenuTriggerStyle,
} from '@/components/ui/navigation-menu';
import { AiFillGitlab, AiFillHome, AiFillSecurityScan } from 'react-icons/ai';
import { SiThemodelsresource } from 'react-icons/si';
import { NavLink, useLocation } from 'react-router-dom';
import { useTheme } from '../theme-provider';
import { Input } from '../ui/input';

export const Navbar = () => {
    const { theme } = useTheme();
    const location = useLocation();
    return (
        <>
            <div className="border-y border-gray-400 py-3 flex items-center justify-between">
                <NavigationMenu>
                    <NavigationMenuList>
                        <NavigationMenuItem value="store">
                            <NavigationMenuLink
                                asChild
                                className={`${navigationMenuTriggerStyle()} ${
                                    location.pathname.includes('/store/') &&
                                    location.pathname.length <= 7 &&
                                    `${theme === 'light' ? 'bg-gray-100' : 'bg-[#27272B]'} `
                                }`}
                            >
                                <NavLink to="">
                                    <AiFillHome size={30} />
                                    Trang chủ
                                </NavLink>
                            </NavigationMenuLink>
                        </NavigationMenuItem>
                        <NavigationMenuItem value="products">
                            <NavigationMenuLink
                                asChild
                                className={`${navigationMenuTriggerStyle()} ${
                                    location.pathname.includes('products') &&
                                    location.pathname.length > 9 &&
                                    `${theme === 'light' ? 'bg-gray-100' : 'bg-[#27272B]'} `
                                }`}
                            >
                                <NavLink to="products">
                                    <AiFillGitlab size={30} />
                                    Sản phẩm
                                </NavLink>
                            </NavigationMenuLink>
                        </NavigationMenuItem>
                        <NavigationMenuItem value="service">
                            <NavigationMenuLink
                                asChild
                                className={`${navigationMenuTriggerStyle()} ${
                                    location.pathname.includes('service') &&
                                    location.pathname.length > 9 &&
                                    `${theme === 'light' ? 'bg-gray-100' : 'bg-[#27272B]'} `
                                }`}
                            >
                                <NavLink to="service">
                                    <SiThemodelsresource size={30} />
                                    Dịch vụ
                                </NavLink>
                            </NavigationMenuLink>
                        </NavigationMenuItem>
                        <NavigationMenuItem value="faq">
                            <NavigationMenuLink
                                asChild
                                className={`${navigationMenuTriggerStyle()} ${
                                    location.pathname.includes('faq') &&
                                    location.pathname.length > 9 &&
                                    `${theme === 'light' ? 'bg-gray-100' : 'bg-[#27272B]'} `
                                }`}
                            >
                                <NavLink to="faq">
                                    <AiFillSecurityScan size={30} />
                                    FAQ
                                </NavLink>
                            </NavigationMenuLink>
                        </NavigationMenuItem>
                    </NavigationMenuList>
                </NavigationMenu>
                <Input
                    type="text"
                    className={'w-[250px] placeholder:text-muted-foreground '}
                    placeholder="Nhập nội dung để tìm kiếm"
                />
            </div>
        </>
    );
};
