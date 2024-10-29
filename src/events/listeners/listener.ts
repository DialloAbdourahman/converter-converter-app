import { EXCHANGES, KEYS, Listener, QUEUES } from "@daconverter/common-libs";
import { ConsumeMessage } from "amqplib";
import { videoUploadedHandler } from "./handlers/VideoUploadedHandler";

export class ConverterServiceListener extends Listener {
  keys: KEYS[] = [KEYS.VIDEO_UPLOADED];
  exchange: EXCHANGES = EXCHANGES.CONVERTER_EXCHANGE;
  queue: QUEUES = QUEUES.CONVERTER_QUEUE;

  async handleEvents(key: KEYS, data: any, msg: ConsumeMessage) {
    switch (key) {
      case KEYS.VIDEO_UPLOADED:
        await videoUploadedHandler(data, msg, this.channel);
        break;
      default:
        this.channel.nack(msg, false, false);
        break;
    }
  }
}
