import React, {ReactNode} from 'react';
import {Flex} from "@chakra-ui/react";

interface PageContentProps {
	children: ReactNode
}

/**
 * @define can be used in different page similar as layout
 * @param children
 * @constructor
 */
const PageContentComponent: React.FC<PageContentProps> = ({children}) => {

	console.log(children)

	// match with the parent layout, with array of two elements
	return (
		<Flex
			justify={'center'} p={'16px 0'}
		>
			<Flex w={'95%'} justify={'center'} maxW={'860px'}
			>
				<Flex
					direction={'column'} w={{base: '100%', md: '65%'}} mr={{base: 0, md: 6}}
				>{children && children[0 as keyof typeof children]}</Flex>
				<Flex
					direction={'column'} display={{base: 'none', md: 'flex'}}
					 flexGrow={1}
				>{children && children[1 as keyof typeof children]}</Flex>
			</Flex>
		</Flex>
	);
};

export default PageContentComponent;
