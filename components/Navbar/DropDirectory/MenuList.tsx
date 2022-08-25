import { Flex, Icon, Image, MenuItem } from '@chakra-ui/react';
import React from 'react';
import { IconType } from 'react-icons';
import { useDropDirectory } from '../../../hooks/useDropDirectory';

interface Props {
  displayName: string;
  link: string;
  icon: IconType;
  iconColor: string;
  imageUrl?: string;
}

export const MenuListComponent: React.FC<Props> = ({
  displayName,
  link,
  icon,
  iconColor,
  imageUrl,
}) => {
  const { handleSelectMenuItem } = useDropDirectory();

  return (
    <MenuItem
      width={'100%'}
      fontSize={'10pt'}
      _hover={{ bg: 'gray.100' }}
      onClick={() =>
        handleSelectMenuItem({ displayName, link, icon, iconColor, imageUrl })
      }
    >
      <Flex align="center">
        {imageUrl ? (
          <Image src={imageUrl} borderRadius="full" boxSize={'18px'} mr={2} />
        ) : (
          <Icon as={icon} fontSize={20} marginRight={2} color={iconColor} />
        )}
        {displayName}
      </Flex>
    </MenuItem>
  );
};
