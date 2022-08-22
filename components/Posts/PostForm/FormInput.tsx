import { Button, Flex, Input, Stack, Textarea } from '@chakra-ui/react';
import React, { ChangeEvent } from 'react';

interface Props {
  formInputProps: {
    title: string;
    body: string;
  };
  onChange: (
    event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => void;
  handleCreatePost: () => void;
  loading: boolean;
}

export const FormInput: React.FC<Props> = ({
  formInputProps,
  onChange,
  loading,
  handleCreatePost,
}) => {
  return (
    <Stack width="100%" spacing={3}>
      <Input
        name="title"
        value={formInputProps.title}
        onChange={onChange}
        fontSize="10pt"
        borderRadius={4}
        placeholder="Title"
        _placeholder={{ color: 'gray.500' }}
        _focus={{
          outline: 'none',
          bg: 'white',
          border: '1px solid',
          borderColor: 'gray.500',
        }}
      />
      <Textarea
        name="body"
        value={formInputProps.body}
        onChange={onChange}
        fontSize="10pt"
        height="100px"
        borderRadius={4}
        placeholder="Post Content..."
        _placeholder={{ color: 'gray.500' }}
        _focus={{
          outline: 'none',
          bg: 'white',
          border: '1px solid',
          borderColor: 'gray.500',
        }}
      />
      <Flex justify="flex-end">
        <Button
          height="34px"
          padding="0px 30px"
          disabled={!formInputProps.title}
          isLoading={loading}
          onClick={handleCreatePost}
        >
          Post
        </Button>
      </Flex>
    </Stack>
  );
};
