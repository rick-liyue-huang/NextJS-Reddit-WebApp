import {
  Box,
  Button,
  Checkbox,
  Flex,
  Icon,
  Input,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Stack,
  Text,
} from '@chakra-ui/react';
import React, { ChangeEvent, useState } from 'react';
import { BsFillEyeFill, BsFillPersonFill } from 'react-icons/bs';
import { HiLockClosed } from 'react-icons/hi';

interface Props {
  open: boolean;
  handleClose: () => void;
}

export const CreateCommunityModal: React.FC<Props> = ({
  open,
  handleClose,
}) => {
  const [communityName, setCommunityName] = useState('');
  const [charactersRemaining, setCharactersRemaining] = useState(21);
  const [communityType, setCommunityType] = useState('public');

  const handlCommunityName = (e: ChangeEvent<HTMLInputElement>) => {
    setCommunityName('');
    if (e.target.value.length >= 21) {
      return;
    }
    // re calculate the community name remainging
    setCommunityName(e.target.value);
    setCharactersRemaining(21 - e.target.value.length);
  };

  const handleCommunityTypeChange = (e: ChangeEvent<HTMLInputElement>) => {
    setCommunityType(e.target.name);
  };

  return (
    <>
      <Modal isOpen={open} onClose={handleClose} size="lg">
        <ModalOverlay />
        <ModalContent>
          <ModalHeader
            display="flex"
            flexDirection={'column'}
            fontSize={15}
            padding={3}
          >
            Create a Community
          </ModalHeader>
          <Box pl={3} pr={3}>
            <ModalCloseButton />
            <ModalBody
              display="flex"
              flexDirection={'column'}
              padding="10px 0px"
            >
              <Text fontWeight={600} fontSize={15}>
                Name
              </Text>
              <Text fontSize={11} color="gray.500">
                Community names including capitalization cannot be changed
              </Text>
              <Text
                position={'relative'}
                top="28px"
                left="10px"
                color="gray.400"
              >
                r/
              </Text>
              <Input
                position={'relative'}
                value={communityName}
                size="sm"
                pl="22px"
                onChange={handlCommunityName}
              />
              <Text
                fontSize="9pt"
                color={charactersRemaining === 0 ? 'red' : 'gray.500'}
              >
                {charactersRemaining} Characters remainging{' '}
              </Text>
              <Box mt={4} mb={4}>
                <Text fontWeight={600} fontSize={15}>
                  Community Type
                </Text>
                <Stack spacing={2}>
                  <Checkbox
                    name="public"
                    isChecked={communityType === 'public'}
                    onChange={handleCommunityTypeChange}
                  >
                    <Flex align={'center'}>
                      <Icon as={BsFillPersonFill} color="gray.500" mr={2} />
                      <Text fontSize="10pt" mr={1}>
                        Public
                      </Text>
                      <Text fontSize="8pt" color="gray.500" pt={1}>
                        Anyone can view, post and comment
                      </Text>
                    </Flex>
                  </Checkbox>
                  <Checkbox
                    name="restricted"
                    isChecked={communityType === 'restricted'}
                    onChange={handleCommunityTypeChange}
                  >
                    <Flex align={'center'}>
                      <Icon as={BsFillEyeFill} color="gray.500" mr={2} />
                      <Text fontSize="10pt" mr={1}>
                        Restricted
                      </Text>
                      <Text fontSize="8pt" color="gray.500">
                        Anyone can view, but only approved users can comment and
                        post
                      </Text>
                    </Flex>
                  </Checkbox>
                  <Checkbox
                    name="private"
                    isChecked={communityType === 'private'}
                    onChange={handleCommunityTypeChange}
                  >
                    <Flex align={'center'}>
                      <Icon as={HiLockClosed} color="gray.500" mr={2} />
                      <Text fontSize="10pt" mr={1}>
                        Private
                      </Text>
                      <Text fontSize="8pt" color="gray.500" pt={1}>
                        Only approved users can view, post and comment
                      </Text>
                    </Flex>
                  </Checkbox>
                </Stack>
              </Box>
            </ModalBody>
          </Box>

          <ModalFooter bg="gray.100" borderRadius={'0px 0px 10px 10px'}>
            <Button
              variant="outline"
              height="30px"
              mr={3}
              onClick={handleClose}
            >
              Cancel
            </Button>
            <Button variant="solid" height="30px">
              Create Community
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
};
