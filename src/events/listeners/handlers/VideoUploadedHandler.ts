import { VideoUploadedEvent, AwsS3Helper } from "@daconverter/common-libs";
import { Channel, ConsumeMessage } from "amqplib";
import { VideoConvertedPublisher } from "../../publishers/VideoConvertedPublisher";
import { rabbitmqWrapper } from "../../../rabbitmq-wrapper";
import { VideoNotConvertedPublisher } from "../../publishers/VideoNotConvertedPublisher";

export const videoUploadedHandler = async (
  data: VideoUploadedEvent["data"],
  message: ConsumeMessage,
  channel: Channel
) => {
  try {
    console.log("Video uploaded handler called");

    const awsHelper = new AwsS3Helper();

    const audio = await awsHelper.convertVideoToMp3(data.video);

    await new VideoConvertedPublisher(rabbitmqWrapper.client).publish({
      id: data.id,
      audio,
    });

    channel.ack(message);
  } catch (error) {
    await new VideoNotConvertedPublisher(rabbitmqWrapper.client).publish({
      id: data.id,
    });

    // Do not requeue here
    channel.nack(message, false, false);
  }
};
