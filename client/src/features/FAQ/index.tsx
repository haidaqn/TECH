// import { Accordion } from '@/components/ui/accordion';
import { AccordionContent, AccordionTrigger } from '@/components/ui/accordion';
import * as Accordion from '@radix-ui/react-accordion';
import { useState } from 'react';
const Faq = () => {
    const [isTrusted, setIsTrusted] = useState<string>('item-1');

    const handleIsTrusted = (trusted: string): void => {
        setIsTrusted((item) => (item === trusted ? '' : trusted));
    };

    return (
        <>
            <Accordion.Root
                className="AccordionRoot mt-3 flex flex-col gap-4"
                type="single"
                defaultValue="item-1"
                collapsible
            >
                <Accordion.Item
                    onClick={() => handleIsTrusted('item-1')}
                    className="AccordionItem  border text-lg "
                    value="item-1"
                >
                    <AccordionTrigger
                        className={`text-lg border-b px-4 ${
                            isTrusted === 'item-1' ? 'bg-red-500' : ''
                        }`}
                    >
                        1. What payment you accept?
                    </AccordionTrigger>
                    <AccordionContent className="p-4">
                        Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod
                        tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam,
                        quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo
                        consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse
                        cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat
                        non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
                    </AccordionContent>
                </Accordion.Item>
                <Accordion.Item
                    onClick={() => handleIsTrusted('item-2')}
                    className="AccordionItem border text-lg "
                    value="item-2"
                >
                    <AccordionTrigger
                        className={`text-lg border-b px-4 ${
                            isTrusted === 'item-2' ? 'bg-red-500' : ''
                        }`}
                    >
                        2. In what country can you deliver?
                    </AccordionTrigger>
                    <AccordionContent className="p-4">
                        Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod
                        tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam,
                        quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo
                        consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse
                        cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat
                        non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
                    </AccordionContent>
                </Accordion.Item>
                <Accordion.Item
                    onClick={() => handleIsTrusted('item-3')}
                    className="AccordionItem border text-lg "
                    value="item-3"
                >
                    <AccordionTrigger
                        className={`text-lg border-b px-4 ${
                            isTrusted === 'item-3' ? 'bg-red-500' : ''
                        }`}
                    >
                        3. what payments you accept?
                    </AccordionTrigger>
                    <AccordionContent className="p-4">
                        Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod
                        tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam,
                        quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo
                        consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse
                        cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat
                        non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
                    </AccordionContent>
                </Accordion.Item>
                <Accordion.Item
                    onClick={() => handleIsTrusted('item-4')}
                    className="AccordionItem border text-lg "
                    value="item-4"
                >
                    <AccordionTrigger
                        className={`text-lg border-b px-4 ${
                            isTrusted === 'item-4' ? 'bg-red-500' : ''
                        }`}
                    >
                        4. how to track my parcel?
                    </AccordionTrigger>
                    <AccordionContent className="p-4">
                        Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod
                        tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam,
                        quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo
                        consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse
                        cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat
                        non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
                    </AccordionContent>
                </Accordion.Item>
                <Accordion.Item
                    onClick={() => handleIsTrusted('item-5')}
                    className="AccordionItem border text-lg "
                    value="item-5"
                >
                    <AccordionTrigger
                        className={`text-lg border-b px-4 ${
                            isTrusted === 'item-5' ? 'bg-red-500' : ''
                        }`}
                    >
                        5. how to handle my parcel?
                    </AccordionTrigger>
                    <AccordionContent className="p-4">
                        Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod
                        tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam,
                        quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo
                        consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse
                        cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat
                        non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
                    </AccordionContent>
                </Accordion.Item>
                <Accordion.Item
                    onClick={() => handleIsTrusted('item-6')}
                    className="AccordionItem border text-lg "
                    value="item-6"
                >
                    <AccordionTrigger
                        className={`text-lg border-b px-4 ${
                            isTrusted === 'item-6' ? 'bg-red-500' : ''
                        }`}
                    >
                        6. Why amadea is the best e-commerce theme?
                    </AccordionTrigger>
                    <AccordionContent className="p-4">
                        Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod
                        tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam,
                        quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo
                        consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse
                        cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat
                        non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
                    </AccordionContent>
                </Accordion.Item>
            </Accordion.Root>
        </>
    );
};

export default Faq;
