import {
  EXCHANGES,
  KEYS,
  Publisher,
  VideoNotConvertedEvent,
} from "@daconverter/common-libs";

export class VideoNotConvertedPublisher extends Publisher<VideoNotConvertedEvent> {
  key: KEYS.VIDEO_NOT_CONVERTED = KEYS.VIDEO_NOT_CONVERTED;
  exchange: EXCHANGES = EXCHANGES.CONVERTER_EXCHANGE;
}
