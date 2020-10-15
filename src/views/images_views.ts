import Image from "../models/images";
import path from 'path';

export default {
  render(image: Image) {
    return {
      id: image.id,
      url: `http://localhost:8000/uploads/${image.path}`
    }
  },
  renderMany(images: Image[]) {
    return images.map((image) => this.render(image))
  }
}