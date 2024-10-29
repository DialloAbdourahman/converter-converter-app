import { VideoNotConvertedEvent } from "@daconverter/common-libs";
import { rabbitmqWrapper } from "../../../rabbitmq-wrapper";
import { VideoNotConvertedPublisher } from "../VideoNotConvertedPublisher";

it("should make sure that the video not converted publisher is working", async () => {
  const videoNotConvertedPublisher = new VideoNotConvertedPublisher(
    rabbitmqWrapper.client
  );
  const publishSpy = jest.spyOn(videoNotConvertedPublisher, "publish");
  const mockEventData: VideoNotConvertedEvent["data"] = {
    id: "asdf",
  };
  await videoNotConvertedPublisher.publish(mockEventData);

  expect(publishSpy).toHaveBeenCalled();
  expect(publishSpy).toHaveBeenCalledWith(mockEventData);
});
