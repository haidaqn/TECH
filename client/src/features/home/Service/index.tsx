import { useTheme } from '@/components/theme-provider';

const Service = () => {
    const { theme } = useTheme();

    return (
        <div className="flex flex-col gap-7">
            <div className="flex gap-4">
                <img
                    className="h-[330px] object-cover w-full flex-1"
                    src="/assets/logo_service.webp"
                    alt=""
                />
                <article className="flex flex-col gap-3 flex-1 ">
                    <p>
                        Cras magna tellus, congue vitae congue vel, facilisis id risus. Proin semper
                        in lectus id faucibus. Aenean vitae quam eget mi aliquam viverra quis quis
                        velit.
                    </p>
                    <p>
                        Curabitur mauris diam, posuere vitae nunc eget, blandit pellentesque mi.
                        Pellentesque placerat nulla at ultricies malesuada. Aenean mi lacus,
                        malesuada at leo vel, blandit iaculis nisl.
                    </p>
                    <p>
                        Praesent vestibulum nisl sed diam euismod, a auctor neque porta. Vestibulum
                        varius ligula non orci tincidunt rutrum. Suspendisse placerat enim eu est
                        egestas, aliquam venenatis elit accumsan. Donec metus quam, posuere sit amet
                        odio et, ultricies consequat nibh.
                    </p>
                </article>
            </div>
            <h1 className="text-center font-bold text-2xl text-gray-600">
                Chúng tôi cung cấp dịch vụ tốt nhất
            </h1>
            <div className="grid grid-cols-3 gap-7">
                <div className=" flex items-center justify-center flex-col gap-2 ">
                    <img
                        className={`${theme === 'dark' && 'bg-white'}`}
                        src="/assets/page_service.webp"
                        alt=""
                    />
                    <h1>Customizable Page</h1>
                    <h2 className="text-gray-500 text-center">
                        Fusce arcu molestie eget libero consectetur congue consectetur in bibendum
                        litora
                    </h2>
                </div>
                <div className=" flex items-center justify-center flex-col gap-2 ">
                    <img
                        className={`${theme === 'dark' && 'bg-white'}`}
                        src="/assets/slide_service.png"
                        alt=""
                    />
                    <h1>Revolution Slider</h1>
                    <h2 className="text-gray-500 text-center">
                        Fusce arcu molestie eget libero consectetur congue consectetur in bibendum
                        litora
                    </h2>
                </div>
                <div className=" flex items-center justify-center flex-col gap-2 ">
                    <img
                        className={`${theme === 'dark' && 'bg-white'}`}
                        src="/assets/drag_service.png"
                        alt=""
                    />
                    <h1>Drag & Drop Page</h1>
                    <h2 className="text-gray-500 text-center">
                        Fusce arcu molestie eget libero consectetur congue consectetur in bibendum
                        litora
                    </h2>
                </div>
                <div className=" flex items-center justify-center flex-col gap-2 ">
                    <img
                        className={`${theme === 'dark' && 'bg-white'}`}
                        src="/assets/slide_service.png"
                        alt=""
                    />
                    <h1>Revolution Slider</h1>
                    <h2 className="text-gray-500 text-center">
                        Fusce arcu molestie eget libero consectetur congue consectetur in bibendum
                        litora
                    </h2>
                </div>
                <div className=" flex items-center justify-center flex-col gap-2 ">
                    <img
                        className={`${theme === 'dark' && 'bg-white'}`}
                        src="/assets/drag_service.png"
                        alt=""
                    />
                    <h1>Drag & Drop Page</h1>
                    <h2 className="text-gray-500 text-center">
                        Fusce arcu molestie eget libero consectetur congue consectetur in bibendum
                        litora
                    </h2>
                </div>
                <div className=" flex items-center justify-center flex-col gap-2 ">
                    <img
                        className={`${theme === 'dark' && 'bg-white'}`}
                        src="/assets/page_service.webp"
                        alt=""
                    />
                    <h1>Customizable Page</h1>
                    <h2 className="text-gray-500 text-center">
                        Fusce arcu molestie eget libero consectetur congue consectetur in bibendum
                        litora
                    </h2>
                </div>
            </div>
        </div>
    );
};

export default Service;
