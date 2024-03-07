/* eslint-disable no-use-before-define */
import { Subject } from './Subject';

let instance: SMedia | null = null;
export const getSMedia = () => {
  if (instance === null) {
    instance = new SMedia();
    return instance;
  }
  return instance;
};
export class SMedia {
  private mediaStream: Subject<MediaStream | null>;

  constructor() {
    this.mediaStream = new Subject<MediaStream | null>(null);
  }

  async getUserVideoStream() {
    if (!this.mediaStream.value) {
      const med = await navigator.mediaDevices.getUserMedia({ video: true });
      this.mediaStream.value = med;
    }
    return this.mediaStream.value;
  }
}
