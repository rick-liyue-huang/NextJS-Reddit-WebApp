import React, {ReactNode} from 'react';
import {Flex} from "@chakra-ui/react";

interface PageContentProps {
	children: ReactNode
}

const PageContentComponent: React.FC<PageContentProps> = ({children}) => {

	// children is array of elements
	console.log('children: ', children);
	return (
		<Flex border={'1px solid red'} justify={'center'} padding={'16px 0'}>
			<Flex border={'1px solid green'} w={'95%'} justify={'center'} maxW={'860px'}>
				<Flex
					border={'1px solid blue'} w={{base:'100%', md: '65%'}} mr={{base:0, md:6}} direction={'column'}
				>{children && children[0 as keyof typeof children]}</Flex>
				<Flex
					border={'1px solid orange'} direction={'column'} display={{base:'none', md:'flex'}} flexGrow={1}
				>{children && children[1 as keyof typeof children]}</Flex>
			</Flex>
		</Flex>
	);
};

export default PageContentComponent;
