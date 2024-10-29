import {
  EXCHANGES,
  KEYS,
  Publisher,
  VideoConvertedEvent,
} from "@daconverter/common-libs";

export class VideoConvertedPublisher extends Publisher<VideoConvertedEvent> {
  key: KEYS.VIDEO_CONVERTED = KEYS.VIDEO_CONVERTED;
  exchange: EXCHANGES = EXCHANGES.CONVERTER_EXCHANGE;
}
