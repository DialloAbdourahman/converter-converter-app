import {
  VideoConvertedEvent,
  VideoUploadedEvent,
} from "@daconverter/common-libs";
import { ConsumeMessage } from "amqplib";
import { videoUploadedHandler } from "../VideoUploadedHandler";
import { rabbitmqWrapper } from "../../../../rabbitmq-wrapper";
import { VideoConvertedPublisher } from "../../../publishers/VideoConvertedPublisher";

it("should handle a video uploaded event and publish a successfull convertion", async () => {
  const data: VideoUploadedEvent["data"] = {
    id: "asdfafds",
    video: "asdf",
  };

  // Create a fake channel object and message object.
  // @ts-ignore
  const msg: ConsumeMessage = {};
  // @ts-ignore
  const channel: Channel = {
    ack: jest.fn().mockImplementation((msg: ConsumeMessage) => {}),
  };

  await videoUploadedHandler(data, msg, channel);

  expect(rabbitmqWrapper.client.createChannel).toHaveBeenCalled();

  const videoConvertedPublisher = new VideoConvertedPublisher(
    rabbitmqWrapper.client
  );
  const publishSpy = jest.spyOn(videoConvertedPublisher, "publish");
  const mockEventData: VideoConvertedEvent["data"] = {
    id: "asdf",
    audio: "asdf",
  };
  await videoConvertedPublisher.publish(mockEventData);

  expect(publishSpy).toHaveBeenCalled();
  expect(publishSpy).toHaveBeenCalledWith(mockEventData);
});
