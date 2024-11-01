interface ThreadCreateResponseDto {
  success: boolean;
  message: string;
  data: Data;
}

interface Data {
  threadId: string;
}

export default ThreadCreateResponseDto;
