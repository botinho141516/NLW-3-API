import Orphanage from "../models/orphanages";
import imagesView from './images_views';

export default {
  render(orphanage: Orphanage) {
    const {
      id,
      name,
      latitude,
      longitude,
      about,
      instructions,
      open_on_weekends,
      opening_hours,
      images
    } = orphanage;
    return {
      id,
      name,
      latitude,
      longitude,
      about,
      instructions,
      open_on_weekends,
      opening_hours,
      images: imagesView.renderMany(images)
    }
  },
  renderMany(orphanages: Orphanage[]) {
    return orphanages.map(orphanage => this.render(orphanage));
  }
}