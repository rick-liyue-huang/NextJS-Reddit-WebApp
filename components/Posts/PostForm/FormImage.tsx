import { Button, Flex, Image, Input, Stack } from '@chakra-ui/react';
import React, { ChangeEvent, useRef } from 'react';

interface Props {
  handleSelectImg: (event: ChangeEvent<HTMLInputElement>) => void;
  selectedImg?: string;
  setSelectedTab: (value: string) => void;
  setSelectedImg: (value: string) => void;
}

export const FormImage: React.FC<Props> = ({
  handleSelectImg,
  selectedImg,
  setSelectedImg,
  setSelectedTab,
}) => {
  const selectedFileRef = useRef<HTMLInputElement>(null);

  return (
    <Flex direction="column" justify="center" align="center" width="100%">
      {selectedImg ? (
        <>
          <Image src={selectedImg} maxWidth="500px" maxHeight="300px" />
          <Stack direction="row" mt={4}>
            <Button height="28px" onClick={() => setSelectedTab('Post')}>
              Back to Post
            </Button>
            <Button
              variant="outline"
              height="28px"
              onClick={() => setSelectedImg('')}
            >
              Cancel
            </Button>
          </Stack>
        </>
      ) : (
        <Flex
          justify="center"
          align="center"
          p={20}
          border="1px dashed"
          borderColor="gray.200"
          width="100%"
          borderRadius={6}
        >
          <Input
            ref={selectedFileRef}
            type="file"
            hidden
            onChange={handleSelectImg}
          />
          <Button
            height="34px"
            variant={'outline'}
            onClick={() => selectedFileRef.current?.click()}
          >
            Image Upload
          </Button>
        </Flex>
      )}
    </Flex>
  );
};
