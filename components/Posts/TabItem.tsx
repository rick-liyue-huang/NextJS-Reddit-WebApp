import { Flex, Icon, Text } from '@chakra-ui/react';
import React from 'react';
import { TabItem } from './NewPostForm';

interface Props {
  item: TabItem;
  selected: boolean;
  setSelectedTab: (value: string) => void;
}

export const TabItemComponent: React.FC<Props> = ({
  item,
  selected,
  setSelectedTab,
}) => {
  return (
    <Flex
      justify={'center'}
      align="center"
      flexGrow={1}
      p="14px 0px"
      fontWeight={600}
      cursor={'pointer'}
      _hover={{ bg: 'gray.50' }}
      color={selected ? 'green.500' : 'gray.500'}
      borderWidth={selected ? '0px 1px 2px 0px' : '0px 1px 1px 0px'}
      borderBottomColor={selected ? 'green.500' : 'gray.200'}
      borderRightColor="gray.200"
      onClick={() => setSelectedTab(item.title)}
    >
      <Flex align="center" height="20px" mr={2}>
        <Icon as={item.icon} />
      </Flex>
      <Text fontSize="10pt">{item.title}</Text>
    </Flex>
  );
};
